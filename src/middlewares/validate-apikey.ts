import { Response, Request, NextFunction } from "express";
import { connectToSqlServer } from "../DB/config";

const genAPIKey = () => {
  // Crear una cadena base-36 que contenga 30 caracteres de a-z, 0-9
  return [...Array(30)].map(() => ((Math.random() * 50) | 0).toString(36)).join('');
};

export const validateApiKEY = async (req: Request, res: Response, next: any) => {
    try {
      const apiKey = req.header("x-api-key");
      if (!apiKey) {
        return res.status(401).json({
          msg: "No tienes acceso a la url",
        });
      }
  
      const db = await connectToSqlServer();
      const query = `SELECT * FROM TB_ApiKeys WHERE apiKey = @apiKey`;
      const result = await db?.request().input('apiKey', apiKey).query(query);
      if (result?.recordset.length === 0) {
        return res.status(401).json({
          msg: "Usuario sin permisos para acceder a la url",
        });
      }
      next();
    } catch (error) {
      console.error("Error al validar la apiKey:", error);
      return res.status(500).json({
        msg: "Error al validar la apiKey",
      });
    }
  };
  
  
