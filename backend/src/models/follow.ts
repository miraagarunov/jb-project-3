import {
  ForeignKey,
  Column,
  DataType,
  Table,
  Model,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { Vacation } from "./vacation";

@Table({
  tableName: "follows",
  underscored: true,
})
export class Follow extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: "user_id" })
  userId: string;

  @PrimaryKey
  @ForeignKey(() => Vacation)
  @Column({ type: DataType.UUID, field: "vacation_id" })
  vacationId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Vacation)
  vacation: Vacation;
}
