import Order from "../entity/order";

export default class OrderService{
    static getTotal(orders: Order[]): number{
        return orders.reduce((acc, item) => acc + item.total(), 0);
    }
}