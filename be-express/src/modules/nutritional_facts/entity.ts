import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("nutritional_facts")
class NutritionalFacts {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "text", length: 50, unique: true })
   recipeId: string;
   @Column({ type: "numeric", length: 10 })
   calories: number;
   @Column({ type: "numeric", length: 10 })
   fat: number;
   @Column({ type: "numeric", length: 10 })
   carbohydrates: number;
   @Column({ type: "numeric", length: 10 })
   protein: number;
   @Column({ type: "text", length: 255 })
   ingredients: string;
   @Column({ type: "text", length: 255 })
   notes: string;
   @Column({ type: "numeric", length: 10 })
   servings: number;
}

export default NutritionalFacts;
