# ベースイメージとしてNode.jsの公式イメージを使用
FROM node:lts-alpine

# 作業ディレクトリを設定
WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

# package.jsonとpackage-lock.jsonをコピー
COPY ../../backend/package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY ../../backend .

# NestJSが使用するポートを公開
EXPOSE 3001

# 開発サーバーを起動（ホットリロード有効）
CMD ["npm", "run", "start:dev"]