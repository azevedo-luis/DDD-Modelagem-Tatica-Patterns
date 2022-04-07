import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Rua da Alegria", 123, "12345-678", "São Paulo"));

const input = {
    id: customer.id,
    name: "Name updated",
    address: {
        street: "Street updated",
        number: 1234,
        zip: "Zip updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    it("Should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        const result = await customerUpdateUseCase.execute(input);
        expect(result).toEqual(input);
    });
})

