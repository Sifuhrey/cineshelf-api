import { Model, DataTypes } from "sequelize";
import database from "../database/database";

class Cinema extends Model {
    public id!: number;
    public userId?: number;
    public title!: string;
    public description!: string;
    public rating!: number;
    public isWatched!: boolean;
    public imageUrl!: string;
}

Cinema.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
    },
    isWatched: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }


}, {
    sequelize: database,
    tableName: "cinemas"
}
).sync()
.then(() => console.log("Cinema model synced successfully"))
    .catch((error: any) => console.error(`Error syncing Cinema model: ${error.message}`))

export default Cinema;




