import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5137',
    numTestsKeptInMemory: 50,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 4000,
    execTimeout: 60000,
    taskTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    defaultBrowser: 'chrome',
    slowTestThreshold: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {},
})
