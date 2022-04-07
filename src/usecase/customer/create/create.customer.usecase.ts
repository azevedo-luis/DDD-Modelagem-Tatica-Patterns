import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";
import { v4 as uuid } from 'uuid';
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        const customer = CustomerFactory.createWithAddress(input.name, address);
        await this.customerRepository.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city
            }
        };
    }
}