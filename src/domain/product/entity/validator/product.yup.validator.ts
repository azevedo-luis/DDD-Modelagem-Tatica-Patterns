import ValidatorInterface from "../../../@shared/validator/validator.interface";
import Product from "../product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product>{
    validate(entity: Product): boolean {
        try{
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().positive("Price must be grater then zero"),
            }).validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                },
                {
                    abortEarly: false, //will validate all errors and return all at the same time.
                }
            );
            return true;
        }catch(errors){
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                entity.notification.addError({
                    context: "product",
                    message: error,
                });
            });
        }
    }
}