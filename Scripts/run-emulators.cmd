@echo off
title STREETWISE  Firebase Emulators
cd /d "C:\Users\fulls\Desktop\StreetwiseApp-New\backend\StreetwiseFunctions"
echo Starting emulators from %cd% ...
npx firebase-tools@latest emulators:start --only firestore,functions --project streetwise-b13be --import ".\data\emulator-data" --export-on-exit
pause
