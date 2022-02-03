import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntites {
    @CreateDateColumn(
        {
            update: false
        }
    )
    createdAT: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAT: Date;
}