# Buzmarkt

## Kurulum

### Gereksinimler
- Node.js (LTS)
- npm veya yarn
- React Native CLI
- Android Studio (Android için)
- Xcode (iOS için, sadece MacOS)
- JDK
- Watchman (MacOS için)

### Kurulum Adımları

1. Bağımlılıkları yükle:
```bash
npm install
# veya
yarn install
```

2. iOS için (MacOS):
```bash
cd ios
pod install
cd ..
```

3. Projeyi başlat:
```bash
# Android için
npm run android

# iOS için (MacOS)
npm run ios

# Metro bundler
npm start
```

