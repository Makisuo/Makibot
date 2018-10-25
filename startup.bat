@echo off

:start
node index.js
echo Abgestuerzt am %Date% um %Time% mit Error %ErrorLevel%
echo Strg + C wenn nicht automatisch gerestartet werden soll

goto start