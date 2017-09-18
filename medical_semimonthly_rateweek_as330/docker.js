/**
 * Created by nbaynham on 6/30/15.
 */

let Jasmine2HTMLReporter = require('protractor-jasmine2-html-reporter');
let failFast = require('jasmine-fail-fast');
exports.config = {
  plugins: [
  ],
  onPrepare: function(){
      jasmine.getEnv().addReporter(
          new Jasmine2HTMLReporter({
              savePath: 'target/reports',
              showPassed: false
          })
      );
      jasmine.getEnv().addReporter(failFast.init())
  },
  seleniumAddress: 'http://localhost:4443/wd/hub',
  beforeLaunch: function() {
  },

  framework: 'jasmine',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--disable-infobars'
            ],
            prefs: {
                // disable chrome's annoying password manager
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false
            }
        }
    },
  allScriptsTimeout: 440000,
  
  suites: {

    test:                             'script.js'

  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 440000,
    isVerbose : true,
    includeStackTrace : true
  }
};