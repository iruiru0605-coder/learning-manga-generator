@echo off
title Learning Manga Generator
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 echo [ERROR] Node.js not found. Install: https://nodejs.org/ja && pause && exit /b 1

if not exist node_modules echo First-time setup (1-2 min)... && call npm install

echo Starting the app... Browser will open automatically.
echo To stop: close this window. / Owaru toki: kono window wo tojiru.
call npm run dev -- --open

pause