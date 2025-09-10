Write-Host "`n=== [STOP ALL] Killing Node/Java/Firebase ===" -ForegroundColor Cyan
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force }
Get-Process java -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force }
Get-Process firebase -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force }
Write-Host " All processes stopped" -ForegroundColor Green
