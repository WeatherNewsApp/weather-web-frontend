# weather-web-frontend
（アプリ名未定）フロントエンドWebアプリケーション

## 概要

Next.jsを使用したフロントエンドアプリケーションです。

## 必要な環境

- Docker
- Docker Compose

## セットアップ

### 1. リポジトリのクローン
`
git clone <repository-url>
`
### 2. Dockerコンテナのビルド
`
docker compose build
docker compose run web bash
npm i
exit
`
## 実行方法
### コンテナの起動
`
docker compose up -d
` 

### コンテナの停止
`
docker compose down
`

### コンテナ内に入る
`
docker compose exec web bash or docker compose run web bash
`

##　アプリへのアクセス

- URL: http://localhost:3022
- ポート：3022

## 開発コマンド
- `npm run lint` - ESLintでコードをチェック
- `npm run format` - Prettierでコードをフォーマット
- `npm run lint:fix` - ESLintの自動修正（Prettierも適用）