import {
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
   Column,
   JoinTable,
   OneToOne,
} from "typeorm";
import Ingredient from "../ingredient/entity";
import NutritionalFacts from "../nutritional_facts/entity";

@Entity("recipes")
class Recipe {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "text", length: 50, unique: true })
   authorId: string;

   @Column({ type: "text", length: 50, unique: true })
   recipeId: string;

   @Column({ type: "text", length: 255, unique: true })
   title: string;

   @Column({ type: "text", length: 255 })
   description: string;

   @Column({ type: "text", length: 255 })
   instructions: string;

   @OneToMany(() => Ingredient, (ingredient) => ingredient.recipeId)
   @JoinTable({
      name: "recipe_ingredients",
      joinColumn: { name: "recipeId", referencedColumnName: "id" },
      inverseJoinColumn: { name: "ingredientId", referencedColumnName: "id" },
   })
   ingredients: Array<Ingredient>;

   @Column({ type: "numeric", length: 10 })
   cookingTime: number;

   @Column({ type: "numeric", length: 10 })
   prepTime: number;

   @Column({ type: "numeric", length: 10 })
   servings: number;

   @OneToOne(
      () => NutritionalFacts,
      (nutritionalFacts) => nutritionalFacts.recipeId,
   )
   @JoinTable({
      name: "recipe_nutritional_facts",
      joinColumn: { name: "recipeId", referencedColumnName: "id" },
      inverseJoinColumn: {
         name: "nutritionalFactsId",
         referencedColumnName: "id",
      },
   })
   nutritionalFacts: NutritionalFacts;

   @Column({ type: "text", length: 255 })
   imageUrl: string;

   @Column({ type: "time without time zone", length: 255 })
   createdAt: Date;

   @Column({ type: "time without time zone", length: 255 })
   updatedAt: Date;

   @Column({ type: "boolean" })
   isDeleted: boolean;

   @Column({ type: "boolean" })
   isReported: boolean;
}

export default Recipe;
