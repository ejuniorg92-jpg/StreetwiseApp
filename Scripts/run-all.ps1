# === STREETWISE Master Runner ===
$root    = "C:\Users\fulls\Desktop\StreetwiseApp-New"
$scripts = Join-Path $root "Scripts"

Write-Host "`n=== RUN-ALL START ===" -ForegroundColor Cyan

& (Join-Path $scripts "00-stop-all.ps1")
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit","-Command","& '$(Join-Path $scripts "01-start-emus.ps1")'"
Start-Sleep -Seconds 15

& (Join-Path $scripts "02-run-tests.ps1")
Start-Process powershell -ArgumentList "-NoExit","-Command","& '$(Join-Path $scripts "03-start-frontend.ps1")'"

Write-Host "`n=== STACK ONLINE ===" -ForegroundColor Green
Write-Host "Check Emulator UI: http://127.0.0.1:4100/" -ForegroundColor Yellow
Write-Host "Frontend (Vite):  http://127.0.0.1:5173/" -ForegroundColor Yellow
