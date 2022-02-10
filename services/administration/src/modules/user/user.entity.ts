import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  login: string;

  @Column({
    type: 'numeric',
    unique: true,
  })
  phone: string;

  @Column({
    length: 56,
  })
  firstName: string;

  @Column({
    length: 56,
  })
  lastName: string;

  @Column({
    length: 56,
  })
  patronymic: string;

  @Column({
    length: 256,
  })
  password: string;
}
