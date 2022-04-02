import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequilize.addModels([ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    })    

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const productFound = await ProductModel.findOne({where: {id: product.id}});
        expect(productFound.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        product.changeName("Product 2");
        await productRepository.update(product);
        const productFound = await ProductModel.findOne({where: {id: product.id}});
        expect(productFound.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 100
        });
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id: product.id}});
        const productFound = await productRepository.find(productModel.id);
        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        });
    })

    it("should find all products", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2);
        const productsFound = await productRepository.findAll();
        const products = [product, product2];
        expect(products).toEqual(productsFound);
    });
})