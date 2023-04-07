import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("Find product unit test", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const input = {
            id: "123"
        };
        const output = await findProductUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const findProductUseCase = new FindProductUseCase(productRepository);
        const input = {
            id: "invalid"
        };
        expect(() => {
            return findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});