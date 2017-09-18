/**
 * Created by nbaynham on 12/16/16.
 */

let CASE = "[**C]";
let FAILED = "Failed: ";
let ACTION = "[**Action]";
let VERIFICATION = "[**V]";
let TESTS_THAT_FAILED = "= failed";

let fs = require('fs');
let lines = fs.readFileSync(process.argv[2]).toString().split('\n');

let getLines = function(lines, type) {
    let selectedLines = [];
    lines.forEach(function(line){
        if (line.indexOf(type) !== -1) {
            selectedLines.push(line);
        }
    });
    return selectedLines;
};


// --- Output the Report ----

let description = getLines(lines, CASE)[0].replace(CASE,'');
let actions = getLines(lines, ACTION);
let actionsCount = actions.length;
let verifications = getLines(lines, VERIFICATION);
let verificationsCount = verifications.length;
let failedVerifications = getLines(lines, TESTS_THAT_FAILED);

let failed = getLines(lines, FAILED);
let status = 'Passed';
if (failed.length > 0 || verificationsCount === 0 || failedVerifications.length > 0) {
    status = 'Failed';
}

console.log('<html lang="en">');
console.log('<head>');
console.log('<meta charset="utf-8">');
console.log('<meta name="description" content="' + description + '">');
console.log('<title>' + description + '</title>');
console.log('<meta name="QA Test Automation" content="Maestro Healthcare Inc.">');
console.log('</head>');
console.log('<body>');
console.log('<h1>' + description + '</h1>');
console.log('<h2>Status of Test: ' + status + '</h2>');

// If we have failed verifications, also display those in a table in the report with count

if (failedVerifications.length > 0) {
    console.log('<table style="width:100%">');
    console.log('<tr>');
    console.log('<th>Failed Tests</th>');
    console.log('</tr>');
    failedVerifications.forEach(function(item){
        console.log('<tr>');
        console.log('<td>' + item.replace(VERIFICATION ,'') + '</td>');
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
