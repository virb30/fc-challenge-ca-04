import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street", 123, "Zip", "City")
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Street 2", 124, "Zip 2", "City 2")
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
};

describe("Unit test for listing customer use case", () => {
    it("should list customers", async () => {
        const customerRepository = MockRepository();
        const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
        const output = await listCustomerUseCase.execute({});
        expect(output.customers).toHaveLength(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});