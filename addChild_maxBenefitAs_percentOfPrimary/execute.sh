#!/usr/bin/env bash
mkdir -p ./logs
cp ../../core/tools/report-generator.js .
cp ../../core/medge/templates/conf.js .
cp ../../core/medge/templates/script.js .

today=`date +%Y-%m-%d.%H:%M:%S`
protractor conf | tee ./logs/run_+$today+.log
node report-generator ./logs/run_+$today+.log > ./reports/report_+$today+.html
open ./reports/report_+$today+.html