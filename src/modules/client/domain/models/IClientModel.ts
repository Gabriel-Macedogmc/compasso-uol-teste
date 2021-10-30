export enum SexEnum {
  MASCULINE = "Masculino",
  FEMALE = "Feminino",
  OTHER = "Outro",
  UNINFORMED = "Não Informado",
}

export interface IClientModel {
  id: string;
  full_name: string;
  sex: SexEnum;
  birth_date: string;
  age: string;
  city_id: string;
}

export interface IUpdateClientModel {
  id: string;
  full_name?: string;
}
