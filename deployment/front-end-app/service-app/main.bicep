#disable-next-line no-unused-params
param appServicePlanResourceGroupRegion string
#disable-next-line no-unused-params
param appServicePlanResourceGroupName string
#disable-next-line no-unused-params
param appServicePlanName string

#disable-next-line no-unused-params
param primaryRegion string

param tags object
param workspace object
param applicationInsights object
param appServicePlan object
param appService object

module WorkspaceDepoloyment './modules/workspace.bicep' = {
  name: 'workspace-deployment'
  params: {
    tags: tags
    workspace: workspace
  }
}

module ApplicationInishgtsDeployment './modules/application-insights.bicep' = {
  name: 'application-insights-deployment'
  params: {
    workspaceId: WorkspaceDepoloyment.outputs.workspaceId
    tags: tags
    applicationInsights: applicationInsights
  }
}

module AppServicePlanDeployment './modules/app-service-plan.bicep' = {
  name: 'app-service-plan-deployment'
  scope: resourceGroup(appServicePlanResourceGroupRegion)
  params: {
    tags: tags
    appServicePlan: appServicePlan
  }

  dependsOn: [
    ApplicationInishgtsDeployment
  ]
}

module AppServiceDeployment './modules/app-service.bicep' = {
  name: 'app-service-deployment'
  params: {
    tags: tags
    appServiePlanName: appServicePlan.name
    appService: appService
    applicationInsights: applicationInsights.name
  }

  dependsOn: [
    AppServicePlanDeployment
    ApplicationInishgtsDeployment
  ]
}
