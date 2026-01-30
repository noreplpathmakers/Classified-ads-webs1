$sourceDir = "c:\Users\97466\.gemini\antigravity\brain\12fbaca1-6725-4d02-a671-b8c5f15bac9d"
$destDir = "c:\Users\97466\Downloads\18 Classified ads webs\18 Classified ads webs\Assets"

# Ensure destination exists
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Map Generated Files
$hero = Get-ChildItem "$sourceDir\new_cyber_hero*.png" | Select-Object -First 1
$shield = Get-ChildItem "$sourceDir\feature_cyber_shield*.png" | Select-Object -First 1
$avatar = Get-ChildItem "$sourceDir\avatar_cyber_punk*.png" | Select-Object -First 1

# Item Array (Added Drone)
$items = @(
    (Get-ChildItem "$sourceDir\item_cyber_drone*.png" | Select-Object -First 1), # NEW
    (Get-ChildItem "$sourceDir\item_cyber_camera*.png" | Select-Object -First 1),
    (Get-ChildItem "$sourceDir\item_cyber_chair*.png" | Select-Object -First 1),
    (Get-ChildItem "$sourceDir\item_cyber_laptop*.png" | Select-Object -First 1),
    (Get-ChildItem "$sourceDir\item_cyber_guitar*.png" | Select-Object -First 1),
    (Get-ChildItem "$sourceDir\item_cyber_car*.png" | Select-Object -First 1),
    (Get-ChildItem "$sourceDir\item_cyber_house*.png" | Select-Object -First 1),
    (Get-ChildItem "$sourceDir\item_cyber_fashion*.png" | Select-Object -First 1)
)

# 1. Critical replacements
Copy-Item $hero.FullName "$destDir\neo-hero.png" -Force
Copy-Item $hero.FullName "$destDir\neon_bg_home1.png" -Force
Copy-Item $items[5].FullName "$destDir\neon_bg_home2.png" -Force # House for home2 bg
Copy-Item $items[0].FullName "$destDir\neo-innovate.png" -Force # Drone for innovate
Copy-Item $items[2].FullName "$destDir\neo-connect.png" -Force # Chair/Abstract for connect
Copy-Item $shield.FullName "$destDir\neo-safe.png" -Force # Shield for safe

# 2. Numbered Loop (1 to 60) for jpegs
# We will use a stepped approach to make it look less sequential
$step = 0
for ($i = 1; $i -le 60; $i++) {
    $targetName = "$i.jpeg"
    
    # Simple pseudo-random logic: (i + step) % count
    $index = ($i + $step) % $items.Count
    $sourceImg = $items[$index]
    
    # Change step every 5 items to shift the pattern
    if ($i % 5 -eq 0) {
        $step++
    }

    Copy-Item $sourceImg.FullName "$destDir\$targetName" -Force
    Write-Host "Restored $targetName"
}

Write-Host "Image restoration complete with new assets."
