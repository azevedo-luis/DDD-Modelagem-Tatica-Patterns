import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLog1Handler from "./console-log1-when-customer-is-created.handler";

describe("EnviaConsoleLog1Handler tests", () => {
    it("should register a log on console when handle is called", () => {
        // Arrange
        const eventData = {name:'test'}
        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler()
        const customerCreatedEvent = new CustomerCreatedEvent(eventData)

        console.log = jest.fn();

        // Act
        enviaConsoleLog1Handler.handle(customerCreatedEvent)

        // Assert
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(`Esse é o primeiro console.log do evento: ${eventData.name}`);
    });
})