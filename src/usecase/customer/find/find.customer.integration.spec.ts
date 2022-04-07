import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";

describe("Integration Test find customer use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });    

    it("Should find customer by id", async () => {
        const customerId = "123"
        const costumer = new Customer(customerId, "John");
        const address = new Address("Rua da Alegria", 123, "12345-678", "São Paulo");
        costumer.address = address;

        const customerRepository = new CustomerRepository();
        await customerRepository.create(costumer);

        const input = {
            id: customerId
        }

        const output = {
            id: costumer.id,
            name: costumer.name,
            address: {
                street: costumer.address.street,
                city: costumer.address.city,
                number: costumer.address.number,
                zip: costumer.address.zip
            }
        }

        const usecase = new FindCustomerUsecase(customerRepository)
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
})