export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    createAt: Date;
    updateAt: Date;
  }

  export interface IProductCart extends IProduct {
    quantity: number;
  }
