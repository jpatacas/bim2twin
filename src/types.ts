export interface GisParameters {
  container: HTMLDivElement;
  accessToken: string;
  zoom: number;
  pitch: number;
  center: [number, number];
  bearing: number;
  buildings: Building[];
}

export interface Building {
  uid: string;
  userID: string;
  lat: number;
  lng: number;
  energy: number;
  name: string;
  models: Model[];
  documents: Document[];
}

export interface Model {
  name: string;
  id: string;
}

export interface Document {
  name: string;
  id: string;
}

export interface LngLat {
  lng: number;
  lat: number;
}

export interface Tool {
  name: string;
  active: boolean;
  icon: any;
  action: (...args: any) => void;
}

export interface Floorplan {
  name: string;
  id: string;
}

export interface Property {
  name: string;
  value: string;
}

export interface EnergyData {
  buildingId: string;
  month: string; 
  electricity: number;
  gas: number;
  solar: number;
  wind: number;
}