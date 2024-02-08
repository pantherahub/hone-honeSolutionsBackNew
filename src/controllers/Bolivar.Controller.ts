import { RequestHandler} from "express";
import * as repository from "../repository/Bolivar.Repository";
import { parseMessageI18n } from "../utils/parse-messga-i18";
import { CitiesRepositoryService, DepartmentsRepositoryService, PlansRepositoryService, SpecialitiesRepositoryService } from "../interface/Bolivar.Interface";

export const getDepartments: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: DepartmentsRepositoryService = await repository.getDepartments();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getCities: RequestHandler = async (req, res) => {
    try {
        let idDepartament: number | undefined = undefined;
        if (req.query.idDepartament) {
             idDepartament = parseInt(req.query.idDepartament as string);
        }

        const { code, message, ...resto }: CitiesRepositoryService = await repository.getCities(idDepartament);
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getPlans: RequestHandler = async (req, res) => {
    try {
        let idCity: number | undefined = undefined;
        if (req.query.idCity) {
            idCity = parseInt(req.query.idCity as string);
        }
        const { code, message, ...resto }: PlansRepositoryService = await repository.getPlans(idCity);
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getSpecialties: RequestHandler = async (req, res) => {
    try {
        let idCiudad: number | undefined = undefined,idDepartamento: number | undefined = undefined,idPlan: number | undefined = undefined;
        if (req.query.idCiudad) {
            idCiudad = parseInt(req.query.idCiudad as string);
        }
        if (req.query.idDepartamento) {
            idDepartamento = parseInt(req.query.idDepartamento as string);
        }
        if (req.query.idPlan) {
            idPlan = parseInt(req.query.idPlan as string);
        }
        const { code, message, ...resto }: SpecialitiesRepositoryService = await repository.getSpecialties(idCiudad,idDepartamento,idPlan);
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};
