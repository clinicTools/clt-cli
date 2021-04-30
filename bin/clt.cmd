@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\..\node.exe"
SET "NPM_CLI_JS=%~dp0\..\index.js"

"%NODE_EXE%" "%NPM_CLI_JS%" %*