import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("favorites")
class Favorite {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "text", length: 50, unique: true })
   authorId: string;

   @Column({ type: "text", length: 50, unique: true })
   recipeId: string;

   @Column({ type: "boolean" })
   isDeleted: boolean;

   @Column({ type: "boolean" })
   isReported: boolean;

   @Column({ type: "time without time zone", length: 255 })
   createdAt: Date;

   @Column({ type: "time without time zone", length: 255 })
   updatedAt: Date;
}

export default Favorite;
