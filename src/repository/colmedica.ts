import { connectToSqlServer } from "../DB/config"
import * as xlsx from 'xlsx';
import { IresponseRepositoryService } from "../interface/general";
import {
  INegotiationTabColmedica,
  IProviderColmedica,
  IOfficeProviderColmedica,
  IProductColmedica,
  IPlansColmedica,
  INegotiationTabPlansColmedica,
  IContactsProviderColmedica,
  IOccupationColmedica,
  ITypeRendomColmedica,
  INegotiationTabRendomColmedica,
  ITypeIncrementColmedica,
  INegotiationTabTypeIncrementColmedica,
  IUploadFileColemdica
} from "../interface/colmedica";

export const saveNegotiationTabColmedica = async (
  negotiationTabColmedica: INegotiationTabColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { idOfficeProvider, idProduct, dateBegin, idContactsProvider, dateEnd } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryPlans = `
    INSERT INTO [dbo].[TB_NegotiationTabColmedica]
    ([idOfficeProvider], [dateBegin], [dateEnd], [idContactsProvider], [idProduct])
    OUTPUT inserted.*
    VALUES (@idOfficeProvider, @dateBegin, @dateEnd, @idContactsProvider, @idProduct);
  `;

    const request = db.request();
    request.input("idOfficeProvider", idOfficeProvider);
    request.input("dateBegin", dateBegin);
    request.input("dateEnd", dateEnd);
    request.input("idContactsProvider", idContactsProvider);
    request.input("idProduct", idProduct);

    const result = await request.query(queryPlans);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Failed to insert and retrieve the record");
    }

    const insertedRecord = result.recordset[0];

    return {
      code: 200,
      message: "ok",
      data: insertedRecord,
    };
  } catch (err: any) {
    console.error("Error in saveNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "saveNegotiationTabColmedica" },
      },
    };
  }
};

export const saveNegotiationTabPlansColmedica = async (
  negotiationTabColmedica: INegotiationTabPlansColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { idNegotiationTabColmedica, idPlan, idTypeService } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryPlans = `
     INSERT INTO [dbo].[TB_NegotiationTabPlansColmedica]
           ([idNegotiationTabColmedica]
           ,[idPlan]
           ,[idTypeService])
           OUTPUT inserted.*
     VALUES
           (@idNegotiationTabColmedica
           ,@idPlan
           ,@idTypeService)
  `;

    const request = db.request();
    request.input("idNegotiationTabColmedica", idNegotiationTabColmedica);
    request.input("idPlan", idPlan);
    request.input("idTypeService", idTypeService);

    const result = await request.query(queryPlans);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Failed to insert and retrieve the record");
    }

    const insertedRecord = result.recordset[0];

    return {
      code: 200,
      message: "ok",
      data: insertedRecord,
    };
  } catch (err: any) {
    console.error("Error in saveNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "saveNegotiationTabColmedica" },
      },
    };
  }
};

export const saveNegotiationTabRendomColmedica = async (
  negotiationTabColmedica: INegotiationTabRendomColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { id_NegotiationTabColmedica, idTypeRendom, idTypeService } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryPlans = `
    INSERT INTO [dbo].[TB_NegotiationTabRendomColmedica]
           ([id_NegotiationTabColmedica]
           ,[idTypeRendom]
           ,[idTypeService])
            OUTPUT inserted.*
     VALUES
           (@id_NegotiationTabColmedica
           ,@idTypeRendom
           ,@idTypeService)
  `;

    const request = db.request();
    request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
    request.input("idTypeRendom", idTypeRendom);
    request.input("idTypeService", idTypeService);

    const result = await request.query(queryPlans);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Failed to insert and retrieve the record");
    }

    const insertedRecord = result.recordset[0];

    return {
      code: 200,
      message: "ok",
      data: insertedRecord,
    };
  } catch (err: any) {
    console.error("Error in saveNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "saveNegotiationTabColmedica" },
      },
    };
  }
};


export const saveNegotiationTabTypeIncrementColmedica = async (
  negotiationTabColmedica: INegotiationTabTypeIncrementColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { id_NegotiationTabColmedica,idTypeIncrement } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryPlans = `
   INSERT INTO [dbo].[TB_NegotiationTabTypeIncrement]
           ([id_NegotiationTabColmedica]
           ,[idTypeIncrement])
            OUTPUT inserted.*
     VALUES
           (@id_NegotiationTabColmedica
           ,@idTypeIncrement)
  `;

    const request = db.request();
    request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
    request.input("idTypeIncrement", idTypeIncrement);

    const result = await request.query(queryPlans);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Failed to insert and retrieve the record");
    }

    const insertedRecord = result.recordset[0];

    return {
      code: 200,
      message: "ok",
      data: insertedRecord,
    };
  } catch (err: any) {
    console.error("Error in saveNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "saveNegotiationTabColmedica" },
      },
    };
  }
};



export const getProvidersColmedica = async (idProvider: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      SELECT pr.idProvider,razonSocial,pr.idTypeDocument,ty.typeDocument,pr.identificacion,offi.idCity,ci.city,offi.idOfficeProvider FROM TB_Provider AS pr
      LEFT JOIN TB_OfficeProvider AS offi ON offi.idProvider = pr.idProvider
      LEFT JOIN TB_typeDocument AS ty ON pr.idTypeDocument = ty.idTypeDocument
      LEFT JOIN TB_City AS ci ON ci.idCity = offi.idCity
      WHERE @idProvider IS NULL OR pr.idProvider = @idProvider;
    `;

    const request = db.request();
    request.input('idProvider', idProvider || null);

    const result = await request.query(queryProviders);

    const providers: IProviderColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getProvidersColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getProvidersColmedica" },
      },
    };
  }
};


export const getOfficeProvidersColmedica = async (idOfficeProvider: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      SELECT ISNULL(idOfficeProvider, 0) AS idOfficeProvider, ISNULL(OfficeProviderName, 'N/A') AS OfficeProviderName, ISNULL(idProvider, 0) AS idProvider
      FROM TB_OfficeProvider
      WHERE @idOfficeProvider IS NULL OR idOfficeProvider = @idOfficeProvider;
    `;

    const inputIdOfficeProvider = idOfficeProvider !== undefined ? idOfficeProvider : null;

    const request = db.request();
    request.input('idOfficeProvider', inputIdOfficeProvider);

    const result = await request.query(queryProviders);

    const providers: IOfficeProviderColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getOfficeProvidersColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getOfficeProvidersColmedica" },
      },
    };
  }
};




export const getContactsProviderColmedica = async (idProvider: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      SELECT co.idContactsProvider, co.name, co.SurName, oc.idOccupation, oc.occupation, co.phone, co.email, co.idProvider
      FROM TB_ContactsProvider AS co
      LEFT JOIN TB_Occupation AS oc ON oc.idOccupation = co.idOccupation
      WHERE (@idProvider IS NULL OR co.idProvider = @idProvider)
    `;

    const inputIdOfficeProvider = idProvider !== undefined ? idProvider : null;

    const request = db.request();
    request.input('idProvider', inputIdOfficeProvider);

    const result = await request.query(queryProviders);

    const providers: IContactsProviderColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getContactsProviderColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getContactsProviderColmedica" },
      },
    };
  }
};




export const getProductColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      select * from TB_Product
    `;

    const request = db.request();

    const result = await request.query(queryProviders);

    const providers: IProductColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getProductColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getProductColmedica" },
      },
    };
  }
};



export const getOccupationColmedica = async (idOccupation: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      SELECT * FROM TB_Occupation WHERE (@idOccupation IS NULL OR idOccupation = @idOccupation)
    `;

    const inputIdOccupation = idOccupation !== undefined ? idOccupation : null;

    const request = db.request();
    request.input('idOccupation', inputIdOccupation);

    const result = await request.query(queryProviders);

    const providers: IOccupationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getContactsProviderColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getContactsProviderColmedica" },
      },
    };
  }
};



export const getTypeFaresColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    SELECT * FROM TB_TypeFares WHERE idTypeFare in (15,5,1,6,18)
    `;

    const request = db.request();

    const result = await request.query(queryProviders);

    const providers: IPlansColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getPlansColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getPlansColmedica" },
      },
    };
  }
};



export const getTypeRendomColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      SELECT * FROM TB_typeRendom
    `;

    const request = db.request();

    const result = await request.query(queryProviders);

    const providers: ITypeRendomColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getPlansColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getPlansColmedica" },
      },
    };
  }
};


export const getTypeIncrementColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
     SELECT  *  FROM TB_TypeIncrement
    `;

    const request = db.request();

    const result = await request.query(queryProviders);

    const providers: ITypeIncrementColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getTypeIncrementColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getTypeIncrementColmedica" },
      },
    };
  }
};



export const getPlansColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    select p.idPlan,pr.PlansRange + ' ' + p.[plan] AS namePlan from TB_Plans as p
    inner join TB_PlansRangePlan as prp on prp.idPlan = p.idPlan
    inner join TB_PlansRange as pr on pr.idPlansRange = prp.idPlansRange
    where p.idClientHoneSolutions = 9
    `;

    const request = db.request();

    const result = await request.query(queryProviders);

    const providers: IPlansColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: providers,
    };
  } catch (err: any) {
    console.error("Error in getPlansColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getPlansColmedica" },
      },
    };
  }
};

export const postLoadFileNegotiationColmedica = async (formDataArray: IUploadFileColemdica[]): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();
    if (!db) {
      throw new Error("Database connection failed");
    }

    const insertedRecords = [];

    for (const formData of formDataArray) {
      const {
        id_NegotiationTabColmedica,codigoCups, codigoIPS, codigoISS, idTypeFareReferenceA, Iss2001uvrUvrOTarifa, fareGamaAltaA,
        fareGamaHumanaA, fareGamaMediaA, fareGamaMenorA, farePreferencialA, idTypeFareReferenceH,
        fareGamaAltaH, fareGamaHumanaH, fareGamaMediaH, fareGamaMenorH, farePreferencialH, incrementTypeReferenceA, incrementTypeReferenceH
      } = formData;

      const queryMedicalAct = `
        SELECT idMedicalAct, idSpeciality
        FROM TB_MedicalAct
        WHERE code = @codigoCups
      `;
      const requestMedicalAct = db.request();
      requestMedicalAct.input('codigoCups', codigoCups);
      const resultMedicalAct = await requestMedicalAct.query(queryMedicalAct);

      if (!resultMedicalAct.recordset || resultMedicalAct.recordset.length === 0) {
        console.error(`No se encontró el código CUPS: ${codigoCups}`);
        continue; 
      }

      let idMedicalAct: number | null = null;
      let idSpeciality: number | null = null;

      for (const record of resultMedicalAct.recordset) {
        const querySpecialityClient = `
          SELECT idSpeciality
          FROM TB_SpecialityClientHoneSolutions
          WHERE idSpeciality = @idSpeciality
        `;
        const requestSpecialityClient = db.request();
        requestSpecialityClient.input('idSpeciality', record.idSpeciality);
        const resultSpecialityClient = await requestSpecialityClient.query(querySpecialityClient);

        if (resultSpecialityClient.recordset && resultSpecialityClient.recordset.length > 0) {
          idMedicalAct = record.idMedicalAct;
          idSpeciality = resultSpecialityClient.recordset[0].idSpeciality;
          break;
        }
      }

      if (idSpeciality === null || idMedicalAct === null) {
        console.error(`No se encontró un idSpeciality válido para el código CUPS: ${codigoCups}`);
        continue; 
      }

      let fareNameA = idTypeFareReferenceA.toString();
      let incrementValueA = incrementTypeReferenceA?.toString();

      if (fareNameA.includes('+')) {
        const [name, increment] = fareNameA.split('+');
        fareNameA = name.trim();
        incrementValueA = increment.trim();
      }

      const queryFareTypeA = `
        SELECT idTypeFare
        FROM TB_TypeFares
        WHERE typeFare = @fareNameA
      `;
      const requestFareTypeA = db.request();
      requestFareTypeA.input('fareNameA', fareNameA);
      const resultFareTypeA = await requestFareTypeA.query(queryFareTypeA);

      if (!resultFareTypeA.recordset || resultFareTypeA.recordset.length === 0) {
        console.error(`No se encontró el idTypeFare para el nombre de tarifa: ${fareNameA}`);
        continue;
      }

      const idTypeFareA = resultFareTypeA.recordset[0].idTypeFare;

      let fareNameH = idTypeFareReferenceH?.toString();
      let incrementValueH = incrementTypeReferenceH?.toString();

      if (fareNameH && fareNameH.includes('+')) {
        const [name, increment] = fareNameH.split('+');
        fareNameH = name.trim();
        incrementValueH = increment.trim();
      }

      let idTypeFareH: number | null = null;
      if (fareNameH) {
        const queryFareTypeH = `
          SELECT idTypeFare
          FROM TB_TypeFares
          WHERE typeFare = @fareNameH
        `;
        const requestFareTypeH = db.request();
        requestFareTypeH.input('fareNameH', fareNameH);
        const resultFareTypeH = await requestFareTypeH.query(queryFareTypeH);

        if (resultFareTypeH.recordset && resultFareTypeH.recordset.length > 0) {
          idTypeFareH = resultFareTypeH.recordset[0].idTypeFare;
        } else {
          console.error(`No se encontró el idTypeFare para el nombre de tarifa: ${fareNameH}`);
          continue;
        }
      }

      const queryInsert = `
        INSERT INTO [dbo].[TB_NegotiationTabCupsColmedica]
        (
          id_NegotiationTabColmedica, codigoCups, codigoIPS, codigoISS, contratado, idTypeFareReferenceA, Iss2001uvrUvrOTarifa, fareGamaAltaA,
          fareGamaHumanaA, fareGamaMediaA, fareGamaMenorA, farePreferencialA, idTypeFareReferenceH,
          fareGamaAltaH, fareGamaHumanaH, fareGamaMediaH, fareGamaMenorH, farePreferencialH,
          idMedicalAct, idSpeciality, incrementTypeReferenceA, incrementTypeReferenceH
        )
        OUTPUT inserted.*
        VALUES
        (
          @id_NegotiationTabColmedica,@codigoCups, @codigoIPS, @codigoISS, @contratado, @idTypeFareReferenceA, @Iss2001uvrUvrOTarifa, @fareGamaAltaA,
          @fareGamaHumanaA, @fareGamaMediaA, @fareGamaMenorA, @farePreferencialA, @idTypeFareReferenceH,
          @fareGamaAltaH, @fareGamaHumanaH, @fareGamaMediaH, @fareGamaMenorH, @farePreferencialH,
          @idMedicalAct, @idSpeciality, @incrementValueA, @incrementValueH
        );
      `;

      const requestInsert = db.request();
      requestInsert.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);
      requestInsert.input('codigoCups', codigoCups);
      requestInsert.input('codigoIPS', codigoIPS);
      requestInsert.input('codigoISS', codigoISS);
      requestInsert.input('contratado', 1);
      requestInsert.input('idTypeFareReferenceA', idTypeFareA);
      requestInsert.input('Iss2001uvrUvrOTarifa', Iss2001uvrUvrOTarifa);
      requestInsert.input('fareGamaAltaA', fareGamaAltaA);
      requestInsert.input('fareGamaHumanaA', fareGamaHumanaA);
      requestInsert.input('fareGamaMediaA', fareGamaMediaA);
      requestInsert.input('fareGamaMenorA', fareGamaMenorA);
      requestInsert.input('farePreferencialA', farePreferencialA);
      requestInsert.input('idTypeFareReferenceH', idTypeFareH);
      requestInsert.input('fareGamaAltaH', fareGamaAltaH);
      requestInsert.input('fareGamaHumanaH', fareGamaHumanaH);
      requestInsert.input('fareGamaMediaH', fareGamaMediaH);
      requestInsert.input('fareGamaMenorH', fareGamaMenorH);
      requestInsert.input('farePreferencialH', farePreferencialH);
      requestInsert.input('idMedicalAct', idMedicalAct);
      requestInsert.input('idSpeciality', idSpeciality);
      requestInsert.input('incrementValueA', incrementValueA);
      requestInsert.input('incrementValueH', incrementValueH);

      const resultInsert = await requestInsert.query(queryInsert);

      if (!resultInsert.recordset || resultInsert.recordset.length === 0) {
        console.error(`Failed to insert the record for codigoCups: ${codigoCups}`);
        continue;
      }

      insertedRecords.push(resultInsert.recordset[0]);
    }

    if (insertedRecords.length === 0) {
      return {
        code: 400,
        message: "No se pudo insertar ningún registro.",
      };
    }

    return {
      code: 200,
      message: "ok",
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("Error in postLoadFileNegotiationColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "postLoadFileNegotiationColmedica" },
      },
    };
  }
};

