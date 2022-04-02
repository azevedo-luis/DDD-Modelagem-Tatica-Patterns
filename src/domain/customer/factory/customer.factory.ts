import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import { v4 as uuid } from "uuid";
import Address from "../entity/value-object/address";

export default class CustomerFactory{
    static create(name: string): CustomerInterface{
        return new Customer(uuid(), name);
    }

    public static createWithAddress(name: string, address: Address): CustomerInterface{
        const customer = new Customer(uuid(), name);
        customer.address = address;
        return customer;
    }
}