# === STREETWISE Status Reporter ===
$ports = @{
  "Functions" = 5011
  "Firestore" = 8081
  "Auth"      = 9099
  "Storage"   = 9199
  "Hosting"   = 5001
  "PubSub"    = 8085
  "UI"        = 4100
  "Frontend"  = 5173
}
foreach ($kv in $ports.GetEnumerator()) {
    $net = netstat -ano | findstr ":$($kv.Value)"
    if ($net) {
        Write-Host "$($kv.Key) running on port $($kv.Value)" -ForegroundColor Green
    } else {
        Write-Host "$($kv.Key) NOT running" -ForegroundColor Red
    }
}
