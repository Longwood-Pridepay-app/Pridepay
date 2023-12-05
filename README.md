# Welcome to Pridepay! 
Created for Longwood Central School District and by Longwood Students!

Created by Hussain Iqbal and Jadon (idk ur last Name)

This app is essentially a digitization of the currency system BR3 in Longwood Central School district. It allows for teacher and students to send and receive BR3 bucks with ease. It even allows for purchases through the school store!


## Current application Layout

The app currently is built off of the template by [Ignite](https://github.com/infinitered/ignite) and [Native Base](https://nativebase.io/)

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- And more!

## Quick Start

The project's structure will look similar to this:

```
ignite-project
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   ├── app.tsx
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   ├── setup.ts
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
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

Included in the boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.(otherwise labelled as `src`)

The inside of the `app` directory looks similar to the following:

```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
├── app.tsx
```

**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Maestro end-to-end tests

Follow [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe from the [Ignite Cookbook](https://ignitecookbook.com/)!

## Development

Make sure when you start up a new development environment or pull, to run  `npm i`
To run the application for testing, run `npm run` and a list will pop up. Choose from there to run the app for the OS that you desire'

The app is currently using [Firebase](https://console.firebase.google.com/u/0/) for database and [Google OAuth](https://console.cloud.google.com/getting-started?project=pridepay-384911&supportedpurview=project) for authentication/sign in.
