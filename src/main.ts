import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Vini Bôscoa");
const address = new Address("Rua aqui", 1, "12345-678", "São Paulo");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 1);

const order = new Order("1", "123", [item1, item2]);