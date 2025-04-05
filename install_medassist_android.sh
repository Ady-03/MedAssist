#!/bin/bash

echo "MedAssist Android App Installation Helper"
echo "========================================"
echo "This script will help you set up and deploy the MedAssist Android app."
echo ""

# Check if the user has Android Studio installed
echo "Step 1: Checking for Android Studio installation..."
if command -v /Applications/Android\ Studio.app/Contents/MacOS/studio &> /dev/null; then
    echo "Android Studio found on macOS."
    ANDROID_STUDIO_PATH="/Applications/Android Studio.app/Contents/MacOS/studio"
elif command -v /usr/local/android-studio/bin/studio.sh &> /dev/null; then
    echo "Android Studio found on Linux."
    ANDROID_STUDIO_PATH="/usr/local/android-studio/bin/studio.sh"
elif command -v studio64.exe &> /dev/null; then
    echo "Android Studio found on Windows."
    ANDROID_STUDIO_PATH="studio64.exe"
else
    echo "Android Studio not found. Please install Android Studio first."
    echo "Download Android Studio from: https://developer.android.com/studio"
    echo "Then run this script again."
    exit 1
fi

# Create a temporary directory for the Android project
echo ""
echo "Step 2: Setting up project files..."
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Extract the Android app files to the temporary directory
echo "Extracting MedAssistAndroid.zip to $TEMP_DIR..."
unzip -q MedAssistAndroid.zip -d $TEMP_DIR

# Ask the user for their server URL
echo ""
echo "Step 3: Configure the app to connect to your server"
echo "Enter the URL of your deployed MedAssist web application:"
echo "(e.g., https://your-medassist-server.com)"
read SERVER_URL

# Update the MainActivity.java file with the correct server URL
echo "Updating MainActivity.java with your server URL..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|https://your-medassist-server.com|$SERVER_URL|g" $TEMP_DIR/MainActivity.java
else
    # Linux and Windows with Git Bash
    sed -i "s|https://your-medassist-server.com|$SERVER_URL|g" $TEMP_DIR/MainActivity.java
fi

echo ""
echo "Step 4: Opening Android Studio..."
echo "Android Studio will now open. Please follow these steps:"
echo "1. Select 'Open an Existing Project'"
echo "2. Navigate to and select the temporary directory: $TEMP_DIR"
echo "3. When the project opens, follow the instructions in MedAssistAndroid_Setup_Guide.txt"
echo ""
echo "The MedAssistAndroid_Setup_Guide.txt file contains detailed instructions for:"
echo "- Adding app icons"
echo "- Building and testing the app"
echo "- Deploying the app to users or the Google Play Store"
echo ""
echo "Press Enter to open Android Studio..."
read

# Open Android Studio with the project
"$ANDROID_STUDIO_PATH" "$TEMP_DIR" &

echo ""
echo "Android Studio is now opening with the MedAssist Android project."
echo "Refer to MedAssistAndroid_Setup_Guide.txt for further instructions."
echo ""
echo "Installation helper complete!"
