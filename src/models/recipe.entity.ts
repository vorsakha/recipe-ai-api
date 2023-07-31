import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "@models/user.entity";

@Entity("recipe")
class Recipe {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  description: string;

  @Column({ type: String })
  rules: string[];
}

export default Recipe;
