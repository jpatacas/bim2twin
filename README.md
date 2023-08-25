# BIM2TWIN

A Common Data Environment providing the integration of BIM with other data sources such as GIS, documents, energy data, etc. for the development of urban digital twins.

Main features:
- Create projects by user based on location on world map
- IFC model storage using Firebase (add and delete models for each building)
- IFC model loading using fragments, including local caching 
- IFC model viewer including IFC properties menu, floorplans viewer, clipping planes, measurements and explosion tools
- Document management by building using Firebase storage (add, view and delete documents for each building)
- Basic energy data management by building (using Firebase)

Technologies used:
- Typescript
- React
- IFC.js - openbim-components
- Mapbox
- Firebase
- Material UI
- Plotly.js

## Setup

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Firebase configuration

- add a `firebase-conf.js` file in `/src` with your `firebaseConfig` data

- setup authentication in Firebase using google and setup storage in your Firebase project

- Configuring CORS using [Google Cloud console](https://stackoverflow.com/a/58613527)
