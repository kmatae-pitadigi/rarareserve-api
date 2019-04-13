# 環境
# クライアント: Angular
# サーバー: Node.js,NestJS,GraphQL,TypeORM,SQL Server
# ビルド環境
#   クライアント: ng build
#   サーバー: webpack+gulp

# 使用するNode.jsのバージョンを設定(ローカル環境に合わせておく)
FROM node:10.15.3

# ポート番号を指定
ENV PORT 443
EXPOSE 443

# WORKDIRは/
WORKDIR /

# ソースをコピーする(コピーしないファイルは.dockerignoreで制御)
COPY . .

# PM2をインストールする
RUN npm install pm2 -g

# @angular/cliをインストールする
RUN npm install @angular/cli@7.3.6 -g

# package.jsonをコンテナにコピーし、必要なパッケージをインストールする
RUN NODE_ENV=development npm --unsafe-perm install

# 環境変数を設定する
ENV NODE_ENV=production

RUN ng build --prod --aot --ts-config ./src/client/tsconfig.client.json --configuration=./angular.json

# ビルドする(gulpでクライアント、サーバー、DBマイグレーションをビルド)
RUN npm run build

# node.jsアプリケーションを実行する
CMD ["pm2-runtime", "/dist/server/server.js"]
