import path from "path";
import {makeConfig} from "@njmaeff/webpack-static-site/make-config";

const conf = makeConfig(({webpack}) => {
    return webpack({
        root: path.join(__dirname, "pages", "tetris"),
        pageExtension: ".page.tsx",
        outputPath: path.resolve(__dirname, "dist"),
        copy: {
            patterns: [
                {
                    from: "assets",
                    to: "assets",
                },
                {
                    from: "font",
                    to: "font",
                },
                {
                    from: "favicon",
                    to: "favicon",
                },
                {
                    from: "js/*.js",
                    to: "js/[name][ext]",
                    noErrorOnMissing: true,
                    info: {
                        minimized: true,
                    },
                },
            ],
        },
    });
});

export default conf;
