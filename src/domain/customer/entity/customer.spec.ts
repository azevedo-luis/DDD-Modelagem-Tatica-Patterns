jest.mock('../../@shared/event/event-dispatcher');
jest.mock('../events/handler/console-log-when-customer-address-is-changed.handler');
jest.mock('../events/customer-changed-address.event');


import Address from "./value-object/address";
import Customer from "./customer";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLogHandler from "../events/handler/console-log-when-customer-address-is-changed.handler";
import CustomerChangedAddressEvent from "../events/customer-changed-address.event";

describe("Customer unit tests", () => {

  beforeEach(() => {
    // Limpa todas as instâncias e chamadas de construtor e todos os métodos:
    (EventDispatcher as jest.Mock).mockClear();
    (EnviaConsoleLogHandler as jest.Mock).mockClear();
  });

    it("should throw error when id is empty", () => {
      expect(() => {
        let customer = new Customer("", "John");
      }).toThrowError("customer: Id is required");
    });
  
    it("should throw error when name is empty", () => {
      expect(() => {
        let customer = new Customer("123", "");
      }).toThrowError("customer: Name is required");
    });

    it("should throw error when name and id are empty", () => {
      expect(() => {
        let customer = new Customer("", "");
      }).toThrowError("customer: Id is required,customer: Name is required");
    });
  
    it("should change name", () => {
      // Arrange
      const customer = new Customer("123", "John");
  
      // Act
      customer.changeName("Jane");
  
      // Assert
      expect(customer.name).toBe("Jane");
    });
  
    it("should activate customer", () => {
      const customer = new Customer("1", "Customer 1");
      const address = new Address("Street 1", 123, "13330-250", "São Paulo");
      customer.address = address;
  
      customer.activate();
  
      expect(customer.isActive()).toBe(true);
    });
  
    it("should throw error when address is undefined when you activate a customer", () => {
      expect(() => {
        const customer = new Customer("1", "Customer 1");
        customer.activate();
      }).toThrowError("Address is mandatory to activate a customer");
    });
  
    it("should deactivate customer", () => {
      const customer = new Customer("1", "Customer 1");
  
      customer.deactivate();
  
      expect(customer.isActive()).toBe(false);
    });
  
    it("should add reward points", () => {
      const customer = new Customer("1", "Customer 1");
      expect(customer.rewardPoints).toBe(0);
  
      customer.addRewardPoints(10);
      expect(customer.rewardPoints).toBe(10);
  
      customer.addRewardPoints(10);
      expect(customer.rewardPoints).toBe(20);
    });

    it("should emit CustomerChangeAddressEvent when address is changed", () => {
      const customer = new Customer("1", "Customer 1")
      const address1 = new Address("street", 1, "85580-000", "Any city")
      customer.address = address1  
      const address2 = new Address("street2", 1, "85580-000", "Any city 2")
      customer.changeAddress(address2)

      expect(EventDispatcher).toHaveBeenCalledTimes(1);
      expect(EnviaConsoleLogHandler).toHaveBeenCalledTimes(1);
      expect(CustomerChangedAddressEvent).toHaveBeenCalledTimes(1);
      expect(CustomerChangedAddressEvent).toHaveBeenCalledWith({id: customer.id,
                                                                nome: customer.name,
                                                                endereco: customer.address.toString()});

      const mockEventDispatcherInstance = (EventDispatcher as jest.Mock).mock.instances[0];
      const mockEnviaConsoleLogHandler = (EnviaConsoleLogHandler as jest.Mock).mock.instances[0];
      const mockCustomerChangedAddressEvent = (CustomerChangedAddressEvent as jest.Mock).mock.instances[0];

      const mockRegister = mockEventDispatcherInstance.register;
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith("CustomerChangedAddressEvent", mockEnviaConsoleLogHandler)

      const mockNotify = mockEventDispatcherInstance.notify;
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(mockCustomerChangedAddressEvent)
    });    

  });