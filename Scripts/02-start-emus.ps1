Write-Host "`n=== [EMULATORS] Starting Firebase Suite ===" -ForegroundColor Cyan
Set-Location "C:\Users\fulls\Desktop\StreetwiseApp-New\backend"

firebase emulators:start --only functions,firestore,auth,storage --project streetwise-b13be
