import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false,
  })
  export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => CustomerModel) // here do a foreignkey to customer 
    @Column({allowNull: false})
    declare customer_id: string;

    @BelongsTo(() => CustomerModel) // here load the all customer data 
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel) // here load the all order-item
    declare items: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;
  }