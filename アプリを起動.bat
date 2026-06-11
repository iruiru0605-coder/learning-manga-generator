@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js が見つかりません。先に https://nodejs.org/ja からインストールしてください。
  pause
  exit /b 1
)

if not exist node_modules (
  echo 初回セットアップ中です。1〜2分お待ちください...
  call npm install
)

echo 4秒後にブラウザが自動で開きます...
start "" cmd /c "timeout /t 4 >nul & start "" http://localhost:5173/"

echo アプリを起動しました。終了するときはこのウィンドウを閉じてください。
npm run dev
