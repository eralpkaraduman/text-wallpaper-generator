# TextWallpaper.Online

Create Simple Wallpapers with Text!
#### [TextWallpaper.Online][textwallpaperdotonline-url]

![Intro Animation](https://github.com/eralpkaraduman/text-wallpaper-generator/raw/master/src/intro/intro.gif)

## Prerequisites

- [node][node-url]
- [nvm][nvm-url]
- [yarn][yarn-url]

## Starting Dev Server

1. Run `nvm use`
2. Run `npm i`
3. Start the dev server using `npm start`
3. Open [http://localhost:4000](http://localhost:4000)

## Using Tauri

1. Make sure you have Rust installed. (curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh)
2. Run `cargo tauri dev`
3. Run `cargo tauri build` to get app bundle under target/

[nvm-url]: https://github.com/creationix/nvm
[yarn-url]: https://yarnpkg.com
[textwallpaperdotonline-url]: https://textwallpaper.online
[node-url]: https://nodejs.org

## Deploying

- Place aws-credentials.json into conf folder
- `npm run deploy"
