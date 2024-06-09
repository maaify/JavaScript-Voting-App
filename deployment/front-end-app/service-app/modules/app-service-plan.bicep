param tags object
param appServicePlan object

resource AppServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: appServicePlan.name
  tags: tags
  location: appServicePlan.region
  properties: {
    reserved: appServicePlan.reserved
    zoneRedundant: appServicePlan.zoneRedundant
  }
  sku: appServicePlan.sku
  kind: appServicePlan.kind
}

output appServicePlanId string = AppServicePlan.id
