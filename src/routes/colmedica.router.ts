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
    deleteNegotiationTabServiceColmedicaController,
    getGroupByIdNegotiationTabColmedica,
    getSpecialityByIdNegotiationTabColmedica,
    getTypeFareByIdNegotiationTabColmedica,
    getByIdNegotiationTabColmedica,
    getCodeIpsByIdNegotiationTabColmedica,
    getCodeCupsByIdNegotiationTabColmedica,
    getCodeIssByIdNegotiationTabColmedica,
    getTypeReferenceByIdNegotiationTabColmedica,
    updateNegotiationTabCupsColmedicaController,
    getTypeFareByIdNegotiationTabColmedicaAmbulatorio,
    getTypeFareByIdNegotiationTabColmedicaHospitalario
} from "../controllers/colmedica.controller";
import { body, query } from "express-validator";
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

routes.get(
    "/groupByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getGroupByIdNegotiationTabColmedica
);

routes.get(
    "/specialityByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getSpecialityByIdNegotiationTabColmedica
);

routes.get(
    "/typeFareByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getTypeFareByIdNegotiationTabColmedica
);

routes.get(
    "/infoByIdNegotiationTabColmedica",
    [
      query("id_NegotiationTabColmedica", "global.int_type_field").notEmpty().isInt(),
      query("idSpeciality").optional().isString(),
      query("idClasificationTypeService").optional().isString(),
      query("codigoCups").optional().isString(),
      query("codigoIPS").optional().isString(),
      query("codigoISS").optional().isString(),
      query("idTypeFareReferenceA").optional().isString(),
      query("idTypeFareReferenceH").optional().isString(),
      validateEnpoint
    ],
    getByIdNegotiationTabColmedica
  );

routes.get(
    "/codeIpsByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getCodeIpsByIdNegotiationTabColmedica
);

routes.get(
    "/codeCupsByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getCodeCupsByIdNegotiationTabColmedica
);

routes.get(
    "/codeIssByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getCodeIssByIdNegotiationTabColmedica
);

routes.get(
    "/typeReferenceByIdNegotiationTabColmedica",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getTypeReferenceByIdNegotiationTabColmedica
);

routes.put(
    "/updateNegotiationTabCupsColmedica",
    [
      body("idNegotiationTabColmedica", "global.int_type_field").notEmpty().isInt(),
      body("idTypeFareReferenceA", "global.int_type_field").optional().isInt(),
      body("idTypeFareReferenceH", "global.int_type_field").optional().isInt(),
      body("incrementTypeReferenceA", "global.float_type_field").optional().isFloat(),
      body("incrementTypeReferenceH", "global.float_type_field").optional().isFloat(),
      body("idTypeIncrement", "global.int_type_field").notEmpty().isInt(),
      body("newValueA", "global.float_type_field").optional().isFloat(),
      body("newValueH", "global.float_type_field").optional().isFloat(),
      validateEnpoint 
    ],
    updateNegotiationTabCupsColmedicaController
  );

routes.get(
    "/getTypeFareByIdNegotiationTabColmedicaAmbulatorio",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getTypeFareByIdNegotiationTabColmedicaAmbulatorio
);

routes.get(
    "/getTypeFareByIdNegotiationTabColmedicaHospitalario",
    [
        query("id_NegotiationTabColmedica", "global.int_type_field").optional().isInt(),
        validateEnpoint
    ],
    getTypeFareByIdNegotiationTabColmedicaHospitalario
);
export default routes;
