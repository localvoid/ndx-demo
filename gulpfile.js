const gulp = require("gulp");
const series = gulp.series;
const parallel = gulp.parallel;
const typescript = require("typescript");
const mainTsConfig = require("./src/main/tsconfig.json")
const workerTsConfig = require("./src/worker/tsconfig.json");
const ts = require("gulp-typescript");
const rollup = require("rollup");
const rollupReplace = require("rollup-plugin-replace");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const closureCompiler = require("google-closure-compiler").gulp();

const ClosureConfig = {
  compilation_level: "ADVANCED",
  externs: "./externs/worker.js",
  entry_point: "goog:main",
  dependency_mode: "STRICT",
  language_in: "ECMASCRIPT6_STRICT",
  language_out: "ECMASCRIPT5_STRICT",
  use_types_for_optimization: true,
  assume_function_wrapper: true,
  output_wrapper: "(function(){%output%}).call(this);",
  summary_detail_level: 3,
  warning_level: "QUIET",
  rewrite_polyfills: true,
};

function clean() {
  return require("del")(["dist", "build"]);
}

function compileTS() {
  return gulp.src(["src/main/*.ts"])
    .pipe(ts(Object.assign({}, mainTsConfig.compilerOptions, {
      typescript: typescript,
      target: "es6",
    })))
    .pipe(gulp.dest("build/es6/main"));
}

function compileTSWorker() {
  return gulp.src(["src/worker/*.ts"])
    .pipe(ts(Object.assign({}, workerTsConfig.compilerOptions, {
      typescript: typescript,
      target: "es6",
    })))
    .pipe(gulp.dest("build/es6/worker"));
}

function bundle() {
  return rollup.rollup({
    entry: "build/es6/main/main.js",
    plugins: [
      rollupReplace({
        delimiters: ["<@", "@>"],
        values: {
          KIVI_DEBUG: "DEBUG_DISABLED",
        },
      }),
      rollupNodeResolve(),
    ]
  }).then((bundle) => bundle.write({
    format: "es",
    dest: "build/main.es6.js",
    intro: "goog.module(\"main\");",
    sourceMap: "inline",
  }));
}

function bundleWorker() {
  return rollup.rollup({
    entry: "build/es6/worker/worker.js",
    plugins: [
      rollupNodeResolve(),
    ]
  }).then((bundle) => bundle.write({
    format: "es",
    dest: "build/worker.es6.js",
    intro: "goog.module(\"main\");",
    sourceMap: "inline",
  }));
}

function optimize() {
  return gulp.src(["build/main.es6.js"])
    .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
      js_output_file: "main.js",
    })))
    .pipe(gulp.dest("dist"));
}

function optimizeWorker() {
  return gulp.src(["build/worker.es6.js"])
    .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
      js_output_file: "worker.js",
    })))
    .pipe(gulp.dest("dist"));
}

function html() {
  return gulp.src(["html/*.html"])
    .pipe(gulp.dest("dist"));
}

function data() {
  return gulp.src(["data/*.json"])
    .pipe(gulp.dest("dist"));
}

function deploy() {
  const ghPages = require("gulp-gh-pages");

  return gulp.src("dist/**/*")
    .pipe(ghPages());
}

const dist = series(parallel(compileTS, compileTSWorker, html, data),
  parallel(bundle, bundleWorker), optimize, optimizeWorker);

exports.clean = clean;
exports.dist = exports.default = series(clean, dist);
exports.deploy = deploy;
