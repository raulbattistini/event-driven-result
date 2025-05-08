import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ROLES_ENUM } from "../../shared/enums/roles.enum";
import { regex } from "../../shared/utils/helpers/regex.util";

@Entity("users")
class User {
   @PrimaryGeneratedColumn("uuid")
   id: typeof regex.uuid;

   @Column({ type: "text", length: 50, unique: true })
   username: string;

   @Column({ type: "text", length: 50, unique: true })
   name: string;

   @Column({ type: "text", length: 255, unique: true })
   email: string;

   @Column({ type: "text", length: 255 })
   private password: string;

   @Column({ type: "text", length: 255 })
   passwordHash: string;

   @Column({ type: "text", length: 255 })
   avatarUrl: string;

   @Column({ type: "text", length: 255 })
   role: ROLES_ENUM;

   @Column({ type: "time without time zone", length: 255 })
   createdAt: Date;
}

export default User;
