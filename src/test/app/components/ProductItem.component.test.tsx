import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductsMock } from "../../__mocks__/products.mock";
import ProductItem from "../../../app/components/ProductItem/ProductItem.component";

describe("Product Item Component", () => {
  it("should render the products component", async () => {
    const { getByTestId } = render(
      <ProductItem
        product={{
          ...ProductsMock[0],
          createAt: new Date(),
          updateAt: new Date(),
        }}
        onAddToCart={jest.fn()}
      />
    );
    const addButton = getByTestId("add-to-cart-button");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(getByTestId("Product-item")).toBeInTheDocument();
    });
  });
  it("should render the products component - no stock", async () => {
    const { getByTestId } = render(
      <ProductItem
        product={{
          ...ProductsMock[0],
          createAt: new Date(),
          updateAt: new Date(),
          stock: 0,
        }}
        onAddToCart={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByTestId("Product-item")).toBeInTheDocument();
    });
  });
});
