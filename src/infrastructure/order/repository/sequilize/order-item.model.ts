import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequilize/product.model";

@Table({
    tableName: "order_items",
    timestamps: false,
  })
  export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => ProductModel) // here do a foreignkey to product 
    @Column({allowNull: false})
    declare product_id: string;

    @BelongsTo(() => ProductModel) // here load the all product data 
    declare product: ProductModel;

    @ForeignKey(() => OrderModel) // here do a foreignkey to order 
    @Column({allowNull: false})
    declare order_id: string;

    @BelongsTo(() => OrderModel) // here load the all order data 
    declare order: OrderModel;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare price: number;

    @Column({allowNull: false})
    declare total: number;
  }