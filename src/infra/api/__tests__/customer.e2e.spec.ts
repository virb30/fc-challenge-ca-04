import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 123,
                    zip: "Zip",
                    city: "City"
                }
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("Zip");
        expect(response.body.address.city).toBe("City");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "john"
            });

        expect(response.statusCode).toBe(500);
    });

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 123,
                    zip: "Zip",
                    city: "City"
                }
            });

        expect(response.statusCode).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    number: 1234,
                    zip: "Zip 2",
                    city: "City 2"
                }
            });

        expect(response2.statusCode).toBe(200);

        const listResponse = await request(app)
            .get("/customer")
            .send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers).toHaveLength(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
    });
});