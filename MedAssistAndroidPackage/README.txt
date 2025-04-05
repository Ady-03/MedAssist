# MedAssist Android App Package

This package contains everything you need to create an Android app version of the MedAssist web application.

## Contents

1. MedAssistAndroid.zip - The Android app source code
2. MedAssistAndroid_Setup_Guide.txt - Detailed setup instructions
3. install_medassist_android.sh - Installation helper script (for macOS/Linux)
4. generated-icon.png - App icon source (if available)

## Quick Start

1. Make sure you have Android Studio installed
2. On macOS/Linux, run: ./install_medassist_android.sh
3. On Windows, extract MedAssistAndroid.zip and open in Android Studio

## Setup Guide

For full setup instructions, see MedAssistAndroid_Setup_Guide.txt

## Notes

- This app uses WebView to wrap the existing MedAssist web application
- You need to provide the URL to your deployed MedAssist server
- The app includes permissions for camera, microphone, location, and file access
