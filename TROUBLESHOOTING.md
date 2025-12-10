# Troubleshooting QR Code Connection

If the app doesn't open through QR code, try these steps:

## 1. Check Network Connection
- Make sure your phone and computer are on the **same Wi-Fi network**
- Try disabling VPN if you're using one
- Check firewall settings on your computer

## 2. Restart Expo Server
```bash
# Stop the current server (Ctrl+C)
# Then restart with:
npx expo start --clear
```

## 3. Use Tunnel Mode (if same network doesn't work)
```bash
npx expo start --tunnel
```
This uses Expo's servers to connect, works even on different networks.

## 4. Check Expo Go App
- Make sure you have **Expo Go** app installed on your phone
- Update Expo Go to the latest version
- Try closing and reopening Expo Go

## 5. Manual Connection
If QR code doesn't work:
- In Expo Go, tap "Enter URL manually"
- Enter: `exp://YOUR_IP:8081`
- Replace YOUR_IP with your computer's IP address (shown in terminal)

## 6. Check for Errors
Look at the terminal output for any error messages. Common issues:
- Port 8081 already in use
- Firewall blocking connection
- Network configuration issues

## 7. Alternative: Use Simulator/Emulator
```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android
```

## 8. Reset Everything
```bash
# Clear cache and restart
watchman watch-del-all  # if watchman is installed
rm -rf node_modules
npm install
npx expo start --clear
```

