# PillScan - Pill & Capsule Identification App

A modern React Native mobile app built with Expo for identifying pills and capsules using your camera.

## Features

- 📷 **Camera-based scanning** - Point your camera at a pill to identify it
- 🎨 **Light & Dark themes** - Beautiful UI that adapts to your preference
- 📋 **Scan history** - Save and review previously identified pills
- 🔍 **Search functionality** - Quickly find pills in your history
- ⚙️ **Customizable settings** - Theme preferences and more
- 🎯 **Onboarding flow** - Smooth first-time user experience
- ✨ **Smooth animations** - Polished micro-interactions throughout

## Tech Stack

- **React Native** with **Expo** (~50.0.0)
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Expo Camera** for camera functionality
- **AsyncStorage** for local data persistence
- **React Native Reanimated** for animations

## Project Structure

```
CapSureV2/
├── App.tsx                 # Main app entry point
├── components/             # Reusable UI components
│   ├── PrimaryButton.tsx
│   ├── Card.tsx
│   ├── TagChip.tsx
│   ├── PillInfoSection.tsx
│   └── ConfidenceBadge.tsx
├── screens/                # App screens
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ScannerScreen.tsx
│   ├── ResultScreen.tsx
│   ├── HistoryScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/             # Navigation setup
│   ├── AppNavigator.tsx
│   └── types.ts
├── theme/                  # Theme system
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── index.ts
│   └── ThemeContext.tsx
├── types/                  # TypeScript types
│   └── index.ts
├── data/                   # Mock data
│   └── mockPills.ts
└── utils/                  # Utility functions
    └── storage.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Current Implementation

### Mock Data
The app currently uses mock data for pill identification. The `identifyPill()` function in `data/mockPills.ts` simulates an API call and returns a random pill from the mock database.

### Future Integration
To connect a real ML model or API:

1. **Update `data/mockPills.ts`**:
   - Replace `identifyPill()` function with actual API call
   - Process camera image and send to your backend
   - Handle API responses and errors

2. **Camera Integration**:
   - The scanner screen is ready for real image capture
   - Use `expo-camera`'s `takePictureAsync()` method
   - Send captured image to your identification service

3. **Error Handling**:
   - Add proper error states in `ScannerScreen.tsx`
   - Handle network errors gracefully
   - Show user-friendly error messages

## Theme System

The app includes a comprehensive theme system supporting:
- **Light mode** - Clean, bright interface
- **Dark mode** - Easy on the eyes
- **System preference** - Automatically follows device settings

Themes are defined in `theme/colors.ts` and can be easily customized.

## Screens

### Onboarding
- First-time user experience
- 3-step introduction to app features
- Stored in AsyncStorage to show only once

### Home
- Main entry point
- Quick access to scanner
- Navigation to History and Settings

### Scanner
- Full-screen camera view
- Visual guide for pill placement
- Simulated identification process

### Result
- Detailed pill information
- Usage instructions
- Safety warnings
- Save to history functionality

### History
- List of all scanned pills
- Search functionality
- Tap to view full details

### Settings
- Theme selection (System/Light/Dark)
- Medical disclaimer
- App version info

## Components

All components are theme-aware and support both light and dark modes:

- **PrimaryButton** - Main action button with loading state
- **Card** - Container with shadow and border
- **TagChip** - Small tag for categories
- **PillInfoSection** - Section header with content
- **ConfidenceBadge** - Visual confidence indicator

## Accessibility

- Proper touch targets (minimum 44x44 points)
- Readable font sizes
- High contrast in both themes
- Clear visual feedback

## Medical Disclaimer

⚠️ **Important**: This app is for informational purposes only and does not replace professional medical advice. Always consult a healthcare professional before taking any medication.

## License

This project is created for educational purposes.

## Contributing

When extending this app:

1. Follow the existing folder structure
2. Use TypeScript for all new files
3. Make components theme-aware
4. Add proper error handling
5. Test in both light and dark modes

## Notes

- The app uses Expo's managed workflow
- All navigation is handled by React Navigation
- Local storage uses AsyncStorage
- Animations use React Native Reanimated
- Camera permissions are requested on first use

