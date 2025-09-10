# === STREETWISE Reset Emulators ===
# Kills lingering processes, frees ports, resets runtime config, restarts emulators
# Yama / NULLFIRE  YAMA_NULLFIRE_20250907

$backendProject = "C:\Users\fulls\Desktop\StreetwiseApp-New\backend\StreetwiseFunctions"
$functionsDir   = "C:\Users\fulls\Desktop\StreetwiseApp-New\backend\StreetwiseFunctions\functions"

Write-Host "
=== RESETTING FIREBASE EMULATORS ===" -ForegroundColor Cyan

# Stop Node & Firebase
Get-Process -Name "node","firebase" -ErrorAction SilentlyContinue | ForEach-Object {
  Write-Host "Killing PID $(.Id) - $(.ProcessName)" -ForegroundColor Yellow
  Stop-Process -Id $_.Id -Force
}

# Free common ports (emulators + vite)
$ports = @(5011,8081,4100,4400,4500,9150,9099,5001,8085,9199,5173)
foreach ($p in $ports) {
  $net = netstat -ano | findstr ":$p"
  if ($net) {
    $net -split "
" | ForEach-Object {
      if ($_ -match "\s(\d+)$") {
        $pid = $Matches[1]
        try {
          Write-Host "Freeing port $p (PID $pid)" -ForegroundColor Yellow
          Stop-Process -Id $pid -Force
        } catch { }
      }
    }
  } else {
    Write-Host "Port $p already free" -ForegroundColor Green
  }
}

# Ensure functions dir exists
if (-not (Test-Path $functionsDir)) {
  New-Item -ItemType Directory -Path $functionsDir | Out-Null
}

# Reset runtime config
$runtimeConfig = Join-Path $functionsDir ".runtimeconfig.json"
Set-Content -Path $runtimeConfig -Value "{}" -Encoding UTF8
Write-Host "Reset .runtimeconfig.json at $runtimeConfig" -ForegroundColor Green

# Start emulators in a new window from the project root (no cd quoting games)
if (-not (Test-Path (Join-Path $backendProject "firebase.json"))) {
  Write-Host "WARNING: firebase.json not found in $backendProject" -ForegroundColor Red
} else {
  Write-Host "Starting Firebase emulators..." -ForegroundColor Cyan
  Start-Process -FilePath "powershell" -WorkingDirectory $backendProject -ArgumentList @(
    '-NoExit',
    '-Command',
    'System.Management.Automation.Internal.Host.InternalHost.UI.RawUI.WindowTitle="Emulators  Streetwise"; firebase emulators:start'
  )
}
