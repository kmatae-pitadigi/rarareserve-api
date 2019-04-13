# 環境
# クライアント: Angular
# サーバー: Node.js,NestJS,GraphQL,TypeORM,SQL Server
# ビルド環境
#   クライアント: ng build
#   サーバー: webpack+gulp

# 使用するNode.jsのバージョンを設定(ローカル環境に合わせておく)
FROM node:10.15.3-alpine

# ポート番号を指定
ENV PORT 3000
EXPOSE 3000

COPY package.json package-lock.json ./

# PM2をインストールする
RUN npm install pm2 -g

# package.jsonをコンテナにコピーし、必要なパッケージをインストールする
RUN npm ci

# ソースをコピーする(コピーしないファイルは.dockerignoreで制御)
COPY . .

# 環境変数を設定する
ENV NODE_ENV=production

# ビルドする(gulpでサーバー、DBマイグレーションをビルド)
RUN npm run build

# node.jsアプリケーションを実行する
CMD ["pm2-runtime", "/dist/server/server.js"]
