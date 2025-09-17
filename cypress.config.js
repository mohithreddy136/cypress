const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    screenshotOnRunFailure: true, // Auto-screenshot on test failure
screenshotsFolder: 'cypress/screenshots',
video: true, // Record videos
videoUploadOnPasses: false, 
trashAssetsBeforeRuns: true,// Don't upload videos of passing tests
videosFolder: 'cypress/videos', // Videos save location
viewportWidth: 1280, // Set video dimensions
viewportHeight: 720,

    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
  },
});
