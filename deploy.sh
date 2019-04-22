#! /bin/bash

# リソースグループ名
RES_GROUP=$1
# Azureコンテナーレジストリ名
ACR_NAME=$1
# Azureキーコンテナ名
AKV_NAME=$1
# Azureコンテナーレジストリサーバー名
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RES_GROUP --query "loginServer" --output tsv)
# Azureコンテナーレジストリリポジトリ名
REPOSITORY_NAME=$1-api
# タグ名
TAG_NAME=$2
# Azureコンテナーインスタンス名
CONTAINER_NAME=$REPOSITORY_NAME-$TAG_NAME

# AzureコンテナーインスタンスのDockerイメージを更新する
az container create \
    --name $CONTAINER_NAME \
    --resource-group $RES_GROUP \
    --location japaneast \
    --image $ACR_LOGIN_SERVER/$REPOSITORY_NAME:$TAG_NAME \
    --registry-login-server $ACR_LOGIN_SERVER \
    --registry-username $(az keyvault secret show --vault-name $AKV_NAME -n $ACR_NAME-pull-usr --query value -o tsv) \
    --registry-password $(az keyvault secret show --vault-name $AKV_NAME -n $ACR_NAME-pull-pwd --query value -o tsv) \
    --dns-name-label $CONTAINER_NAME \
    --query ipAddress.fqdn \
    --os-type Linux \
    --ports 80 443 \
    --memory 1 \
    --cpu 1
