// Location data could include latitude, longitude, and possibly other metadata
export type Location = {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  }