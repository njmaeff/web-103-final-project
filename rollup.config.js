import multiInput from "rollup-plugin-multi-input";
import {babel} from "@rollup/plugin-babel";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import prettier from "rollup-plugin-prettier";

export default async () => {
    const dir = ".";
    return [
        {
            input: `pages/tetris/js/*.ts`,
            output: [
                {
                    dir,
                    entryFileNames: `[name].js`,
                    format: `esm`,
                },
            ],
            preserveModules: false,
            plugins: [
                prettier(),
                babel({
                    babelHelpers: "bundled",
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    presets: [
                        ["@babel/preset-env", {
                            targets: {
                                node: "current"
                            }
                        }],
                        "@babel/preset-typescript",
                    ],
                    retainLines: true,
                }),
                nodeResolve({
                    extensions: [".ts", ".tsx", ".esm.js", ".js", ".jsx"],
                }),
                replace({
                    "process.env.NODE_ENV": JSON.stringify("production"),
                }),
                multiInput({
                    transformOutputPath: (output, input) => {
                        return input.replace(/\.ts$/, ".js");
                    },
                }),
            ],
        },
    ];
};
// hoist-non-react-statics
