import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import Tutorial from "../models/tutorial.model";

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
      models: [Tutorial],
    });

    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await this.sequelize.sync();
      console.log("Database synchronized!");
    } catch (err) {
      console.error("Unable to connect to the Database:", err);
    }
  }
}

export default new Database();
