# === STREETWISE Endpoint Tests ===
$base = "http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1"
$endpoints = @("ping","getDailyMission","aiRespondSecure","getCryptoPrices","getZones","upgradeTier")
foreach ($ep in $endpoints) {
    try {
        $res = Invoke-RestMethod "$base/$ep" -TimeoutSec 5
        Write-Host "$ep OK" -ForegroundColor Green
    } catch {
        Write-Host "$ep FAIL" -ForegroundColor Red
    }
}
