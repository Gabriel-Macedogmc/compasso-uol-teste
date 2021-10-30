import { ClientTypeormModel } from "./../../../../client/infra/typeorm/models/ClientTypeormModel";
import { ICityModel } from "@modules/city/domain/models/ICityModel";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cities")
export class CityTypeormModel implements ICityModel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @OneToMany(() => ClientTypeormModel, client => client.city)
  clients: ClientTypeormModel[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
