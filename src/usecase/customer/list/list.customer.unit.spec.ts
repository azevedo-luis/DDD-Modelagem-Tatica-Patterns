import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("1", new Address("Street 1", 123, "12345-678", "City 1"));

const customer2 = CustomerFactory.createWithAddress("2", new Address("Street 2", 123, "12345-678", "City 2"));

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
};

describe("unit test for listing customer use case", () => {
    it("should list a customer", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);
        const result = await customerListUseCase.execute({});
        expect(result.customers.length).toBe(2);
        expect(result.customers[0].id).toBe(customer1.id);
        expect(result.customers[0].name).toBe(customer1.name);
        expect(result.customers[0].address.street).toBe(customer1.address.street);
        expect(result.customers[0].address.number).toBe(customer1.address.number);
        expect(result.customers[0].address.zip).toBe(customer1.address.zip);
        expect(result.customers[0].address.city).toBe(customer1.address.city);

        expect(result.customers[1].id).toBe(customer2.id);
        expect(result.customers[1].name).toBe(customer2.name);
        expect(result.customers[1].address.street).toBe(customer2.address.street);
        expect(result.customers[1].address.number).toBe(customer2.address.number);
        expect(result.customers[1].address.zip).toBe(customer2.address.zip);
        expect(result.customers[1].address.city).toBe(customer2.address.city);
    });
})