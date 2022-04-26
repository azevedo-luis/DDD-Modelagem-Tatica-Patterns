import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../entity/validator/product.yup.validator";

export default class ProductValidatorFactory{
    public static create(): ValidatorInterface<Product>{
        return new ProductYupValidator();
    }
}