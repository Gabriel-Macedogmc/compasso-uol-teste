import { MockCityController } from "./../../../../../city/infra/http/routes/__tests__/mocks/MockCityController";
import { Connection } from "typeorm";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import request from "supertest";
import { MockClientController } from "./mocks/MockClientController";

let connection: Connection;

describe("Client Routes", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  //create client
  it("should be return 201 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app).post("/city").send(cityParams);

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    const response = await request(app).post("/client").send(clientParams);

    expect(response.statusCode).toBe(201);
  });

  //get single by id
  it("should be return 200 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    const client = await request(app).post("/client").send(clientParams);

    const response = await request(app).get(`/client/${client.body.id}`);
    expect(response.statusCode).toBe(200);
  });

  //error get single by id
  it("should be return 404 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity1" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    await request(app).post("/client").send(clientParams);

    const response = await request(app).get(`/client/${id}`);
    expect(response.statusCode).toBe(404);
  });

  // get all by name
  it("should be return 200 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity2" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    const client = await request(app).post("/client").send(clientParams);

    const response = await request(app).get(`/client/name/${client.body.name}`);
    expect(response.statusCode).toBe(200);
  });

  // updated client
  it("should be return 200 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity3" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    const client = await request(app).post("/client").send(clientParams);

    const response = await request(app)
      .put(`/client/${client.body.id}`)
      .send({ full_name: "newName" });

    expect(response.body.full_name).toBe("newName");
    expect(response.statusCode).toBe(200);
  });

  //error update client
  it("should be return 404 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity6" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    await request(app).post("/client").send(clientParams);

    const response = await request(app)
      .put(`/client/${id}`)
      .send({ full_name: "teste" });
    expect(response.statusCode).toBe(404);
  });

  //remove client by id
  it("should be return 204 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity0" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    const client = await request(app).post("/client").send(clientParams);

    const response = await request(app).delete(`/client/${client.body.id}`);
    expect(response.statusCode).toBe(204);
  });

  //error get single by id
  it("should be return 404 on success", async () => {
    const cityParams = MockCityController();
    const city = await request(app)
      .post("/city")
      .send({ ...cityParams, name: "newCity11" });

    const { id } = city.body;

    const clientParams = MockClientController();
    Object.assign(clientParams, { city_id: id });

    await request(app).post("/client").send(clientParams);

    const response = await request(app).delete(`/client/${id}`);
    expect(response.statusCode).toBe(404);
  });
});
