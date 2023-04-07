import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";


let product: ProductInterface;
let input: InputUpdateProductDto;
let MockRepository: Function;

describe("Update product unit test", () => {

    beforeEach(() => {
        product = ProductFactory.create("a", "Product", 10);
        input = {
            id: product.id,
            name: "Product Updated",
            price: 20
        };
        MockRepository = () => {
            return {
                create: jest.fn(),
                findAll: jest.fn(),
                find: jest.fn().mockReturnValue(Promise.resolve(product)),
                update: jest.fn(),
            }
        };
    })

    it("should update product", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        const output = await updateProductUseCase.execute(input);
        expect(output).toEqual(input);
    });

    it("should not update product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        expect(() => updateProductUseCase.execute(input)).rejects.toThrow("Product not found");
    });


    it("should not update a product with invalid name", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "123",
            name: "",
            price: 20
        }
        expect(() => usecase.execute(input)).rejects.toThrow("product: Name is required");
    });

    it("should not update a product with invalid price", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "123",
            name: "Product updated",
            price: -20
        }
        expect(() => usecase.execute(input)).rejects.toThrow("product: Price must be greater than 0");
    });
});