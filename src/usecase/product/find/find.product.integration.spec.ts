import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import FindProductUsecase from "./find.product.usecase";

describe("Integration Test find product use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });    

    it("Should find product by id", async () => {
        const productId = "123"
        const product = new Product(productId, "Product 1", 100);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = {
            id: productId
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const usecase = new FindProductUsecase(productRepository)
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
})