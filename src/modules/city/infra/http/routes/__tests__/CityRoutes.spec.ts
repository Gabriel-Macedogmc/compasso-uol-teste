import { MockCityController } from "./mocks/MockCityController";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import request from "supertest";

const params = MockCityController();

let connection: Connection;
describe("City Routes ", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  //create
  it("should be return 201 on success", async () => {
    const response = await request(app).post("/city").send(params);

    expect(response.statusCode).toBe(201);
  });

  //error already exist
  it("should be return 401 if city already exist", async () => {
    await request(app).post("/city").send(params);
    const response = await request(app).post("/city").send(params);
    expect(response.statusCode).toBe(401);
  });

  //get city by name
  it("should be return 200 on success", async () => {
    const city = await request(app)
      .post("/city")
      .send({ name: "city", state: "state" });

    const { name } = city.body;

    const response = await request(app).get(`/city/name/${name}`);
    expect(response.statusCode).toBe(200);
  });

  //error if not exist city
  it("should be return 404 if city not exist", async () => {
    const response = await request(app).get(`/city/name/test`);
    expect(response.statusCode).toBe(404);
  });

  //get all cities by state
  it("should be return 200 on success", async () => {
    const city = await request(app)
      .post("/city")
      .send({ name: "newCity", state: "Guarulhos-SP" });

    const { state } = city.body;

    const response = await request(app).get(`/city/state/${state}`);
    expect(response.statusCode).toBe(200);
  });
});
