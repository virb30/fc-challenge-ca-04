import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer events tests", () => {

    it("should dispatch customer created event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
        const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle");
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
        const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        const customerCreatedEvent = new CustomerCreatedEvent({});
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
        expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
    });

    it("should dispatch customer changeAddress event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
        const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", enviaConsoleLogHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "123",
            name: "Customer 1",
            address: "Street 1, 123, City 1, Zipcode 1"
        });
        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();
        expect(spyEnviaConsoleLogHandler).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
})