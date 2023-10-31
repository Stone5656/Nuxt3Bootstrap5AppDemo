# 目標

100x100の数独

## 今すぐに達成すべき課題

難易度別の数独を作成する
UIをユーザーが使いやすいように変更する

## 今後解決すべき課題

100はとりあえず作れたが見にくいため、別の難易度を作っている
SudokuGrid.vueの28行目const rows = ref(createSudokuGrid(100));の100を、sudokuGeneratorの11行目gridsizeに変更したい

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:
Yarn 利用でエラーが発生するのでNPMに変更

```bash
# npm
npm install

```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## Deploy

<https://github.com/lucpotage/nuxt-github-pages>
