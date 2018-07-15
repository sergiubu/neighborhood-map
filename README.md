# Neighborhood Map

This project was made for the Udacity Front-End Nanodegree Program. Neighborhood Map is a simple web based application which is built using React framework. It displays points of interest and additional information using Foursquare.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run

* Download or clone the repository
* Install all project dependencies with `npm install`
* Start the development server with `npm start`

## Available Scripts

In the project directory, you can run:

`npm start`

**Runs the app in the development mode.**
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

`npm run build`

Builds the app for production to the build folder.
**It correctly bundles React in production mode and optimizes the build for the best performance.**

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

`npm run eject`

Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Important

By default, the production build is a fully functional, offline-first [Progressive Web App](https://developers.google.com/web/progressive-web-apps/). **The service worker only works in production mode.**

## How to use

Points of interest are displayed on the map automatically, using markers. You click on these markers to open a info window which displays additional information about the location, to close this info window you can click on the `X`, located on the top right corner of the info window. A side navigation is also opened, there you can filter the displayed locations by typing the name of the location or you can just click on the ones already displayed in the list. This side navigation can be closed by clicking the red toggle on the top left corner.

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    components/
      Data.js
      Map.js
      Sidenav.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html is the page template;`
* `src/index.js is the JavaScript entry point.`

You can delete or rename the other files.

You may create subdirectories inside src. For faster rebuilds, only files inside src are processed by Webpack.
You need to **put any JS and CSS files inside** `src`, otherwise Webpack won’t see them.

## Dependencies

* React
* Google Maps API
* Foursquare API