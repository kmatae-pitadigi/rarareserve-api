# 環境
# サーバー: Node.js,NestJS,GraphQL,TypeORM,SQL Server
# ビルド環境
#   サーバー: webpack+gulp

# 使用するNode.jsのバージョンを設定(alpineではbycryptの関係でエラーになる)
FROM node:10.15.3

# パッケージインストールに必要なファイルをコピー
COPY package.json package-lock.json ./

# 必要なパッケージをインストールする
RUN npm --unsafe-perm ci

# PM2をインストールする
RUN npm install pm2 -g

# ソースをコピーする(コピーしないファイルは.dockerignoreで制御)
COPY . .

# 環境変数を設定する
ENV NODE_ENV=production

# ビルドする(gulpでサーバー、DBマイグレーションをビルド)
RUN npm run build

# node.jsアプリケーションを実行する
CMD ["pm2-runtime", "/dist/server/server.js"]
