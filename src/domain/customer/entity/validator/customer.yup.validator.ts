import ValidatorInterface from "../../../@shared/validator/validator.interface";
import Customer from "../customer";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer>{
    validate(entity: Customer): boolean {
        try{
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
            }).validateSync(
                {
                    id: entity.id,
                    name: entity.name,
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
                    context: "customer",
                    message: error,
                });
            });
        }
    }
}