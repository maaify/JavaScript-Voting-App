param tags object
param appServiePlanName string
param applicationInsights string
param appService object

resource AppServicePlan 'Microsoft.Web/serverfarms@2022-09-01' existing = {
  name: appServiePlanName
}

resource ApplicationInsights 'Microsoft.Insights/components@2020-02-02' existing = if (applicationInsights != null) {
  name: applicationInsights
}

var appSettings = applicationInsights == null ? [] : [
  {
    name: 'APPINSIGHTS_CONNECTIONSTRING'
    value: ApplicationInsights.properties.ConnectionString
  }
  {
    name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
    value: ApplicationInsights.properties.InstrumentationKey
  }
]

resource AppService 'Microsoft.Web/sites@2022-09-01' = {
  name: appService.name
  tags: tags
  location: appService.region
  properties: {
    enabled: appService.enabled
    httpsOnly: appService.httpsOnly
    serverFarmId: AppServicePlan.id
    siteConfig: {
      linuxFxVersion: appService.siteConfig.linuxFxVersion
      alwaysOn: appService.siteConfig.alwaysOn
      cors: appService.siteConfig.cors
      connectionStrings: appService.siteConfig.connectionStrings
      defaultDocuments: appService.siteConfig.defaultDocuments
      numberOfWorkers: appService.siteConfig.numberOfWorkers
      documentRoot: appService.siteConfig.documentRoot
      http20Enabled: appService.siteConfig.http20Enabled
      httpLoggingEnabled: appService.siteConfig.httpLoggingEnabled
      minTlsVersion: appService.siteConfig.minTlsVersion
      netFrameworkVersion: appService.siteConfig.netFrameworkVersion
      appSettings: appSettings
    }
  }
}
