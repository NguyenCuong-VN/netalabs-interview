export interface IThalaData {
  data: ThalaDataItem[];
}

interface ThalaDataItem {
  poolType: string;
  tvl: number;
  volume1d: number;
  apr: Apr[];
}

interface Apr {
  source: string;
  apr: number;
}
