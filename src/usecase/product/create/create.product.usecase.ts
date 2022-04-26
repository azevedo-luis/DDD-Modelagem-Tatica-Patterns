import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUsecase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        const product = ProductFactory.create(input.type, input.name, input.price);
        const productEntity = new Product(product.id, product.name, product.price);
        await this.productRepository.create(productEntity);
        return {
            id: productEntity.id,
            name: productEntity.name,
            price: productEntity.price
        };
    }
}