import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/value-object/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import CustomerModel from "../../../customer/repository/sequilize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequilize/product.model";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import ProductRepository from "../../../product/repository/sequilize/product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: product.id,
          total: ordemItem.total(),
        },
      ],
    });
  });

  it("should update an order adding new item", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const order = new Order("1", customer.id, [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: ordemItem.productId,
          total: ordemItem.total(),
        }
      ],
    });

    const product2 = new Product("2", "Product 2", 10);
    await productRepository.create(product2);
    const ordemItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      5
    );

    order.addItem(ordemItem2)
    await orderRepository.update(order);

    const orderModelUpdated = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel }],
    });

    expect(orderModelUpdated.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: product.id,
          total: ordemItem.total(),
        },
        {
          id: ordemItem2.id,
          name: ordemItem2.name,
          price: ordemItem2.price,
          quantity: ordemItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
          total: ordemItem2.total(),
        }
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 15);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      4
    );

    const order = new Order("1", customer.id, [ordemItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(orderResult).toStrictEqual(order);    
  });

  it("should find all", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      3
    );

    const ordemItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [ordemItem]);
    const order2 = new Order("2", customer.id, [ordemItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordersResult = await orderRepository.findAll();

    expect(ordersResult.length).toBe(2);
    expect(ordersResult.find(x => x.id == order.id)).toStrictEqual(order);
    expect(ordersResult.find(x => x.id == order2.id)).toStrictEqual(order2);
  });
});