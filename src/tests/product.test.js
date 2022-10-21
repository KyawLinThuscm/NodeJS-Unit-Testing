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

export const updateProductPayload = {
  title: "Title Edit",
  description: "Description"
}

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("Get products route", () => {
    describe("given the product does not exist", () => {
      test("should return a 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      test("should return a 200 status and get all products", async () => {
        var { statusCode } = await supertest(app)
          .post("/api/products")
          .send(productPayload);
        expect(statusCode).toBe(200);

        var { body, statusCode } = await supertest(app)
          .get("/api/products");

        expect(statusCode).toBe(200);
        expect(body).toEqual([{
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description: "Description",
          productId: expect.any(String),
          title: "Title",
          updatedAt: expect.any(String),
        }]);
      });

      test("should return a 200 status and get one product", async () => {
        const product = await createProduct(productPayload);
        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe("Create products route", () => {
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

  describe("Update products route", () => {
    test("Update", async() => {
      const product = await createProduct(productPayload);
      var { statusCode, body } = await supertest(app)
        .put(`/api/products/${product.productId}`)
        .send(updateProductPayload);
      
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        description: "Description",
        productId: expect.any(String),
        title: "Title Edit",
        updatedAt: expect.any(String),
      });
    })
  });

  describe("Delete products route", () => {
    test("should return a 200 status and delete one product", async () => {
      const product = await createProduct(productPayload);
      const { statusCode } = await supertest(app).delete(
        `/api/products/${product.productId}`
      );
      expect(statusCode).toBe(200);
    });
  });
});
