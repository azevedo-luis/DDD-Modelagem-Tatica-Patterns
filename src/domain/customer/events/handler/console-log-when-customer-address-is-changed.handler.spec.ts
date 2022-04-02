import CustomerChangedAddressEvent from "../customer-changed-address.event";
import EnviaConsoleLogHandler from "./console-log-when-customer-address-is-changed.handler";


describe("EnviaConsoleLogHandler tests", () => {
    it("should register a log on console when handle is called", () => {
        // Arrange
        const customerData = {id: 1, nome: 'Any name', endereco: 'Any Address'}
        const eventAddress = new CustomerChangedAddressEvent(customerData)
        const enviaConsoleLogHandler = new EnviaConsoleLogHandler()

        console.log = jest.fn();

        // Act
        enviaConsoleLogHandler.handle(eventAddress)

        // Assert
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(`Endereço do cliente: ${customerData.id}, ${customerData.nome} alterado para: ${customerData.endereco}`);
    });
})