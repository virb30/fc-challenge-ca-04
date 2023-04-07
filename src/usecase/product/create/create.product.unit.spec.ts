import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
    }
}

describe("Create product unit test", () => {
    it("should create product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: "a",
            name: "Product a",
            price: 10
        };
        const output = await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
});