# === STREETWISE BOM NUKE ===
# Cleans Byte Order Mark () from all .js/.jsx files
# By Yama / NULLFIRE

$frontend = "C:\Users\fulls\Desktop\StreetwiseApp-New\frontend"
$src      = Join-Path $frontend "src"

Write-Host "`n=== Scanning for BOM in frontend/src ===" -ForegroundColor Cyan

Get-ChildItem -Path $src -Recurse -Include *.js,*.jsx | ForEach-Object {
    $raw = Get-Content $_.FullName -Raw -Encoding Byte
    if ($raw.Length -gt 2 -and $raw[0] -eq 0xEF -and $raw[1] -eq 0xBB -and $raw[2] -eq 0xBF) {
        $clean = $raw[3..($raw.Length-1)]
        [System.IO.File]::WriteAllBytes($_.FullName, $clean)
        Write-Host " BOM removed  $($_.FullName)" -ForegroundColor Green
    }
}

Write-Host "`n=== BOM cleanup complete ===" -ForegroundColor Yellow
