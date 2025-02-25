// Device information could include details like model, operating system, and browser
export type DeviceInfo = {
    model: string;
    os: string;
    browser: string;
    [key: string]: string; 
  };