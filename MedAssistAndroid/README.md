# MedAssist Android App

This directory contains the Android app version of the MedAssist web application. The app is a WebView wrapper around the web application, which allows it to be distributed via the Google Play Store and installed directly on Android devices.

## How to Build the App

1. Create a new Android project in Android Studio
2. Copy these files into the appropriate locations in your Android project
3. Update the URL in MainActivity.java to point to your deployed MedAssist server 
4. Build and run the app on your Android device

## Features

- Full access to the MedAssist web application
- Camera access for wound image uploads  
- Microphone access for audio input
- Location services for finding nearby medical facilities
- File access for uploading medical documents
- Proper handling of Android permissions

## Requirements

- Android Studio 4.0+
- Android SDK 21+ (Android 5.0 or higher)
- A deployed MedAssist web application

## Important Notes

1. Before deploying, make sure to update the WebView URL to point to your deployed server
2. Ensure your web application is responsive and works well on mobile devices
3. Test all features, especially those requiring device capabilities like camera and location
