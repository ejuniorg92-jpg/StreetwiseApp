Write-Host "`n=== Killing Firebase + Vite processes ===" -ForegroundColor Cyan

# Kill Node processes that might be emulators/vite
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "Killing Node PID $($_.Id)" -ForegroundColor Yellow
    Stop-Process -Id $_.Id -Force
}

# Kill Java (Firestore/Emulator backend)
Get-Process java -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "Killing Java PID $($_.Id)" -ForegroundColor Yellow
    Stop-Process -Id $_.Id -Force
}

# Kill ports manually (5011, 8081, 9099, 4100, 5173, 5174, 4400)
$ports = 5011,8081,9099,4100,5173,5174,4400
foreach ($port in $ports) {
    $lines = netstat -ano | findstr ":$port"
    foreach ($line in $lines) {
        $parts = $line -split '\s+'
        $pid = $parts[-1]
        if ($pid -match '^\d+$') {
            Write-Host "Freeing port $port (PID $pid)" -ForegroundColor Magenta
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "`n All Firebase/Vite ports cleaned. Safe to restart." -ForegroundColor Green
