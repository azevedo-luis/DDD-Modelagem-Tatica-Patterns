import {app, sequelize} from '../express';
import request from 'supertest';

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async() => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const response = await request(app).post("/product").send({
            type: "a",
            name: "Product 1",
            price: 10
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({name: "Product 1"});
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        // Arrange
        const result = await request(app).post("/product").send({
            type: "a",
            name: "Product 1",
            price: 10
        });
        expect(result.status).toBe(200);

        const result2 = await request(app).post("/product").send({
            type: "a",
            name: "Product 2",
            price: 20
        });
        expect(result2.status).toBe(200);

        // Act
        const response = await request(app).get("/product").send();

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);

        const product = response.body.products[0];
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(10);


        const product2 = response.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(20);

        const listResponseXml = await request(app).get("/product").set("Accept", "application/xml").send();

        expect(listResponseXml.status).toBe(200);
        expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXml.text).toContain(`<products>`);
        expect(listResponseXml.text).toContain(`<product>`);
        expect(listResponseXml.text).toContain(`<name>Product 1</name>`);
        expect(listResponseXml.text).toContain(`<price>10</price>`);
        expect(listResponseXml.text).toContain(`<name>Product 2</name>`);
        expect(listResponseXml.text).toContain(`<price>20</price>`);
        expect(listResponseXml.text).toContain(`</product>`);
        expect(listResponseXml.text).toContain(`</products>`);
    });
})