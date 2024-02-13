import { Router } from "express";
import { check } from "express-validator";
import { validateEnpoint } from "../middlewares/validatorEnpoint";
import { getDepartments, getCities, getPlans, getSpecialties, getProvidersBolivar } from "../controllers/Bolivar.Controller";
import { validateApiKEY } from "../middlewares/validate-apikey";

const routes = Router();

//Rutas Bolivar
routes.get("/departamentos", validateApiKEY, getDepartments);

routes.get("/cities", validateApiKEY, getCities);

routes.get("/planes", validateApiKEY, getPlans);

routes.get("/especialidades", validateApiKEY, getSpecialties);

routes.get("/provedoresBolivar", validateApiKEY, getProvidersBolivar);

export default routes;
