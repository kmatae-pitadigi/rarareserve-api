#! /bin/bash

# Resource Group name
RES_GROUP=$1
# Azure Container Registry registry name
ACR_NAME=$2
# Azure Key Vault vault name
AKV_NAME=$2
# Azure Container Instance Name
CONTAINER_NAME=$1-api-$3

# Azure Container Registry Server Name
ACR_LOGIN_SERVER=$(sudo az acr show --name $ACR_NAME --resource-group $2 --query "loginServer" --output tsv)

# Create Azure Container Instance
sudo az container create \
    --name $CONTAINER_NAME \
    --resource-group $RES_GROUP \
    --location japaneast \
    --image $ACR_LOGIN_SERVER/$REPOSITORY_NAME:$3 \
    --registry-login-server $ACR_LOGIN_SERVER \
    --registry-username $(sudo az keyvault secret show --vault-name $AKV_NAME -n $ACR_NAME-pull-usr --query value -o tsv) \
    --registry-password $(sudo az keyvault secret show --vault-name $AKV_NAME -n $ACR_NAME-pull-pwd --query value -o tsv) \
    --dns-name-label $CONTAINER_NAME \
    --query ipAddress.fqdn \
    --os-type Linux \
    --ports 80 443 \
    --memory 1 \
    --cpu 1
