Write-Host "`n Launching Streetwise Frontend..." -ForegroundColor Cyan
Set-Location "C:\Users\fulls\Desktop\StreetwiseApp-New\frontend"

# Kill old vite if running
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*vite*" } | ForEach-Object {
    Write-Host "Killing old vite process (PID $($_.Id))" -ForegroundColor Yellow
    Stop-Process -Id $_.Id -Force
}

# Start vite with LAN access
npm run dev -- --host
