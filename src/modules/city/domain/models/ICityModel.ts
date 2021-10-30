export interface ICityModel {
  id: string;
  name: string;
  state: string;
}

export interface IUpdateCityModel {
  id: string;
  name?: string;
  state?: string;
}
