$files = Get-ChildItem -Path "c:/Users/97466/Downloads/18 Classified ads webs/18 Classified ads webs" -Recurse -Include *.html,*.css,*.js
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Fix translate -> tranzinc back to translate
    $newContent = $content -replace 'tranzinc', 'translate'
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Fixed $($file.Name)"
    }
}
