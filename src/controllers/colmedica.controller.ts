import { RequestHandler} from "express";
import * as repository from "../repository/colmedica";
import { parseMessageI18n } from "../utils/parse-messga-i18";
import { IResponse, IResponseCreate } from "../interface/ticket.interface";

export const saveNegotiationTabColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveNegotiationTabColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const saveNegotiationTabFareBaseColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveNegotiationTabFareBaseColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const saveNegotiationTabServiceColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveNegotiationTabServiceColmedicaColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const saveNegotiationTabTypeIncrementColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveNegotiationTabTypeIncrementColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const saveNegotiationTabRendomColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveNegotiationTabRendomColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const saveNegotiationTabPlansColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveNegotiationTabPlansColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const saveLogicNegotiationTabCupsColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.saveLogicNegotiationTabCupsColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const updateNegotiationTabServiceColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.updateNegotiationTabServiceColmedica(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const updateNegotiationTabColmedica: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
  
      if (isNaN(id)) {
        return res.status(400).json({ message: parseMessageI18n('invalid_id', req) });
      }
  
      const updates = req.body;
  
      const { code, message, data } = await repository.updateNegotiationTabColmedica(id, updates);
  
      res.status(code).json({ message: parseMessageI18n(message, req), data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
  };
  

  export const updateNegotiationTabPlansColmedica: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
  
      if (isNaN(id)) {
        return res.status(400).json({ message: parseMessageI18n('invalid_id', req) });
      }
  
      const updates = req.body;
  
      const { code, message, data } = await repository.updateNegotiationTabPlansColmedica(id, updates);
  
      res.status(code).json({ message: parseMessageI18n(message, req), data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
  };

export const updateNegotiationTabFareBaseColmedica: RequestHandler = async (req, res) => {
  try {
    // Extraer valores desde req.body
    const { idNegotiationTabColmedica, idTypeFare } = req.body;

    // Validar que los valores esperados están presentes
    if (!idNegotiationTabColmedica || !Array.isArray(idTypeFare)) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }

    // Llamar al servicio con los datos extraídos
    const { code, message, data } = await repository.updateNegotiationTabFareBaseColmedica({
      idNegotiationTabColmedica,
      idTypeFare,
    });

    return res.status(code).json({
      message,
      data,
    });
  } catch (err) {
    console.error("Error in updateNegotiationTabFareBaseColmedicaController:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateNegotiationTabRendomColmedica: RequestHandler = async (req, res) => {
    try {
      // Extraer los valores desde req.body
      const { id_NegotiationTabColmedica, idTypeRendom, idTypeService } = req.body;
  
      // Validar que los valores esperados están presentes
      if (!id_NegotiationTabColmedica || !Array.isArray(idTypeRendom) || !Array.isArray(idTypeService)) {
        return res.status(400).json({
          message: 'Invalid request body. Ensure id_NegotiationTabColmedica is provided and idTypeRendom, idTypeService are arrays.',
        });
      }
  
      // Llamar al servicio con los datos extraídos
      const { code, message, data } = await repository.updateNegotiationTabRendomColmedica({
        id_NegotiationTabColmedica,
        idTypeRendom,
        idTypeService,
      });
  
      return res.status(code).json({
        message,
        data,
      });
    } catch (err) {
      console.error("Error in updateNegotiationTabRendomColmedicaController:", err);
      return res.status(500).json({
        message: 'Server error. Please try again later.',
      });
    }
  };
  
  export const updateNegotiationTabTypeIncrementColmedica: RequestHandler = async (req, res) => {
    try {
      // Extraer directamente los valores desde req.body
      const { id_NegotiationTabColmedica, idTypeIncrement, valueIncrement } = req.body;
  
      // Validar que los valores esperados están presentes
      if (!id_NegotiationTabColmedica || !Array.isArray(idTypeIncrement) || !Array.isArray(valueIncrement) || idTypeIncrement.length !== valueIncrement.length) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }
  
      // Llamar al servicio con los datos extraídos
      const { code, message, data } = await repository.updateNegotiationTabTypeIncrementColmedica({
        id_NegotiationTabColmedica,
        idTypeIncrement,
        valueIncrement,
      });
  
      return res.status(code).json({
        message,
        data,
      });
    } catch (err) {
      console.error("Error in updateNegotiationTabTypeIncrementColmedicaController:", err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };

    

export const getProvidersColmedica: RequestHandler = async (req, res) => {
    try {
        const idProvider = req.query.idProvider;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getProvidersColmedica(idProvider);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getNegotiationDetails: RequestHandler = async (req, res) => {
    try {
        const id = req.query.id;
        
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: parseMessageI18n('invalid_id', req) });
        }

        const numericId = parseInt(id as string, 10);

        if (isNaN(numericId)) {
            return res.status(400).json({ message: parseMessageI18n('invalid_id', req) });
        }

        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getNegotiationDetails(numericId);
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getInfoOfficeProvider: RequestHandler = async (req, res) => {
    try {
        const idProvider = req.query.idProvider;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getInfoOfficeProvider(idProvider);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getContactsProviderColmedica: RequestHandler = async (req, res) => {
    try {
        const idProvider = req.query.idProvider;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getContactsProviderColmedica(idProvider);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};



export const getOfficeProvidersColmedica: RequestHandler = async (req, res) => {
    try {
        const idOfficeProvider = req.query.idOfficeProvider;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getOfficeProvidersColmedica(idOfficeProvider);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getProductColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getProductColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getTypeServiceColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getTypeServiceColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};



export const getReferenceRateColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getReferenceRateColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};



export const getOccupationColmedica: RequestHandler = async (req, res) => {
    try {
        const idOccupation = req.query.idOccupation;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getOccupationColmedica(idOccupation);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getServicesColmedica: RequestHandler = async (req, res) => {
    try {
        const idClasificationTypeService = req.query.idClasificationTypeService;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getServicesColmedica(idClasificationTypeService);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getInfoLogicColmedica: RequestHandler = async (req, res) => {
    try {
        const id_NegotiationTabColmedica = req.query.id_NegotiationTabColmedica;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getInfoLogicColmedica(id_NegotiationTabColmedica);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getInfoLogicTableColmedica: RequestHandler = async (req, res) => {
    try {
        const id_NegotiationTabColmedica = req.query.id_NegotiationTabColmedica;
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getInfoLogicTableColmedica(id_NegotiationTabColmedica);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getPlansColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getPlansColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getTypeFaresColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getTypeFaresColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getTypeRendomColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getTypeRendomColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getTypeIncrementColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getTypeIncrementColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};

export const getClasificationTypeServiceColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getClasificationTypeServiceColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getNegotiationTabColmedica: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.getNegotiationTabColmedica();
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};