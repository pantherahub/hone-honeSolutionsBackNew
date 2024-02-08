import { Router } from "express";
import { check } from "express-validator";
import { validateEnpoint } from "../middlewares/validatorEnpoint";
import { getDepartments, getCities, getPlans, getSpecialties } from "../controllers/Bolivar.Controller";

const routes = Router();

//Rutas Bolivar
routes.get("/departamentos", getDepartments);

routes.get("/cities", getCities);

routes.get("/planes", getPlans);

routes.get("/especialidades", getSpecialties);

export default routes;
