import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product)

        const input = {
            id: "123"
        }
        const output = await usecase.execute(input)
        const expected = {
            id: "123",
            name: "Product 1",
            price: 10
        }
        expect(output).toEqual(expected);
    });

    it("should not find a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product)

        const input = {
            id: "invalid"
        }
        expect(() => usecase.execute(input)).rejects.toThrow("Product not found");
    });
});