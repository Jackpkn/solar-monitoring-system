
export interface SolarData {
    panel_id: string;
    timestamp: string;
    metrics: {
      temperature: number;
      voltage: number;
      current: number;
      power_output: number;
    };
  }
