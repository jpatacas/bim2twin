# BIM2TWIN

A project exploring the integration of BIM with other data sources such as GIS, energy data, etc. for the development of urban digital twins.

Main features:
- Create projects by user based on location on world map
- IFC model storage using Firebase (add and delete models)
- IFC model loading using fragments, including local caching 
- IFC model viewer including IFC properties menu, floorplans viewer, clipping planes, measurements and explosion tools
- Basic energy data management by building (using Firebase)

Technologies used:
- Typescript
- React
- IFC.js
- Mapbox
- Firebase

## Setup

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Firebase configuration

- add a `firebase-conf.js` file in `/src` with your `firebaseConfig` data

- setup authentication in Firebase using google and setup storage in Firebase

- Configuring CORS using [Google Cloud console](https://stackoverflow.com/a/58613527)
