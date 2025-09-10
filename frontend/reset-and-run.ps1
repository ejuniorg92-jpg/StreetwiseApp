Write-Host "`n=== Killing all Node/Vite processes ===" -ForegroundColor Cyan
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "Killing process PID $($_.Id)" -ForegroundColor Yellow
    Stop-Process -Id $_.Id -Force
}

Start-Sleep -Seconds 2

Write-Host "`n=== Removing node_modules and .vite cache ===" -ForegroundColor Cyan
$frontend = "C:\Users\fulls\Desktop\StreetwiseApp-New\frontend"
if (Test-Path (Join-Path $frontend "node_modules")) {
    Remove-Item (Join-Path $frontend "node_modules") -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path (Join-Path $frontend ".vite")) {
    Remove-Item (Join-Path $frontend ".vite") -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "`n=== Installing dependencies fresh ===" -ForegroundColor Cyan
Set-Location $frontend
npm install

Write-Host "`n=== Launching Streetwise Frontend (LAN enabled) ===" -ForegroundColor Cyan
npm run dev -- --host
