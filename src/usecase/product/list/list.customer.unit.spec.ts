import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "product1", 100);

const product2 = ProductFactory.create("b", "product1", 100);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
};

describe("unit test for listing products use case", () => {
    it("should list a product", async () => {
        const productRepository = MockRepository();
        const productListUseCase = new ListProductUseCase(productRepository);
        const result = await productListUseCase.execute({});

        expect(result.products.length).toBe(2);
        
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);

        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    });
})