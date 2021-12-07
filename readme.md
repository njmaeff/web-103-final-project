# Web 103 Final Project - Tetris

See the app in action [https://web-103-final-project.vercel.app/](https://web-103-final-project.vercel.app/).

## Build
Run rollup to generate the javascript, then webpack to create the HTML page. The built files will be in the `dist` directory. This project uses a unique webpack configuration and plugin I made during my Web 102 class, located at this repository [Webpack Static Site](https://github.com/njmaeff/webpack-static-site).
```bash
yarn build
```

## Serve
Run `browser-sync` to view the app locally. Since this is a static page, you may also click on the HTML file in the dist folder to use the app.
```bash
yarn serve
```

## About

For the Web 103 final project, I built Tetris. The focus of this project was to use javascript procedurally. For more information about the project, please see the [About.mdx](./pages/tetris/components/about.mdx) file.

## Attribution

- [Song](pages/tetris/assets/song.ogg)
Bogozi, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons
