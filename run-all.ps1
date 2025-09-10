Write-Host "`n=== STEP 1: Kill old Firebase/Node processes ===" -ForegroundColor Cyan
Get-Process -Name "node","java" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host " Old processes killed" -ForegroundColor Green

Write-Host "`n=== STEP 2: Clear Firebase + Vite caches ===" -ForegroundColor Cyan
$firebaseCache = Join-Path $backend ".firebase"
$runtimeConfig = Join-Path $backend ".runtimeconfig.json"
$viteCache     = Join-Path $frontend "node_modules\.vite"
if (Test-Path $firebaseCache) { Remove-Item $firebaseCache -Recurse -Force }
if (Test-Path $viteCache) { Remove-Item $viteCache -Recurse -Force }
Set-Content $runtimeConfig "{}" -Encoding UTF8
Write-Host " Caches + runtimeconfig cleared" -ForegroundColor Green

Write-Host "`n=== STEP 3: Ensure backend .env ===" -ForegroundColor Cyan
$envFile = Join-Path $backend ".env"
$envContent = @"
FIRESTORE_EMULATOR_HOST=127.0.0.1:8081
GCLOUD_PROJECT=streetwise-b13be
"@
Set-Content $envFile $envContent -Encoding UTF8
Write-Host " .env written to $envFile" -ForegroundColor Green

Write-Host "`n=== STEP 4: Start Firebase Emulators ===" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "Set-Location `"$backend`"; firebase emulators:start --only functions,firestore,auth --project streetwise-b13be --import=./seed --export-on-exit --ui --debug"
Start-Sleep -Seconds 6
Write-Host " Emulators launched in new window" -ForegroundColor Green

Write-Host "`n=== STEP 5: Start Vite frontend ===" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "Set-Location `"$frontend`"; npm run dev -- --host"
Start-Sleep -Seconds 5
Write-Host " Vite frontend launched in new window" -ForegroundColor Green

Write-Host "`n=== STEP 6: Open Emulator UI + Frontend ===" -ForegroundColor Cyan
Start-Process "http://127.0.0.1:4100/"
Start-Process "http://localhost:5173/"

Write-Host "`n=== STREETWISE STACK READY ===" -ForegroundColor Yellow
