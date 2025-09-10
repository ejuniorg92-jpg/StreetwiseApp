# === STREETWISE Start Emulators ===
$backend = "C:\Users\fulls\Desktop\StreetwiseApp-New\backend"
Set-Location $backend
Write-Host "`n=== Starting Firebase Emulators ===" -ForegroundColor Cyan
firebase emulators:start --only functions,firestore,auth,storage,hosting,pubsub --import ./emudata --export-on-exit --project streetwise-b13be
