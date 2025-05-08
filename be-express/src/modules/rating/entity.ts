import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ratings")
class Rating {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "text", length: 50, unique: true })
   authorId: string;

   @Column({ type: "text", length: 50, unique: true })
   recipeId: string;

   @Column({ type: "numeric", length: 10 })
   rating: number;

   @Column({ type: "text", length: 255 })
   comment: string;

   @Column({ type: "time without time zone", length: 255 })
   createdAt: Date;

   @Column({ type: "time without time zone", length: 255 })
   updatedAt: Date;

   @Column({ type: "boolean" })
   isDeleted: boolean;

   @Column({ type: "boolean" })
   isReported: boolean;
}

export default Rating;
