const { src, dest, series, parallel } = require("gulp");

const clean = require("gulp-clean");
const babel = require("gulp-babel"); // 编译es6
function testTask() {
  return src("src/**/*.js")
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              loose: true,
            },
          ],
          "@babel/preset-react",
        ],
        plugins: [
          //   "@babel/plugin-transform-runtime",
          //   ["@babel/plugin-proposal-decorators", { legacy: true }],
          //   ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      })
    )
    .pipe(dest("dist/"));
}

function cleans(cb) {
  return src("dist/*").pipe(clean());
}
exports.default = series(cleans, testTask);
