@echo off
title Second Pass - tutoring site (close this window to stop the site)
cd /d "%~dp0"

if not exist node_modules (
  echo First-time setup: installing, this takes a couple of minutes...
  call npm install --no-audit --no-fund
)

echo.
echo Starting Second Pass at http://localhost:3000
echo Keep this window open while you use the site. Close it to stop.
echo.

rem Open the browser a few seconds after the site starts.
start "" cmd /c "timeout /t 6 /nobreak >nul & start http://localhost:3000"

call npm run dev
