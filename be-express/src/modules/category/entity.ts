import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import CategoriesEnum, {
   CATEGORIES_ENUM,
} from "../../shared/enums/categories.enum";

@Entity("categories")
class Category {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "text", length: 50, unique: true })
   categoryId: string;

   @Column({
      type: "text",
      length: CategoriesEnum.options.reduce((a: any, b: any) =>
         a.length >= b.length ? a : b,
      ).length,
      unique: true,
   })
   categoryName: CATEGORIES_ENUM;

   @Column({ type: "text", length: 255 })
   imageUrl: string;

   @Column({ type: "text", length: 255 })
   description: string;

   @Column({ type: "boolean" })
   isDeleted: boolean;
}

export default Category;
