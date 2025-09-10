Write-Host "`n=== [SANITY CHECK] Backend ===" -ForegroundColor Cyan

$backend = "C:\Users\fulls\Desktop\StreetwiseApp-New\backend"
$mustHave = @("firebase.json", "firestore.rules", "storage.rules", ".firebaserc")

foreach ($file in $mustHave) {
    $path = Join-Path $backend $file
    if (Test-Path $path) {
        Write-Host " Found $file" -ForegroundColor Green
    } else {
        Write-Host " Missing $file" -ForegroundColor Red
    }
}

$funcPkg = Join-Path $backend "functions\package.json"
if (Test-Path $funcPkg) {
    Write-Host " Functions package.json exists" -ForegroundColor Green
} else {
    Write-Host " Missing functions\package.json" -ForegroundColor Red
}

Write-Host "`n=== Sanity Check Complete ===" -ForegroundColor Cyan
