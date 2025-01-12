import React from 'react';
import TrashIcon from '../../assets/Icons/Trash';
import { Button } from '@nextui-org/react';
import { IProductCart } from '../../../modules/bank-store/domain/models/IProduct';
import numeral from 'numeral';

interface CartItemSummaryProps {
    item: IProductCart;
    onRemove: (product: IProductCart) => void;
}

const CartItemSummary: React.FC<CartItemSummaryProps> = ({ item, onRemove }) => {
    const totalPrice = item.price * item.quantity;

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-gray-600">
                    <span>Qty: {item.quantity}</span>
                </div>

                <div className="text-gray-600 w-24 text-right">
                    <span>${numeral(item.price).format('0,0')} each</span>
                </div>

                <div className="font-medium text-gray-900 w-24 text-right">
                    <span>${numeral(totalPrice).format('0,0')}</span>
                </div>

                <Button
                    isIconOnly
                    color="danger"
                    className="ml-4 p-2 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Remove item"
                    onPress={() => onRemove(item)}
                >
                    <TrashIcon />
                </Button>
            </div>
        </div>
    );
};

export default CartItemSummary; 