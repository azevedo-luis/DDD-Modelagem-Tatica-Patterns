import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          total: item.total(),
        })),
      },
      {
        include: [{ model: OrderItemModel }], //with it will include the order items to be persisted with the same transaction
      }
    );
  }

  async update(entity: Order): Promise<void> {
    let orderModel: OrderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: entity.id,
        },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    orderModel.items.forEach(old_item => {
      const item = entity.items.find(updated_item => updated_item.id == old_item.id);
      if (item == null) {
        old_item.destroy();
      } else {
        old_item.update(
          {
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            total: item.total(),
          },
        )
      }
    });

    entity.items.forEach(new_item => {
      const item = orderModel.items.find(original_item => original_item.id == new_item.id);
      if (item == null) {
        OrderItemModel.create(
          {
            order_id: entity.id,
            id: new_item.id,
            name: new_item.name,
            price: new_item.price,
            product_id: new_item.productId,
            quantity: new_item.quantity,
            total: new_item.total(),
          }
        )
      }
    });

    await orderModel.update(
    {
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
    });
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
        orderModel = await OrderModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
        include: ["items"],
      });
    } catch (error) {
      throw new Error("Order not found");
    }  

    const order = new Order(id, orderModel.customer_id,
      orderModel.items.map<OrderItem>(item =>(
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
      )))
    );

    return order;
  }

  async findAll(): Promise<Order[]> {

    let orders;

    try {
      orders = await OrderModel.findAll(
        {
          include: [{ model: OrderItemModel }],
        });
    } catch (error) {
      throw new Error("Orders not found");
    }

    const result = orders.map<Order>(order => (
      new Order(
        order.id, 
        order.customer_id,
        order.items.map<OrderItem>(item => (
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity)
        ))
      )
    ));

    return result;
  }
}