@echo off
for %%p in (4100 8081 5011 5173) do (
  for /f "tokens=5" %%i in ('netstat -ano ^| findstr :%%p') do taskkill /PID %%i /F >nul 2>&1
  echo Freed port %%p
)
pause
