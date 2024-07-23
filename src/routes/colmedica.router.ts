import { checkSchema } from "express-validator";
import { CreateTicketSchema } from "./schemas/ticket.schema";
import {
    saveNegotiationTabColmedica,
    getProvidersColmedica,
    getOfficeProvidersColmedica,
    getProductColmedica,
    getPlansColmedica,
    saveNegotiationTabPlansColmedica,
    getContactsProviderColmedica,
    getOccupationColmedica,
    getTypeFaresColmedica,
    getTypeRendomColmedica,
    saveNegotiationTabRendomColmedica,
    getTypeIncrementColmedica,
    saveNegotiationTabTypeIncrementColmedica
} from "../controllers/colmedica.controller";
import { query } from "express-validator";
import { Router } from "express";
import { validateEnpoint } from "../middlewares/validatorEnpoint";

const routes = Router();

routes.post(
    "/negotiationTabColmedica",
    checkSchema(CreateTicketSchema),
    saveNegotiationTabColmedica
)

routes.post(
    "/negotiationTabPlansColmedica",
    checkSchema(CreateTicketSchema),
    saveNegotiationTabPlansColmedica
)


routes.post(
    "/negotiationTabRendomColmedica",
    checkSchema(CreateTicketSchema),
    saveNegotiationTabRendomColmedica
)


routes.post(
    "/negotiationTabRendomColmedica",
    checkSchema(CreateTicketSchema),
    saveNegotiationTabRendomColmedica
)


routes.post(
    "/negotiationTabTypeIncrementColmedica",
    checkSchema(CreateTicketSchema),
    saveNegotiationTabTypeIncrementColmedica
)


routes.get(
    "/providersColmedicas",
    [
        query("idProvider", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getProvidersColmedica
)

routes.get(
    "/contactsProviderColmedica",
    [
        query("idProvider", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getContactsProviderColmedica
)

routes.get(
    "/officeProvidersColmedica",
    [
        query("idOfficeProvider", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getOfficeProvidersColmedica
)

routes.get(
    "/productColmedica",
    getProductColmedica
)

routes.get(
    "/occupationColmedica",
    [
        query("idOccupation", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getOccupationColmedica
)

routes.get(
    "/plansColmedica",
    getPlansColmedica
)

routes.get(
    "/typeFaresColmedica",
    getTypeFaresColmedica
)

routes.get(
    "/typeRendomColmedica",
    getTypeRendomColmedica
)

routes.get(
    "/typeIncrementColmedica",
    getTypeIncrementColmedica
)


export default routes;
