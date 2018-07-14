# Neighborhood Map

This project was made for the Udacity Front-End Nanodegree Program. Neighborhood Map is a simple web based application which is built using React framework. It displays points of interest and additional information using Foursquare.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run

* Download or clone the repository
* Install all project dependencies with `npm install`
* Start the development server with `npm start`

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

## Dependencies

* React
* Google Maps API
* Foursquare API