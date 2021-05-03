@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\..\node.exe"
SET "NODE_EXE_NEW=%~dp0\..\node_new.exe"
SET "NPM_CLI_JS=%~dp0\..\index.js"

ECHO %NODE_EXE%

"%NODE_EXE%" "%NPM_CLI_JS%" %*