import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLog2Handler from "./console-log2-when-customer-is-created.handler";

describe("EnviaConsoleLog2Handler tests", () => {
    it("should register a log on console when handle is called", () => {
        // Arrange
        const eventData = {name:'test'}
        const enviaConsoleLog1Handler = new EnviaConsoleLog2Handler()
        const customerCreatedEvent = new CustomerCreatedEvent(eventData)

        console.log = jest.fn();

        // Act
        enviaConsoleLog1Handler.handle(customerCreatedEvent)

        // Assert
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(`Esse é o segundo console.log do evento: ${eventData.name}`);
    });
})