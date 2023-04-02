export interface LocationProps {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
}

export interface LocationListProps {
  info: {
    pages: number;
    count: number;
  };
  results: Array<LocationProps>;
}
