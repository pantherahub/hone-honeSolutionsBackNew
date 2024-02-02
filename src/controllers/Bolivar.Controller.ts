import { RequestHandler, request, response } from "express";
import * as repository from "../repository/Bolivar.Repository";
import { parseMessageI18n } from "../utils/parse-messga-i18";
import { IresponseRepositoryService } from "../interface/example";
import { connectToSqlServer } from "../DB/config";
import { DepartmentsRepositoryService } from "../interface/Bolivar.Interface";

export const getDepartments: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IresponseRepositoryService = await repository.getDepartments();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};
