import Address from "../entity/value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer type a", () => {
        const customer = CustomerFactory.create("Customer A");
        expect(customer.id).toBeDefined;
        expect(customer.name).toBe("Customer A");
        expect(customer.address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    });

    it("should create a customer with address", () => {
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");       
        const customer = CustomerFactory.createWithAddress("Customer A", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.address).toBe(address);
    });    
})