/**
 * Created by nbaynham on 6/30/15.
 */

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
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