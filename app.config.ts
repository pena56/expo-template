/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from "@expo/config";

import { ClientEnv, Env } from "./env";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: "expo-template",
  version: Env.VERSION.toString(),
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#2E3C4B",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#2E3C4B",
    },
    package: Env.PACKAGE,
  },
  web: {
    favicon: "./src/assets/images/favicon.png",
    bundler: "metro",
  },
  plugins: [
    [
      "expo-font",
      {
        fonts: ["./src/assets/fonts/SpaceMono-Regular.ttf"],
      },
    ],
    "expo-router",
    [
      "expo-build-properties",
      {
        android: {
          kotlinVersion: "1.7.22", // this is for softinput package
        },
      },
    ],
    [
      "app-icon-badge",
      {
        enabled: Env.APP_ENV !== "production",
        badges: [
          {
            text: Env.APP_ENV,
            type: "banner",
            color: "white",
          },
          {
            text: Env.VERSION.toString(),
            type: "ribbon",
            color: "white",
          },
        ],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
