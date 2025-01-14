import { useFetchProducts } from '../hooks/useProducts';
import { IProduct } from '../../modules/bank-store/domain/models/IProduct';
import ProductItem from '../components/ProductItem/ProductItem.component';
import CartIcon from '../assets/Icons/Cart';
import { Badge, Button, useDisclosure } from '@nextui-org/react';
import { useAppContext } from '../hooks/useAppContext';
import CartSummaryModal from '../components/Cart/CartSummaryModal.component';
import { useEffect } from 'react';

const Products = () => {
    const { data: products } = useFetchProducts();
    const { cart, addToCart } = useAppContext();
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();

    const handleAddToCart = (product: IProduct) => {
        addToCart(product);
    };
    useEffect(() => {
        if (cart.length === 0) {
            onClose();
        }
    }, [cart]);

    return (
        <>
            <div className="container mx-auto px-4 py-8" data-testid="products-page">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <Badge color="primary" content={cart.reduce((acc, item) => acc + item.quantity, 0)}>
                            <Button isIconOnly variant="light" onPress={() => { if (cart.length > 0) onOpen(); }}>
                                <CartIcon />
                            </Button>
                        </Badge>
                </div>
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
            <CartSummaryModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}

export default Products;
