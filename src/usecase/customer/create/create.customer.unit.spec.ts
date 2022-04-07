import CreateCustomerUsecase from "./create.customer.usecase";

const input ={
    name: "John",
    address: {
        street: "Rua da Alegria",
        number: 123,
        zip: "12345-678",
        city: "São Paulo"
    }
}

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {
    it("Should create a customer", async () => {
        const customerRepository = mockRepository();
        customerRepository.create.mockImplementation(() => {
            return Promise.resolve({
                id: "123",
                name: "John",
                address: {
                    street: "Rua da Alegria",
                    number: 123,
                    zip: "12345-678",
                    city: "São Paulo"
                }
            });
        });
        
        const output = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        }

        const usecase = new CreateCustomerUsecase(customerRepository);
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should throw and error when name is missing", async () => {
        const customerRepository = mockRepository();
        customerRepository.create.mockImplementation(() => {
            return Promise.resolve({
                id: "123",
                name: "John",
                address: {
                    street: "Rua da Alegria",
                    number: 123,
                    zip: "12345-678",
                    city: "São Paulo"
                }
            });
        });

        const test_input = input;
        test_input.name = "";
        
        const usecase = new CreateCustomerUsecase(customerRepository);
        await expect(usecase.execute(test_input)).rejects.toThrow("Name is required");
    })

    it("Should throw and error when street is missing", async () => {
        const customerRepository = mockRepository();
        customerRepository.create.mockImplementation(() => {
            return Promise.resolve({
                id: "123",
                name: "John",
                address: {
                    street: "Rua da Alegria",
                    number: 123,
                    zip: "12345-678",
                    city: "São Paulo"
                }
            });
        });

        const test_input = input;
        test_input.address.street = "";
        
        const usecase = new CreateCustomerUsecase(customerRepository);
        await expect(usecase.execute(test_input)).rejects.toThrow("Street is required");
    })
})