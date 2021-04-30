@ECHO OFF

SETLOCAL

For /F "Skip=2Tokens=1-2*" %%A In ('Reg Query HKCU\Environment /V PATH 2^>Nul') Do (
    SET MYPATH=%%C
)

if not exist "%USERPROFILE%\.clt\cli\" (
    SET NEWPATH=%USERPROFILE%\.clt\cli\bin;%MYPATH%
    setx PATH "%NEWPATH%"  
    md "%USERPROFILE%\.clt\cli\"
    attrib +h "%USERPROFILE%\.clt"
)
SET installdir="%cd%"
cd "%USERPROFILE%\.clt\cli\"
tar -xf "%installdir%\clt-cli.zip" -k

echo Installed
pause