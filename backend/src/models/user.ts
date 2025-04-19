import {
  AllowNull,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
  Index,
} from "sequelize-typescript";
import { Vacation } from "./vacation";
import { Follow } from "./follow";

@Table({
  tableName: "users",
  underscored: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, field: "user_id" })
  userId: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  lastName: string;

  @Index({ unique: true })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    validate: { isEmail: true },
  })
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(64))
  password: string;

  @AllowNull(false)
  @Default("user")
  @Column(DataType.ENUM("user", "admin"))
  role: string;

  @BelongsToMany(() => Vacation, () => Follow)
  followedVacations: Vacation[];
}
