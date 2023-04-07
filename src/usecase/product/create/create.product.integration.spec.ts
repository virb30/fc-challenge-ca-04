import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {

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

    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            type: "a",
            name: "Product 1",
            price: 10
        };
        await usecase.execute(input);

        const productModel = await ProductModel.findOne();
        expect(productModel.name).toBe(input.name);
        expect(productModel.price).toBe(input.price);
        expect(productModel.id).toBeDefined();
    });
});