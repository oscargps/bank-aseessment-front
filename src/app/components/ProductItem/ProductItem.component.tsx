import React from 'react';
import { IProduct } from '../../../modules/bank-store/domain/models/IProduct';
import numeral from 'numeral';
interface ProductProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void;
}

const ProductItem: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  return (
    <div data-testid="Product-item" className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-900">
            {numeral(product.price).format('$0,0')}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        <button
          data-testid="add-to-cart-button"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${product.stock === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductItem