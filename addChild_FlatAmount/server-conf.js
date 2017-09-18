/**
 * Created by nbaynham on 6/30/15.
 */

let Reporter = require('protractor-jasmine2-screenshot-reporter');
let reporter = new Reporter({
  captureOnlyFailedSpecs: false,
  dest: 'reports/screenshots',
  filename: 'report.html'
});

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);

  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  framework: 'jasmine',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--verbose --log-path=chromedriver.log --start-maximized, --disable-extensions, --disable-web-security, --disable-infobars'
            ],
            prefs: {
                // disable chrome's annoying password manager
                'credentials_enable_service': false,
                'password_manager_enabled': false
            }
        }
    },
  allScriptsTimeout: 440000,
  
  suites: {

    test:                             'server-script.js'

  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 160000,
    isVerbose : true,
    includeStackTrace : true
  }
};