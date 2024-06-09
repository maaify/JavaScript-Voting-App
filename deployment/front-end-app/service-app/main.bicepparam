using './main.bicep'

param appServicePlanResourceGroupRegion = ''
param appServicePlanResourceGroupName = ''
param appServicePlanName = ''

param primaryRegion = ''
var projectName = 'javascript-voting-app'

param tags = {
  Application: 'JaveScriptFrameworkVoting'
}

param workspace = {
  name: '${projectName}-workspace'
  region: primaryRegion
  retentionInDays: 30
  publicNetworkAccessForIngestion: 'Enabled'
  publicNetworkAccessForQuery: 'Enabled'
  sku: {
    name: 'PerGB2018'
    capacityReservationLevel: null
  }
  workspaceCapping: {
    dailyQuotaGb: 1
  }
}

param applicationInsights = {
  name: '${projectName}-ai'
  region: primaryRegion

  kind: projectName
  applicationType: 'web'
}

param appServicePlan = {
  name: appServicePlanName
  region: primaryRegion
  reserved: true
  oneRedundant: false
  kind: 'linux'
  sku: {
    name: 'F1'
    tier: 'Free'
    size: 'F1'
    family: 'F'
    capacity: 1
  }
}

param appService = {
  name: '${projectName}-as'
  region: primaryRegion
  enabled: true
  httpsOnly: true
  siteConfig: {
    linuxFxVersion: ''
    alwaysOn: false
    cors: null
    connectionStrings: null
    defaultDocuments: null
    numberOfWorkers: null
    documentRoot: null
    http20Enabled: null
    httpLoggingEnabled: null
    minTlsVersion: '1.2'
    netFrameworkVersion: null
  }
}
