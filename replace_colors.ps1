$files = Get-ChildItem -Path "c:/Users/97466/Downloads/18 Classified ads webs/18 Classified ads webs" -Recurse -Include *.html,*.css,*.js
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace 'indigo', 'cyan' -replace 'rose', 'fuchsia' -replace 'slate', 'zinc'
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
