#!/bin/bash
# Screenshot helper for extension store submissions
# 
# Requirements:
# - Chrome/Chromium with the extension loaded
# - maim or scrot for screenshots (or use browser DevTools)
#
# Recommended dimensions:
# - Chrome Web Store: 1280x800 or 640x400
# - Firefox Add-ons: 1280x800 (max 3840x2880)

SCREENSHOT_DIR="./screenshots"
mkdir -p "$SCREENSHOT_DIR"

echo "📸 Extension Screenshot Helper"
echo "=============================="
echo ""
echo "For best results, use Chrome DevTools:"
echo ""
echo "1. Open your extension's new tab page"
echo "2. Press F12 to open DevTools"
echo "3. Click the 'Toggle device toolbar' icon (or Ctrl+Shift+M)"
echo "4. Set dimensions to 1280x800"
echo "5. Take screenshots of:"
echo "   - Dark theme (Mocha)"
echo "   - Light theme (Latte)"
echo "   - Settings panel open"
echo ""
echo "6. Right-click the page and select 'Capture screenshot'"
echo ""
echo "Save screenshots to: $SCREENSHOT_DIR/"
echo ""
echo "Recommended filenames:"
echo "  - screenshot-dark.png"
echo "  - screenshot-light.png"  
echo "  - screenshot-settings.png"
echo ""

# If maim is available, offer to take a screenshot
if command -v maim &> /dev/null; then
    echo "Alternatively, press Enter to take a screenshot with maim..."
    read -p "Take screenshot now? (y/n): " choice
    if [[ "$choice" == "y" ]]; then
        echo "Select an area to capture..."
        maim -s "$SCREENSHOT_DIR/screenshot-$(date +%s).png"
        echo "Screenshot saved!"
    fi
fi
