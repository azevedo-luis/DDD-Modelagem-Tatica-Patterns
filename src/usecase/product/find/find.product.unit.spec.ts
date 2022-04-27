import Product from "../../../domain/product/entity/product";
import FindProductUsecase from "./find.product.usecase";



const productId = "123"
const product = new Product(productId, "Product 1", 100);


const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)), //fn vem de function, ou seja, está dizendo que precisa dessa função.
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test find product use case", () => { 
    it("Should find product by id", async () => {
        const input = {
            id: productId
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }
        
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository)
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should not find a product", async () => {
      const productRepository = MockRepository();
      productRepository.find.mockImplementation(() => {
        throw new Error("Product not found");
      });

      const input = {
        id: "99999abc"
      }      
      
      const usecase = new FindProductUsecase(productRepository)
      expect(()=>{productRepository
        return usecase.execute(input);
      }).rejects.toThrow("Product not found");    
    });
})