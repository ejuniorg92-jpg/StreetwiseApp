@echo off
title STREETWISE  Full Stack Launcher

echo === Stopping any previous processes ===
call "%~dp0\00-stop-all.cmd"

echo === Starting Firebase emulators ===
start cmd.exe /k "cd /d %~dp0..\backend\StreetwiseFunctions && npx firebase-tools@latest emulators:start --only firestore,functions --project streetwise-b13be --import .\data\emulator-data --export-on-exit"

timeout /t 5 >nul

echo === Starting Vite frontend ===
start cmd.exe /k "cd /d %~dp0..\frontend && npm run dev"

timeout /t 8 >nul

echo === Opening Streetwise map ===
start http://localhost:5173/map
start http://127.0.0.1:4100

echo === All systems go. Hustle engaged. ===
pause
