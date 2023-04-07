import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer("", "John");
        }).toThrowError("customer: Id is required")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Customer("123", "");
        }).toThrowError("customer: Name is required")
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            new Customer("", "");
        }).toThrowError("customer: Id is required, customer: Name is required")
    });

    it("should change name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 123, "12345-678", "City");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBeTruthy();
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 123, "12345-678", "City");
        customer.changeAddress(address);

        customer.deactivate();

        expect(customer.isActive()).toBeFalsy();
    });

    it("should throw error when address is undefined on activate customer", () => {
        expect(() => {
            const customer = new Customer("123", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer")
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1")
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })
});