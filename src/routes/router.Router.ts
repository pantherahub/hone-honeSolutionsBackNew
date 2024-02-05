import { Router } from "express";
import { check } from "express-validator";
import { validateEnpoint } from "../middlewares/validatorEnpoint";
import { getDepartments } from "../controllers/Bolivar.Controller";
import { getCities } from "../repository/Bolivar.Repository";

const routes = Router();

//Rutas Bolivar
routes.get("/departamentos", getDepartments)

routes.get("/cities", getCities)//validar

export default routes;
