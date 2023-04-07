import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("Customer 1");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street", 1, "12345-678", "City");
        let customer = CustomerFactory.createWithAddress("Customer 1", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBe(address);
    });
});