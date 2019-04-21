#! /bin/bash

RES_GROUP=$1 # Resource Group name
ACR_NAME=$2       # Azure Container Registry registry name
AKV_NAME=$2       # Azure Key Vault vault name

ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $2 --query "loginServer" --output tsv)

az container create \
    --name $CONTAINER_NAME \
    --resource-group $RES_GROUP \
    --location japaneast \
    --image $ACR_LOGIN_SERVER/$REPOSITORY_NAME:$3 \
    --registry-login-server $ACR_LOGIN_SERVER \
    --registry-username $(az keyvault secret show --vault-name $AKV_NAME -n $ACR_NAME-pull-usr --query value -o tsv) \
    --registry-password $(az keyvault secret show --vault-name $AKV_NAME -n $ACR_NAME-pull-pwd --query value -o tsv) \
    --dns-name-label $CONTAINER_NAME \
    --query ipAddress.fqdn \
    --os-type Linux \
    --ports 80 443 \
    --memory 1 \
    --cpu 1
