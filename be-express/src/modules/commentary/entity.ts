import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";

@Entity("commentary")
class Commentary {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @JoinColumn({ name: "commentary" })
   userId: string;

   @Column({ type: "time with time zone", length: 255 })
   createdAt: Date;
}

export default Commentary;
