import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";


const customerId = "123"
const customer = new Customer(customerId, "John");
const address = new Address("Rua da Alegria", 123, "12345-678", "São Paulo");
customer.address = address;

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)), //fn vem de function, ou seja, está dizendo que precisa dessa função.
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test find customer use case", () => { 
    it("Should find customer by id", async () => {
        const input = {
            id: customerId
        }

        const output = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }
        
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUsecase(customerRepository)
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should not find a customer", async () => {
      const customerRepository = MockRepository();
      customerRepository.find.mockImplementation(() => {
        throw new Error("Customer not found");
      });

      const input = {
        id: "99999abc"
      }      
      
      const usecase = new FindCustomerUsecase(customerRepository)
      expect(()=>{
        return usecase.execute(input);
      }).rejects.toThrow("Customer not found");    
    });
})