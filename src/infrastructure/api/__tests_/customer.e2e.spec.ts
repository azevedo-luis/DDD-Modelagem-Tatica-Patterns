import {app, sequelize} from '../express';
import request from 'supertest';

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async() => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John",
            address: {
                street: "Street",
                number: 123,
                zip: "12345-678",
                city: "City"
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345-678");
        expect(response.body.address.city).toBe("City");
    });

    it("should not create a customer", async () => {
        const response = await request(app).post("/customer").send({name: "John"});
        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        // Arrange
        const result = await request(app).post("/customer").send({
            name: "John",
            address: {
                street: "Street",
                number: 1,
                zip: "1",
                city: "City"
            }
        });
        expect(result.status).toBe(200);

        const result2 = await request(app).post("/customer").send({
            name: "Jane",
            address: {
                street: "Street 2",
                number: 2,
                zip: "2",
                city: "City 2"
            }
        });
        expect(result.status).toBe(200);

        // Act
        const response = await request(app).get("/customer").send();

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);
        const customer = response.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");
        expect(customer.address.number).toBe(1);
        expect(customer.address.zip).toBe("1");
        expect(customer.address.city).toBe("City");

        const customer2 = response.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
        expect(customer2.address.number).toBe(2);
        expect(customer2.address.zip).toBe("2");
        expect(customer2.address.city).toBe("City 2");
    });
})