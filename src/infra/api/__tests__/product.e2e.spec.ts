import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                type: 'a',
                price: 10
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "john"
            });

        expect(response.statusCode).toBe(500);
    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                type: 'a',
                price: 10
            });

        expect(response.statusCode).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                type: 'a',
                price: 20
            });

        expect(response2.statusCode).toBe(200);

        const listResponse = await request(app)
            .get("/product")
            .send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products).toHaveLength(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(10);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(20);
    });
});