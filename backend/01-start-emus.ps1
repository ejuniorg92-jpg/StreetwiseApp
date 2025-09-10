Write-Host "`n=== Launching Firebase Emulators ===" -ForegroundColor Cyan
Set-Location "C:\Users\fulls\Desktop\StreetwiseApp-New\backend"

# Start emulators: functions, firestore, auth, storage, extensions
firebase emulators:start `
  --only functions,firestore,auth,storage,extensions `
  --project streetwise-b13be `
  --import=./seed `
  --export-on-exit `
  --inspect-functions
