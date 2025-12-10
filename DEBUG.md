# Debug Guide - QR Code Not Opening

## Step 1: Check if Expo Server is Running

Run this command and look for the QR code:
```bash
npx expo start --clear
```

You should see:
- QR code in terminal
- URL like `exp://192.168.x.x:8081`
- "Metro waiting on..." message

## Step 2: Test Basic Connection

1. **Check your IP address**:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   Or on Mac:
   ```bash
   ipconfig getifaddr en0
   ```

2. **Try manual URL entry in Expo Go**:
   - Open Expo Go app
   - Tap "Enter URL manually"
   - Enter: `exp://YOUR_IP:8081` (replace YOUR_IP with your computer's IP)

## Step 3: Check for Errors

Look at the terminal output for:
- Red error messages
- "Unable to resolve module" errors
- Network connection errors

## Step 4: Try Tunnel Mode

```bash
npx expo start --tunnel --clear
```

Wait 30-60 seconds for tunnel to establish, then try QR code again.

## Step 5: Check Network

- Make sure phone and computer are on **same Wi-Fi network** (for regular mode)
- Try disabling VPN
- Check firewall settings
- Try mobile hotspot if Wi-Fi doesn't work

## Step 6: Verify Expo Go App

- Make sure Expo Go is updated to latest version
- Try closing and reopening Expo Go
- Check Expo Go permissions (camera for QR scanning)

## Step 7: Check App Code

Run TypeScript check:
```bash
npx tsc --noEmit
```

If there are errors, fix them first.

## Step 8: Minimal Test

Try this minimal app to test if connection works:

Create `App-test.tsx`:
```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World!</Text>
    </View>
  );
}
```

Rename your current `App.tsx` to `App.tsx.backup` and rename `App-test.tsx` to `App.tsx`, then try again.

