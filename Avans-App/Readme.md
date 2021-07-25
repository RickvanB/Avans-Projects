# Speedmeet App

![Ionic CI](https://github.com/AvansMartijn/Avans-App/workflows/Ionic%20CI/badge.svg)

## Commands

Run development mode:
```shell script
$ ionic serve --ssl
```

Build project (output: www folder):
```shell script
$ ionic build
```

Build Android project:
```shell script
$ ionic cap copy android
```

Build iOS project:
```shell script
$ ionic cap copy ios
```

Open Android project:
```shell script
$ ionic cap open android
```

Open iOS project:
```shell script
$ ionic cap open ios
```

Run tests:
```shell script
$ npm test
```

Run lint:
```shell script
$ npm run lint
```

## Folder structure

```
android             # Folder with android project, do not edit directly

e2e                 # Folder with end to end tests

ios                 # Folder with ios project, do not edit directly

src
└---app             # All the app files. Per component and page a seperate folder
    └---guards      # Route guards
    └---services    # All services used in the app
└---assets          # Images, icons, etc.
└---environments    # File with specific env variables (ex: api_base url)

www                 # Ionic build output directory (not in git)
```

## Other repositories

Web: https://github.com/AvansMartijn/Avans-Web

API: https://github.com/AvansMartijn/Avans-API
