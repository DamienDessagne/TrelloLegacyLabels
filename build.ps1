$MyInvocation.MyCommand.Path | Split-Path | Push-Location

Push-Location -Path ".\source"

# V2 version
(Get-Content manifest.json) -Replace '"manifest_version": 3,', '"manifest_version": 2,' | Set-Content manifest.json
Compress-Archive -DestinationPath "..\dist\TrelloLegcyLabels.v2.zip" -CompressionLevel Optimal -Path ".\legacylabels.js", ".\icons", ".\manifest.json" -Force

# V3 version
(Get-Content manifest.json) -Replace '"manifest_version": 2,', '"manifest_version": 3,' | Set-Content manifest.json
Compress-Archive -DestinationPath "..\dist\TrelloLegcyLabels.v3.zip" -CompressionLevel Optimal -Path ".\legacylabels.js", ".\icons", ".\manifest.json" -Force

# Clean up
Pop-Location
Pop-Location