# ベースイメージとしてNode.jsの公式イメージを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY ../../frontend/package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY ../../frontend .

# Next.jsが使用するポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]