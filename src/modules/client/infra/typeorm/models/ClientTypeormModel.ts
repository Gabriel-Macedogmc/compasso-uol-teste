import { CityTypeormModel } from "@modules/city/infra/typeorm/models/CityTypeormModel";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { IClientModel, SexEnum } from "./../../../domain/models/IClientModel";
import { v4 as uuid } from "uuid";

@Entity("client")
export class ClientTypeormModel implements IClientModel {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column({ type: "enum", enum: SexEnum, default: SexEnum.UNINFORMED })
  sex: SexEnum;

  @Column()
  birth_date: string;

  @Column()
  age: string;

  @Column()
  city_id: string;

  @OneToOne(() => CityTypeormModel, city => city)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city: CityTypeormModel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
