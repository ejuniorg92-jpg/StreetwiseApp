Write-Host "`n=== Running Streetwise Frontend Sanity ===`n" -ForegroundColor Cyan

$src        = "C:\Users\fulls\Desktop\StreetwiseApp-New\frontend\src"
$components = Join-Path $src "components"

$files = @(
  @{ Path = Join-Path $src "App.jsx"; Label = "App.jsx" },
  @{ Path = Join-Path $components "GalaxyBackground.jsx"; Label = "GalaxyBackground.jsx" },
  @{ Path = Join-Path $components "MapTab.jsx"; Label = "MapTab.jsx" },
  @{ Path = Join-Path $src "main.jsx"; Label = "main.jsx" },
  @{ Path = Join-Path $src "index.css"; Label = "index.css" }
)

foreach ($file in $files) {
  $path = $file.Path
  $label = $file.Label
  if (-not (Test-Path $path)) {
    Write-Host " $label missing: $path" -ForegroundColor Red
    continue
  }
  $size = (Get-Item $path).Length
  if ($size -eq 0) {
    Write-Host " $label exists but EMPTY: $path" -ForegroundColor Yellow
  } else {
    Write-Host " $label OK ($size bytes)" -ForegroundColor Green
  }
}

Write-Host "`n=== Streetwise Sanity Done ===" -ForegroundColor Cyan