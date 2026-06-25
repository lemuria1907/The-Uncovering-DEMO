@echo off
chcp 65001 >nul
echo 🎭 案件推演 - 启动中...
cd /d "%~dp0"
start "" http://127.0.0.1:8787
python -m http.server 8787
pause
