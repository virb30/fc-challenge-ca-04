import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive(),
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city
        });
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive(),
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city
        },
            {
                where: {
                    id: entity.id
                }
            });
    }
    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: { id },
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(
            customerModel.id,
            customerModel.name
        );
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );
        customer.changeAddress(address);
        customer.addRewardPoints(customerModel.rewardPoints);
        if (customerModel.active) {
            customer.activate();
        }
        return customer;
    }
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        const customers = customerModels.map((customerModel) => {
            let customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            );
            customer.changeAddress(address);
            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;
    }
}