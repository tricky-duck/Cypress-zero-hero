const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*{js,jsx,ts,tsx}', // use js as a test extension
    excludeSpecPattern:[
      '**/1-getting-started/*', 
      '**/2-advanced-examples/*'] // hide examples from cypress
  },
})
// e2e.js - first executed when cypress runs. 
// commands.js - to keep custom commands or overwrite existing command. 
// fixtures: json for the mocks and etc. 
// e2e folder - for the tests.
// cy.js new extension, spec.js - we'll use in the test