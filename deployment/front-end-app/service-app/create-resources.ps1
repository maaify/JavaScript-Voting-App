$developmentSubscriptionId = '';

az account set --subscription $developmentSubscriptionId;

$appServicePlanResourceGroupRegion = 'eastus';
$appServicePlanResourceGroupName = 'application-service-plans-rg';
$appServicePlanName = 'free-shared-application-plan';

$primaryRegion = 'eastus';
$resourceGroup = 'front-end-javascript-voting-app-rg';

$defaultSubscription = az account list --query "[?isDefault].id" --output tsv;
If ($defaultSubscription -eq $developmentSubscriptionId) {

    az group create -l $appServicePlanResourceGroupRegion -n $appServicePlanResourceGroupName;  
    az group create -l $primaryRegion -n $resourceGroup;

    az deployment group create `
        --name main-deployment `
        --resource-group $resourceGroup `
        --template-file main.bicep `
        --parameters main.bicepparam `
        --parameters appServicePlanResourceGroupRegion=$appServicePlanResourceGroupRegion `
        --parameters appServicePlanResourceGroupName=$appServicePlanResourceGroupName `
        --parameters appServicePlanName=$appServicePlanName `
        --parameters primaryRegion=$primaryRegion;
}
else {
    Write-Host 'You are not on the correct subscription.'
}