@echo off
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto NONODE

if not exist node_modules (
  echo 初回セットアップ中です。1、2分お待ちください...
  call npm install
)

echo 4秒後にブラウザが自動で開きます...
start "" cmd /c "timeout /t 4 >nul & start "" http://localhost:5173/"

echo アプリを起動しました。終了するときはこのウィンドウを閉じてください。
call npm run dev

echo.
echo サーバーが終了しました。
pause
goto END

:NONODE
echo Node.js が見つかりません。先に https://nodejs.org/ja からインストールしてください。
pause

:END