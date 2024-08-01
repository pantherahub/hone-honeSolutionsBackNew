import { connectToSqlServer } from "../DB/config"
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
  INegotiationTabServiceColmedica,
  ISaveNegotiationTabFareBaseColmedica,
  IUpdateNegotiationTabServiceColmedica,
  ILogicNegotiationTabCupsColmedica
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


export const saveLogicNegotiationTabCupsColmedica = async (
  negotiationTabColmedica: ILogicNegotiationTabCupsColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { id_NegotiationTabColmedica } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    // Inserción de datos
    const insertQuery = `
      INSERT INTO [TB_NegotiationTabCupsColmedica] 
      SELECT
        8, ts.idSpeciality, ma.idMedicalAct, ntti.idTypeIncrement, ma.code, ma.code, ma.code, 1, '',
        ntb.idTypeFareGamaAltaU,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareGamaAltaOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaAltaA,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareHumanOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaHumanaA,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareGamaMediaOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMediaA,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareGamaMenorOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMenorA,
        CAST(REPLACE((fs.fare + ((1 + (ntb.farePreferenciaOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaPreferencialA,
        ntb.idTypeFareGamaAltaU,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareGamaAltaOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaAltaH,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareHumanOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaHumanaH,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareGamaMediaOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMediaH,
        CAST(REPLACE((fs.fare + ((1 + (ntb.fareGamaMenorOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMenorH,
        CAST(REPLACE((fs.fare + ((1 + (ntb.farePreferenciaOperation) / 100) + (1 + (fs.fare) / 100) / 100) * fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaPreferencialH
      FROM TB_NegotiationTabServiceColmedica AS ntb
      INNER JOIN TB_Speciality AS ts ON ntb.idSpeciality = ts.idSpeciality
      INNER JOIN TB_MedicalAct AS ma ON ma.idSpeciality = ts.idSpeciality
      INNER JOIN TB_FareSoat AS fs ON fs.idMedicalAct = ma.idMedicalAct
      INNER JOIN TB_NegotiationTabTypeIncrement AS ntti ON ntti.id_NegotiationTabColmedica = ntti.id_NegotiationTabColmedica
      INNER JOIN TB_ClasificationTypeServiceSpeciality AS cts ON cts.idSpeciality = ts.idSpeciality
      INNER JOIN TB_ClasificationTypeService AS ct ON ct.idClasificationTypeService = cts.idClasificationTypeService
      WHERE ntb.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);

    await request.query(insertQuery);

    const selectQuery = `
      SELECT * 
      FROM [TB_NegotiationTabCupsColmedica] 
      WHERE id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const result = await request.query(selectQuery);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Failed to retrieve the inserted record");
    }

    const insertedRecord = result.recordset[0];

    return {
      code: 200,
      message: "ok",
      data: insertedRecord,
    };
  } catch (err: any) {
    console.error("Error in saveLogicNegotiationTabCupsColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "saveLogicNegotiationTabCupsColmedica" },
      },
    };
  }
};


export const saveNegotiationTabServiceColmedicaColmedica = async (
  negotiationTabColmedica: INegotiationTabServiceColmedica
): Promise<IresponseRepositoryService> => {
  try {

    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryPlans = `
  INSERT INTO [dbo].[TB_NegotiationTabServiceColmedica]
           ([id_NegotiationTabColmedica]
           ,[idSpeciality]
           ,[idTypeService]
           ,[idTypeFareGamaAltaU]
           ,[fareGamaAltaOperation]
           ,[idTypeFareGamaAltaD]
           ,[idTypeFareHumanAltaU]
           ,[fareHumanOperation]
           ,[idTypeFareHumanD]
           ,[idTypeFareGamaMediaU]
           ,[fareGamaMediaOperation] 
           ,[idTypeFareGamaMediaD]
           ,[idTypeFareGamaMenorU]
           ,[fareGamaMenorOperation]
           ,[idTypeFareGamaMenorD]
           ,[idTypeFarePreferencialU]
           ,[farePreferenciaOperation]
           ,[idTypeFarePreferenciaD])
     OUTPUT inserted.*
     VALUES
           (@id_NegotiationTabColmedica,
           @idSpeciality,
           @idTypeService,
           @idTypeFareGamaAltaU,
           @fareGamaAltaOperation,
           @idTypeFareGamaAltaD,
           @idTypeFareHumanAltaU,
           @fareHumanOperation,
           @idTypeFareHumanD,
           @idTypeFareGamaMediaU,
           @fareGamaMediaOperation,
           @idTypeFareGamaMediaD,
           @idTypeFareGamaMenorU,
           @fareGamaMenorOperation,
           @idTypeFareGamaMenorD,
           @idTypeFarePreferencialU,
           @farePreferenciaOperation,
           @idTypeFarePreferenciaD)
  `;

    const request = db.request();
    request.input("id_NegotiationTabColmedica", negotiationTabColmedica.id_NegotiationTabColmedica);
    request.input("idSpeciality", negotiationTabColmedica.idSpeciality);
    request.input("idTypeService", negotiationTabColmedica.idTypeService);
    request.input("idTypeFareGamaAltaU", negotiationTabColmedica.idTypeFareGamaAltaU);
    request.input("fareGamaAltaOperation", negotiationTabColmedica.fareGamaAltaOperation);
    request.input("idTypeFareGamaAltaD", negotiationTabColmedica.idTypeFareGamaAltaD);
    request.input("idTypeFareHumanAltaU", negotiationTabColmedica.idTypeFareHumanAltaU);
    request.input("fareHumanOperation", negotiationTabColmedica.fareHumanOperation);
    request.input("idTypeFareHumanD", negotiationTabColmedica.idTypeFareHumanD);
    request.input("idTypeFareGamaMediaU", negotiationTabColmedica.idTypeFareGamaMediaU);
    request.input("fareGamaMediaOperation", negotiationTabColmedica.fareGamaMediaOperation);
    request.input("idTypeFareGamaMediaD", negotiationTabColmedica.idTypeFareGamaMediaD);
    request.input("idTypeFareGamaMenorU", negotiationTabColmedica.idTypeFareGamaMenorU);
    request.input("fareGamaMenorOperation", negotiationTabColmedica.fareGamaMenorOperation);
    request.input("idTypeFareGamaMenorD", negotiationTabColmedica.idTypeFareGamaMenorD);
    request.input("idTypeFarePreferencialU", negotiationTabColmedica.idTypeFarePreferencialU);
    request.input("farePreferenciaOperation", negotiationTabColmedica.farePreferenciaOperation);
    request.input("idTypeFarePreferenciaD", negotiationTabColmedica.idTypeFarePreferenciaD);

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


export const saveNegotiationTabFareBaseColmedica = async (
  negotiationTabColmedica: ISaveNegotiationTabFareBaseColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { idNegotiationTabColmedica, idTypeFare } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryPlans = `
      INSERT INTO [dbo].[TB_NegotiationTabFareBaseColmedica]
        ([idNegotiationTabColmedica]
        ,[idTypeFare])
      OUTPUT inserted.*
      VALUES
        (@idNegotiationTabColmedica,
         @idTypeFare)
    `;

    const insertedRecords = [];

    for (const fare of idTypeFare) {
      const request = db.request();
      request.input("idNegotiationTabColmedica", idNegotiationTabColmedica);
      request.input("idTypeFare", fare);

      const result = await request.query(queryPlans);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error("Failed to insert and retrieve the record");
      }

      insertedRecords.push(result.recordset[0]);
    }

    return {
      code: 200,
      message: "ok",
      data: insertedRecords,
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

    const insertedRecords = [];

    for (let i = 0; i < idTypeService.length; i++) {
      const typeService = idTypeService[i];
      const plansForService = idPlan[i];

      for (const plan of plansForService) {
        const request = db.request();
        request.input("idNegotiationTabColmedica", idNegotiationTabColmedica);
        request.input("idPlan", plan);
        request.input("idTypeService", typeService);

        const result = await request.query(queryPlans);

        if (!result.recordset || result.recordset.length === 0) {
          throw new Error("Failed to insert and retrieve the record");
        }

        insertedRecords.push(result.recordset[0]);
      }
    }

    return {
      code: 200,
      message: "ok",
      data: insertedRecords,
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

    const insertedRecords = [];

    for (let i = 0; i < idTypeRendom.length; i++) {
      const typeRendom = idTypeRendom[i];
      const servicesForRendom = idTypeService[i];

      for (const service of servicesForRendom) {
        const request = db.request();
        request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
        request.input("idTypeRendom", typeRendom);
        request.input("idTypeService", service);

        const result = await request.query(queryPlans);

        if (!result.recordset || result.recordset.length === 0) {
          throw new Error("Failed to insert and retrieve the record");
        }

        insertedRecords.push(result.recordset[0]);
      }
    }

    return {
      code: 200,
      message: "ok",
      data: insertedRecords,
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
    const { id_NegotiationTabColmedica, idTypeIncrement, valueIncrement } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryIncrements = `
      INSERT INTO [dbo].[TB_NegotiationTabTypeIncrement]
        ([id_NegotiationTabColmedica]
        ,[idTypeIncrement]
        ,[valueIncrement])
      OUTPUT inserted.*
      VALUES
        (@id_NegotiationTabColmedica
        ,@idTypeIncrement
        ,@valueIncrement)
    `;

    const insertedRecords = [];

    for (let i = 0; i < idTypeIncrement.length; i++) {
      const typeIncrement = idTypeIncrement[i];
      const incrementValue = valueIncrement[i];

      const request = db.request();
      request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
      request.input("idTypeIncrement", typeIncrement);
      request.input("valueIncrement", incrementValue);

      const result = await request.query(queryIncrements);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error("Failed to insert and retrieve the record");
      }

      insertedRecords.push(result.recordset[0]);
    }

    return {
      code: 200,
      message: "ok",
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("Error in saveNegotiationTabTypeIncrementColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "saveNegotiationTabTypeIncrementColmedica" },
      },
    };
  }
};

export const updateNegotiationTabServiceColmedica = async (
  negotiationTabColmedica: Partial<IUpdateNegotiationTabServiceColmedica>
): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    if (!negotiationTabColmedica.idNegotiationTabServiceColmedica) {
      throw new Error("idNegotiationTabServiceColmedica is required for update");
    }

    let queryUpdate = `
      UPDATE [dbo].[TB_NegotiationTabServiceColmedica]
      SET `;
    const updates: string[] = [];
    const params: { [key: string]: any } = {};

    // Construye dinámicamente los campos a actualizar
    for (const key in negotiationTabColmedica) {
      if (key !== "idNegotiationTabServiceColmedica") {
        updates.push(`[${key}] = @${key}`);
        params[key] = (negotiationTabColmedica as any)[key];
      }
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    queryUpdate += updates.join(", ") + `
      WHERE [idNegotiationTabServiceColmedica] = @idNegotiationTabServiceColmedica
      SELECT * FROM [dbo].[TB_NegotiationTabServiceColmedica]
      WHERE [idNegotiationTabServiceColmedica] = @idNegotiationTabServiceColmedica
    `;

    const request = db.request();
    request.input("idNegotiationTabServiceColmedica", negotiationTabColmedica.idNegotiationTabServiceColmedica);

    // Añade los parámetros dinámicamente
    for (const param in params) {
      request.input(param, params[param]);
    }

    const result = await request.query(queryUpdate);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Failed to update and retrieve the record");
    }

    const updatedRecord = result.recordset[0];

    return {
      code: 200,
      message: "ok",
      data: updatedRecord,
    };
  } catch (err: any) {
    console.error("Error in updateNegotiationTabServiceColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "updateNegotiationTabServiceColmedica" },
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



export const getTypeServiceColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    SELECT * FROM TB_TypeService WHERE idTypeService != 3
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


export const getReferenceRateColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    	SELECT idTypeFare,typeFare  FROM TB_TypeFares
	 --select ntf.idTypeFare,typeFare from TB_NegotiationTabFareBaseColmedica as ntf
   --inner join TB_TypeFares as tf on tf.idTypeFare = ntf.idTypeFare
   --where idNegotiationTabColmedica =
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

export const getNegotiationTabColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    SELECT 
    offi.OfficeProviderName,
    pr.Product,
    ne.dateBegin,
    ne.dateEnd,
    CASE 
        WHEN ne.dateEnd < GETDATE() THEN 'vencida'
        ELSE 'vigente'
    END AS Estado
    FROM 
        TB_NegotiationTabColmedica AS ne
    INNER JOIN 
        TB_OfficeProvider AS offi ON offi.idOfficeProvider = ne.idOfficeProvider
    INNER JOIN 
        TB_Product AS pr ON pr.idProduct = ne.idProduct;
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



export const getServicesColmedica = async (idClasificationTypeService: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
      SELECT sp.speciality,sp.idSpeciality FROM TB_ClasificationTypeService AS cls
      INNER JOIN TB_ClasificationTypeServiceSpeciality AS cl ON cl.idClasificationTypeService = cls.idClasificationTypeService
      INNER JOIN TB_ClasificationTypeServiceClientHoneSolutions AS ct ON cls.idClasificationTypeService = ct.idClasificationTypeService
      INNER JOIN TB_Speciality AS sp ON sp.idSpeciality = cl.idSpeciality
      --WHERE sp.speciality IS NOT NULL AND ct.idClientHoneSolutions = 9 AND cls.idClasificationTypeService = 18 
      WHERE cls.idClasificationTypeService = @idClasificationTypeService
    `;

    const inputIdClasificationTypeService = idClasificationTypeService !== undefined ? idClasificationTypeService : null;

    const request = db.request();
    request.input('idClasificationTypeService', inputIdClasificationTypeService);

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


export const getInfoLogicColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    select ct.clasificationTypeService as 'AGRUPADOR',s.speciality as 'SUBAGRUPADOR', ntcc.codigoCups,ntcc.codigoIPS,ntcc.codigoISS,ma.medicalAct as 'DESCRIPCIÓN CUPS', contratado, Iss2001uvrUvrOTarifa,
    ti.TypeIncrement,ntti.valueIncrement,tf.typeFare,fareGamaAltaA,fareGamaHumanaA,fareGamaMediaA,fareGamaMenorA,farePreferencialA
    ,tfd.typeFare,fareGamaAltaA,fareGamaHumanaA,fareGamaMediaA,fareGamaMenorA,farePreferencialA
    from TB_NegotiationTabCupsColmedica as ntcc
    inner join TB_NegotiationTabTypeIncrement as ntti on ntti.id_NegotiationTabColmedica = ntcc.id_NegotiationTabColmedica
    inner join TB_Speciality as s on ntcc.idSpeciality = ntcc.idSpeciality
    inner join TB_MedicalAct as ma on ma.idSpeciality = s.idSpeciality
    inner join TB_TypeIncrement as ti on ti.idTypeIncrement = ntti.idTypeIncrement
    inner join TB_TypeFares as tf on tf.idTypeFare = idTypeFareReferenceA
    inner join TB_TypeFares as tfd on tfd.idTypeFare = idTypeFareReferenceH
    inner join TB_ClasificationTypeServiceSpeciality as cts on cts.idSpeciality = s.idSpeciality
    inner join TB_ClasificationTypeService as ct on ct.idClasificationTypeService = cts.idClasificationTypeService
    where ntcc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const inputIdNegotiationTabColmedica = id_NegotiationTabColmedica !== undefined ? id_NegotiationTabColmedica : null;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', inputIdNegotiationTabColmedica);

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



export const getClasificationTypeServiceColmedica = async (): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
     	SELECT * FROM TB_ClasificationTypeService AS cls
      --LEFT JOIN TB_ClasificationTypeServiceClientHoneSolutions AS ct ON cls.idClasificationTypeService = ct.idClasificationTypeService
      --WHERE idClasificationTypeServiceClientHoneSolutions = 9
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


