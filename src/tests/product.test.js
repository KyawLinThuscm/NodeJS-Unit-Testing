import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server.js";
import mongoose from "mongoose";
import { createProduct } from "../services/product.service.js";

const app = createServer();

export const productPayload = {
  title: "Title",
  description: "Description"
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      test("should return a 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      test("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);

        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe("create product route", () => {
    describe("given the user is logged in", () => {
      test("should return a 200 and create the product", async () => {

        const { statusCode, body } = await supertest(app)
          .post("/api/products")
          .send(productPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description: "Description",
          productId: expect.any(String),
          title: "Title",
          updatedAt: expect.any(String),
        });
      });
    });
  });
});
