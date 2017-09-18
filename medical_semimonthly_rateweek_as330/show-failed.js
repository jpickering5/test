/**
 * Created by nbaynham on 12/16/16.
 */

let CASE = "[**C]";
let FAILED = "= failed";
let ACTION = "[**Action]";
let VERIFICATION = "[**V]";
let TESTS_THAT_FAILED = "= failed";
let REPORT_DATE = new Date().toString();
let fs = require('fs');

let walk = function(dir, done) {
    let results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk('./', function(err, results) {
    if (err) throw err;
    results.forEach(function(result){
        if (result.indexOf('.log') !== -1) {
            console.log('log file is: ',result);
            let lines = fs.readFileSync(result).toString().split('\n');

            // --- Output the Report ----

            let failed = getLines(lines, FAILED);
            let status = 'Passed';
            if (failed.length > 0) {
                status = 'Failed';
            }

            let description = getLines(lines, CASE)[0]+'' + ' Run: ';
            description = description.replace(CASE,'');
            console.log('Test Name: ' + description);

            let verifications = getLines(lines, VERIFICATION);
            let verificationsCount = verifications.length;
            let failedVerifications = getLines(lines, TESTS_THAT_FAILED);

            console.log('Test is: ',__dirname);
            console.log('Status of Test: ', status);

            if (failedVerifications.length > 0) {
                failedVerifications.forEach(function(item){
                    console.log(item.replace(VERIFICATION ,''));
                });
                console.log('Total Number of Failed Verifications: ' + failedVerifications.length);
            } else {
                console.log('***** No known Failures! *****');
            }
        }
    });
});


let getLines = function(lines, type) {
    let selectedLines = [];
    lines.forEach(function(line){
        if (line.indexOf(type) !== -1) {
            selectedLines.push(line);
        }
    });
    return selectedLines;
};
