export class Order {
    orderId: string;
    userId: string;
    productName: string;
    quantity: number;
    totalPrice: string;
    status: string;
    price: string;
}

export class cart {
    cartId: number;
    orderId: number;
    email: string;
    quantity: number;
    price: number;
    productId: number;
    productname: string;
}