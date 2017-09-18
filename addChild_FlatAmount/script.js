/**
 * ******** Framework 2.0 ********
 * Created by nbaynham on 10/21/15.
 */

let test = require('./test.json');

describe(test.case, function(){
    
    it(' E2E Automated Test ', function(){
        test.testName = __dirname.split('/')[7];
        controller.execute(test);
    });
});

let Controller = require('../../core/medge/controllers/medge-controller.js');
let controller = new Controller();
