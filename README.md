# Welcome to Pridepay!
Created for Longwood Central School District and by Longwood Students!

Created by Hussain Iqbal and Jadon Blessing

This app is essentially a digitalization of the currency system BR3 in Longwood Central School district. It allows for teacher and students to send and recieve BR3 bucks with ease. It even allows for purchases through the school store!


## Current application Layout


Currently includes:

- React Native
- Expo
- Expo Router
- TypeScript

## Quick Start

The project's structure will look similar to this:

```
Pridepay
├── app
│   ├── teacher
|      ├── Teacher_Page.tsx
|   ├── student
|      ├── Student_Page.tsx
│   ├── index.tsx 
│   ├── Layout__.tsx
├── components
├── assets
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
├── .env
|── package-lock.json
└── package.json


```

### ./app directory

The code of the project is all in the `app` directory. This is a directory you would normally have to create when using vanilla React Native.(otherwise labelled as `src`)
This directory contains your Student, Teacher, and Admin page logic

**components**
This is where your reusable components live which help you build your screens.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**index.tsx** This is the entry point to the app. This is where you will find the login page


## Development

Make sure when you start up a new development environment or pull, to run  `yarn install`
To run the application for testing, run `npx expo start --dev-client` and a list will pop up. Choose from there to run the app for the OS that you desire'

**REMEMBER** *We are using Expo EAS not Expo Go, this app uses [Custom Native Code](https://docs.expo.dev/workflow/customizing/), So when running start as dev-client otherwise you will not be able to sign in*

**The app is currently using:**

[Firebase](https://console.firebase.google.com/u/0/)

[GoogleOAuth](https://console.cloud.google.com/getting-started?project=pridepay-384911&supportedpurview=project)

[Expo-EAS](https://docs.expo.dev/)

Firebase is the Database we are using to store all information whether it be student br3 count, or teacher's raffle's
Expo is the main framework of the app, Expo is what you expect to find majority of the documentation to help you while building the app. (or you could just base it off the code already in there)
