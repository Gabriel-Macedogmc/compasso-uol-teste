export interface IClientModel {
  id: string;
  full_name: string;
  sex: string;
  birth_date: string;
  age: string;
  city_id: string;
}

export interface IUpdateClientModel {
  id: string;
  full_name?: string;
}
