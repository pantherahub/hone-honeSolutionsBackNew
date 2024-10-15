import { Sequelize } from "sequelize";
import "colors";
import config from "../config/config";
import * as sql from 'mssql';

const configSQL: sql.config = {
  user: config.user_server_sql,
  password: config.db_password_sql,
  database: config.name_database_sql,
  server:config.server_name_sql,
  options: {
    encrypt: false,
    // trustServerCertificate: true,
  },
};

// Instancia de conexión para SQL
async function connectToSqlServer() {
  try {
    const pool = await sql.connect(configSQL); // Utiliza la configuración de SQL
    console.log('Conectado a SQL Server');

    return pool;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
  }
}

const connectionSequelizeSql = new Sequelize(config.name_database_sql, config.user_server_sql, config.db_password_sql, {
  host: config.server_name_sql,
  dialect: 'mssql',
  define: {
    freezeTableName: true
  },
  dialectOptions: {
    options: configSQL.options,
  },
})

export { connectToSqlServer, connectionSequelizeSql };
