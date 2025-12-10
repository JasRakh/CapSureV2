#!/bin/bash

# Kill any existing Expo processes
echo "Clearing ports..."
lsof -ti:8081,8082 | xargs kill -9 2>/dev/null
sleep 2

# Clear cache and start
echo "Starting Expo with cleared cache..."
npx expo start --clear

