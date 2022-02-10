import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

export enum orderStatus {
   PREPARING = "PREPARING",
   REGISTRATION = "REGISTRATION",
   PAYING = "PAYING",
}

@Entity("orders")
export class Order extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   customerId!: number;

   @Column({
      type: "enum",
      enum: orderStatus,
      default: orderStatus.REGISTRATION,
   })
   status!: orderStatus;

   @CreateDateColumn()
   createdAt!: number;

   @UpdateDateColumn()
   updatedAt!: number;
}
