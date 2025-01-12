import { useFetchProducts } from '../hooks/useProducts';
import { IProduct } from '../../modules/bank-store/domain/models/IProduct';
import ProductItem from '../components/ProductItem/ProductItem.component';

const Products = () => {
    const { data: products } = useFetchProducts();

    const handleAddToCart = (product: IProduct) => {
        console.log('Adding to cart:', product);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                />
                 ))}
            </div>
        </div>
    );
}

export default Products;
