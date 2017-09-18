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
            //console.log(result);
            let lines = fs.readFileSync(result).toString().split('\n');
            // --- Output the Report ----

            let failed = getLines(lines, FAILED);
            let status = 'Passed';
            let hasFailed = false;
            if (failed.length > 0) {
                status = 'Failed';
                hasFailed = true;
            }

            let description = getLines(lines, CASE)[0]+'' + ' Run: ';
            description = description.replace(CASE,'');
            let actions = getLines(lines, ACTION);
            let actionsCount = actions.length;
            let verifications = getLines(lines, VERIFICATION);
            let verificationsCount = verifications.length;
            let failedVerifications = getLines(lines, TESTS_THAT_FAILED);

            console.log('<html lang="en">');
            console.log('<head>');
            console.log('<meta charset="utf-8">');
            console.log('<meta name="description" content="' + description + '">');
            console.log('<title>' + description + '</title>');
            console.log('<meta name="QA Test Automation" content="Maestro Healthcare Inc.">');
            console.log('</head>');
            console.log('<body>');
            console.log('<h1>' + description + '</h1>');
            console.log('<h2 style="color:blue"> Run Completed At: ' + REPORT_DATE + '</h2>');

            if (hasFailed) {
                console.log('<h2 style="color:red">Status of Test: ' + status + '</h2>');
            } else {
                console.log('<h2>Status of Test: ' + status + '</h2>');
            }

// If we have failed verifications, also display those in a table in the report with count

            if (failedVerifications.length > 0) {
                console.log('<table style="width:100%">');
                console.log('<tr>');
                console.log('<th>Failed Tests</th>');
                console.log('</tr>');
                failedVerifications.forEach(function(item){
                    console.log('<tr>');
                    console.log('<td style="color:red">' + item.replace(VERIFICATION ,'') + '</td>');
                    console.log('</tr>');
                });
                console.log('</table>');
                console.log('<h2> Total Number of Failed Verifications: ' + failedVerifications.length + '</h2>');
            }

            console.log('<table style="width:100%">');
            console.log('<tr>');
            console.log('<th>Verifications</th>');
            console.log('</tr>');
            verifications.forEach(function(item){
                console.log('<tr>');
                console.log('<td>' + item.replace(VERIFICATION ,'') + '</td>');
                console.log('</tr>');
            });
            console.log('</table>');
            console.log('<h2> Total Number of Verifications: ' + verificationsCount + '</h2>');

            console.log('<table style="width:100%">');
            console.log('<tr>');
            console.log('<th>Actions</th>');
            console.log('</tr>');
            actions.forEach(function(item){
                console.log('<tr>');
                console.log('<td>' + item.replace(ACTION, '') + '</td>');
                console.log('</tr>');
            });
            console.log('</table>');
            console.log('<h2> Total Number of Actions: ' + actionsCount + '</h2>');
            console.log('</body>');
            console.log('</html>');
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
