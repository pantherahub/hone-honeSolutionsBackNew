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
    saveNegotiationTabTypeIncrementColmedica,
    loadFileNegotiationTabColmedica,
    getTypeServiceColmedica,
    getClasificationTypeServiceColmedica,
    getServicesColmedica,
    getReferenceRateColmedica,
    getNegotiationTabColmedica,
    saveNegotiationTabServiceColmedica,
    saveNegotiationTabFareBaseColmedica,
    updateNegotiationTabServiceColmedica,
    saveLogicNegotiationTabCupsColmedica,
    getInfoLogicColmedica,
    getInfoOfficeProvider,
    getInfoLogicTableColmedica,
    getNegotiationDetails,
    updateNegotiationTabColmedica,
    updateNegotiationTabPlansColmedica,
    updateNegotiationTabRendomColmedica,
    updateNegotiationTabFareBaseColmedica,
    updateNegotiationTabTypeIncrementColmedica,
    deleteNegotiationTabServiceColmedicaController
} from "../controllers/colmedica.controller";
import { query } from "express-validator";
import { Router } from "express";
import { validateEnpoint } from "../middlewares/validatorEnpoint";

const routes = Router();

routes.post(
    "/negotiationTabColmedica",
    saveNegotiationTabColmedica
)

routes.post(
    "/negotiationTabFareBaseColmedica",
    saveNegotiationTabFareBaseColmedica
)

routes.post(
    "/negotiationTabServiceColmedica",
    saveNegotiationTabServiceColmedica
)

routes.post(
    "/negotiationTabPlansColmedica",
    saveNegotiationTabPlansColmedica
)

routes.post(
    "/negotiationTabRendomColmedica",
    saveNegotiationTabRendomColmedica
)

routes.post(
    "/negotiationTabTypeIncrementColmedica",
    saveNegotiationTabTypeIncrementColmedica
)

routes.post(
    "/saveLogicNegotiationTabCupsColmedica",
    saveLogicNegotiationTabCupsColmedica
)

routes.put(
    "/negotiationTabServiceColmedica",
    updateNegotiationTabServiceColmedica
)

routes.put(
    '/negotiationTabColmedica/:id',
    updateNegotiationTabColmedica
);

routes.put(
    '/negotiationTabPlansColmedica/:id',
    updateNegotiationTabPlansColmedica
);

routes.put(
    '/negotiationTabFareBaseColmedica',
    updateNegotiationTabFareBaseColmedica
);

routes.put(
    '/negotiationTabRendomColmedica',
    updateNegotiationTabRendomColmedica
);

routes.put(
    '/negotiationTabTypeIncrementColmedica',
    updateNegotiationTabTypeIncrementColmedica
);

routes.get(
    "/providersColmedicas",
    [
        query("idProvider", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getProvidersColmedica
)

routes.get(
    "/infoOfficeProvider",
    [
        query("idProvider", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getInfoOfficeProvider
)


routes.get(
    "/infoLogicColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getInfoLogicColmedica
)

routes.get(
    "/negotiationDetails",
    [
        query("id", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getNegotiationDetails
)

routes.get(
    "/infoLogicTableColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getInfoLogicTableColmedica
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
    "/servicesColmedica",
    [
        query("idClasificationTypeService", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getServicesColmedica
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
    "/typeServiceColmedica",
    getTypeServiceColmedica
)

routes.get(
    "/typeIncrementColmedica",
    getTypeIncrementColmedica
)

routes.post(
    '/load-negotiation-file',
    loadFileNegotiationTabColmedica
)

routes.get(
    "/referenceRateColmedica",
    getReferenceRateColmedica
)

routes.get(
    "/clasificationTypeServiceColmedica",
    getClasificationTypeServiceColmedica
)

routes.get(
    "/negotiationTabColmedica",
    getNegotiationTabColmedica
)

routes.delete(
    "/negotiationTabServiceColmedica/:idNegotiationTabServiceColmedica",
    [
        query("idClasificationTypeService", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
     deleteNegotiationTabServiceColmedicaController
);

export default routes;
