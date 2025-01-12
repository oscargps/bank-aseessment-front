const CartIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
}: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-cart"
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            strokeWidth="1.5"
            stroke="#2c3e50"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
        </svg>
    );
};


export default CartIcon
