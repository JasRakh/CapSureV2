# Quick Setup Guide

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device/simulator:**
   - Press `i` for iOS simulator (requires Xcode on Mac)
   - Press `a` for Android emulator (requires Android Studio)
   - Scan QR code with Expo Go app on your physical device

## Assets Note

The `app.json` references some asset files (icon.png, splash.png, etc.). For development, Expo will use default assets. To add custom assets:

1. Create an `assets/` folder in the root directory
2. Add your icon, splash screen, and adaptive icon images
3. Update `app.json` if needed

For now, the app will work without custom assets - Expo provides defaults.

## First Run

On first launch, you'll see the onboarding screens. After completing onboarding, you'll be taken to the Home screen.

## Testing the App

1. **Home Screen**: Tap "Scan a pill" to open the camera
2. **Scanner**: Tap "Scan" button (currently uses mock data)
3. **Result**: View pill information and save to history
4. **History**: See all scanned pills and search
5. **Settings**: Change theme (Light/Dark/System)

## Mock Data

The app currently uses mock pill data. To connect a real API:

- Update `data/mockPills.ts` → `identifyPill()` function
- Replace mock data with actual API call
- Handle image capture and upload

## Troubleshooting

- **Camera not working**: Make sure you grant camera permissions
- **Theme not changing**: Check Settings screen and select a theme
- **Navigation issues**: Ensure all dependencies are installed correctly

