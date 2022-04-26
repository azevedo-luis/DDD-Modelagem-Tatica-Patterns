import CreateProductUsecase from "./create.product.usecase";


const input ={
    type: "a",
    name: "Product 1",
    price: 10,
}

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("Should create a product", async () => {
        const productRepository = mockRepository();
        productRepository.create.mockImplementation(() => {
            return Promise.resolve({
                id: "123",
                name: "Product 1",
                price: 10
            });
        });
        
        const output = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        const usecase = new CreateProductUsecase(productRepository);
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should throw and error when name is missing", async () => {
        const productRepository = mockRepository();
        productRepository.create.mockImplementation(() => {
            return Promise.resolve({
                id: "123",
                name: "Product 1",
                price: 10,
            });
        });

        const test_input = input;
        test_input.name = "";
        
        const usecase = new CreateProductUsecase(productRepository);
        await expect(usecase.execute(test_input)).rejects.toThrow("Name is required");
    })

    it("Should throw and error when price is missing", async () => {
        const productRepository = mockRepository();
        productRepository.create.mockImplementation(() => {
            return Promise.resolve({
                id: "123",
                name: "Product 1",
                price: 10,
            });
        });

        const test_input = input;
        test_input.price = 0;
        
        const usecase = new CreateProductUsecase(productRepository);
        await expect(usecase.execute(test_input)).rejects.toThrow("Price must be grater then zero");
    })
})