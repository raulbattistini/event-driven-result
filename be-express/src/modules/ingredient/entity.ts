import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ingredients")
class Ingredient {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "text", length: 50, unique: true })
   recipeId: string;

   @Column({ type: "text", length: 255, unique: true })
   ingredientId: string;

   @Column({ type: "numeric", length: 10 })
   quantity: number;

   @Column({ type: "text", length: 255 })
   note: string;
}

export default Ingredient;
