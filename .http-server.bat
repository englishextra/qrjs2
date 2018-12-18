:: stackoverflow.com/questions/17063947/get-current-batchfile-directory
:: echo %~dp0 will return path to batch location. echo %~f0 will return path to the batch with filename

http-server %~dp0 -a 127.0.0.1 -p 8080
pause
