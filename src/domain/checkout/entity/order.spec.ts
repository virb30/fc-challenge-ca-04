import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Order("", "123", []);
        }).toThrowError("Id is required")
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrowError("CustomerId is required")
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrowError("Items are required")
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
        const order = new Order("o1", "c1", [item1]);
        expect(order.total()).toBe(20);

        const order2 = new Order("o2", "c1", [item1, item2]);
        expect(order2.total()).toBe(60);
    });

    it("should throw error if the item quantity is less than or equal to 0", () => {
        expect(() => {
            const item = new OrderItem("1", "Item 1", 10, "p1", 0);
            new Order("o1", "c1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });
});