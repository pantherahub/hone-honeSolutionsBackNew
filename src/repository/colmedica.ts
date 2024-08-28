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
  IUploadFileColemdica,
  INegotiationTabServiceColmedica,
  ISaveNegotiationTabFareBaseColmedica,
  IUpdateNegotiationTabServiceColmedica,
  ILogicNegotiationTabCupsColmedica,
  IGroupNegotiationColmedica,
  ISpecialityNegotiationColmedica,
  ITypeFareNegotiationColmedica,
  INegotiationColmedica,
  ICodeIpsNegotiationColmedica,
  ICodeCupsNegotiationColmedica,
  ICodeIsssNegotiationColmedica,
  ITypeFareReferenceNegotiationColmedica
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

    const insertQuery = `
      insert into [TB_NegotiationTabCupsColmedica] 
      select  @id_NegotiationTabColmedica,ts.idSpeciality,ma.idMedicalAct,'' as idTypeIncrement,ma.code,ma.code,ma.code,1,'',
      ntb.idTypeFareGamaAltaU,
      ntb.fareGamaAltaOperation AS PrecioGamaAltaA
      ,ntb.fareHumanOperation AS PrecioGamaHumanaA
      ,ntb.fareGamaMediaOperation AS PrecioGamaMediaA
      ,ntb.fareGamaMenorOperation AS PrecioGamaMenorA
      ,ntb.farePreferenciaOperation AS PrecioGamaPreferencialA
      ,ntb.idTypeFareGamaAltaU,
      ntb.fareGamaAltaOperation AS PrecioGamaAltaA
      ,ntb.fareHumanOperation AS PrecioGamaHumanaH
      ,ntb.fareGamaMediaOperation AS PrecioGamaMediaH
      ,ntb.fareGamaMenorOperation AS PrecioGamaMenorH
      ,ntb.farePreferenciaOperation AS PrecioGamaPreferencialH
      from TB_NegotiationTabServiceColmedica as ntb
      inner join TB_Speciality as ts on ntb.idSpeciality = ts.idSpeciality
      inner join TB_MedicalAct as ma on ma.idSpeciality = ts.idSpeciality
      inner join TB_ClasificationTypeServiceSpeciality as cts on cts.idSpeciality = ts.idSpeciality
      inner join TB_ClasificationTypeService as ct on ct.idClasificationTypeService = cts.idClasificationTypeService
      where ntb.id_NegotiationTabColmedica = @id_NegotiationTabColmedica and idTypeFareGamaAltaU in (6,18)
    `;

    const insertQuery2 = `
      insert into [TB_NegotiationTabCupsColmedica] 
      select  @id_NegotiationTabColmedica,ts.idSpeciality,ma.idMedicalAct,ntti.idTypeIncrement,ma.code,ma.code,ma.code,1,
      ntb.idTypeFareGamaAltaU,
      CAST(REPLACE((fs.fare + (ntb.fareGamaAltaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaAltaA
      ,CAST(REPLACE((fs.fare + (ntb.fareHumanOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaHumanaA
      ,CAST(REPLACE((fs.fare + (ntb.fareGamaMediaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMediaA
      ,CAST(REPLACE((fs.fare + (ntb.fareGamaMenorOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMenorA
      ,CAST(REPLACE((fs.fare + (ntb.farePreferenciaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaPreferencialA
      ,ntb.idTypeFareGamaAltaU
      ,ntb.idTypeFareGamaAltaU,CAST(REPLACE((fs.fare + (ntb.fareGamaAltaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaAltaA
      ,CAST(REPLACE((fs.fare + (ntb.fareHumanOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaHumanaH
      ,CAST(REPLACE((fs.fare + (ntb.fareGamaMediaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMediaH
      ,CAST(REPLACE((fs.fare + (ntb.fareGamaMenorOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMenorH
      ,CAST(REPLACE((fs.fare + (ntb.farePreferenciaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaPreferencialH
      from TB_NegotiationTabServiceColmedica as ntb
      left join TB_Speciality as ts on ntb.idSpeciality = ts.idSpeciality
      left join TB_MedicalAct as ma on ma.idSpeciality = ts.idSpeciality
      inner join TB_FareSoat  as fs on fs.idMedicalAct = ma.idMedicalAct
      left join TB_NegotiationTabTypeIncrement as ntti on ntti.id_NegotiationTabColmedica = ntb.id_NegotiationTabColmedica
      left join TB_ClasificationTypeServiceSpeciality as cts on cts.idSpeciality = ts.idSpeciality
      left join TB_ClasificationTypeService as ct on ct.idClasificationTypeService = cts.idClasificationTypeService
      where ntb.id_NegotiationTabColmedica = @id_NegotiationTabColmedica and ntti.idTypeIncrement = 1
    `;

    const insertQuery3 = `
 
    insert into [TB_NegotiationTabCupsColmedica] 
    select @id_NegotiationTabColmedica,ts.idSpeciality,ma.idMedicalAct,ntti.idTypeIncrement,ma.code,ma.code,ma.code,1,
    ntb.idTypeFareGamaAltaU,
    CAST(REPLACE((fs.fare + (ntb.fareGamaAltaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaAltaA
    ,CAST(REPLACE((fs.fare + (ntb.fareHumanOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaHumanaA
    ,CAST(REPLACE((fs.fare + (ntb.fareGamaMediaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMediaA
    ,CAST(REPLACE((fs.fare + (ntb.fareGamaMenorOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMenorA
    ,CAST(REPLACE((fs.fare + (ntb.farePreferenciaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaPreferencialA
    ,ntb.idTypeFareGamaAltaU
    ,ntb.idTypeFareGamaAltaU,CAST(REPLACE((fs.fare + (ntb.fareGamaAltaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaAltaA
    ,CAST(REPLACE((fs.fare + (ntb.fareHumanOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaHumanaH
    ,CAST(REPLACE((fs.fare + (ntb.fareGamaMediaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMediaH
    ,CAST(REPLACE((fs.fare + (ntb.fareGamaMenorOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaMenorH
    ,CAST(REPLACE((fs.fare + (ntb.farePreferenciaOperation/100)*fs.fare), ',', '') AS DECIMAL(10, 2)) AS PrecioGamaPreferencialH
    from TB_NegotiationTabServiceColmedica as ntb
    inner join TB_Speciality as ts on ntb.idSpeciality = ts.idSpeciality
    inner join TB_MedicalAct as ma on ma.idSpeciality = ts.idSpeciality
    inner join TB_FareSoat  as fs on fs.idMedicalAct = ma.idMedicalAct
    inner join TB_NegotiationTabTypeIncrement as ntti on ntti.id_NegotiationTabColmedica = ntb.id_NegotiationTabColmedica
    inner join TB_ClasificationTypeServiceSpeciality as cts on cts.idSpeciality = ts.idSpeciality
    inner join TB_ClasificationTypeService as ct on ct.idClasificationTypeService = cts.idClasificationTypeService
    where ntb.id_NegotiationTabColmedica = @id_NegotiationTabColmedica and ntti.idTypeIncrement = 2
  `;

    const request = db.request();
    request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);


    await request.query(insertQuery);
    await request.query(insertQuery2);
    await request.query(insertQuery3);



    return {
      code: 200,
      message: "ok",
      data: "ok",
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

    if (!negotiationTabColmedica.id_NegotiationTabColmedica || !negotiationTabColmedica.idSpeciality) {
      throw new Error("id_NegotiationTabColmedica and idSpeciality are required for update");
    }

    console.log("Received fields for update:", negotiationTabColmedica);

    let queryUpdate = `
      UPDATE [dbo].[TB_NegotiationTabServiceColmedica]
      SET `;
    const updates: string[] = [];
    const params: { [key: string]: any } = {};

    // Construye dinámicamente los campos a actualizar
    for (const key in negotiationTabColmedica) {
      if (key !== "id_NegotiationTabColmedica" && key !== "idSpeciality") {
        updates.push(`[${key}] = @${key}`);
        params[key] = (negotiationTabColmedica as any)[key];
      }
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    queryUpdate += updates.join(", ") + `
      WHERE [id_NegotiationTabColmedica] = @id_NegotiationTabColmedica
      AND [idSpeciality] = @idSpeciality
      SELECT * FROM [dbo].[TB_NegotiationTabServiceColmedica]
      WHERE [id_NegotiationTabColmedica] = @id_NegotiationTabColmedica
      AND [idSpeciality] = @idSpeciality
    `;

    const request = db.request();
    request.input("id_NegotiationTabColmedica", negotiationTabColmedica.id_NegotiationTabColmedica);
    request.input("idSpeciality", negotiationTabColmedica.idSpeciality);

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


export const updateNegotiationTabColmedica = async (
  id: number,
  negotiationTabColmedica: Partial<INegotiationTabColmedica>
): Promise<IresponseRepositoryService> => {
  try {
    const { idOfficeProvider, idProduct, dateBegin, idContactsProvider, dateEnd } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    // Verificar si hay algún campo para actualizar
    if (!idOfficeProvider && !idProduct && !dateBegin && !idContactsProvider && !dateEnd) {
      return {
        code: 400,
        message: "No fields to update",
        data: null,
      };
    }

    const request = db.request();
    request.input("id_NegotiationTabColmedica", id);

    // Construir la consulta dinámica de actualización
    let updateQuery = `
      UPDATE [dbo].[TB_NegotiationTabColmedica]
      SET `;

    if (idOfficeProvider !== undefined) {
      updateQuery += "idOfficeProvider = @idOfficeProvider, ";
      request.input("idOfficeProvider", idOfficeProvider);
    }

    if (idProduct !== undefined) {
      updateQuery += "idProduct = @idProduct, ";
      request.input("idProduct", idProduct);
    }

    if (dateBegin !== undefined) {
      updateQuery += "dateBegin = @dateBegin, ";
      request.input("dateBegin", dateBegin);
    }

    if (dateEnd !== undefined) {
      updateQuery += "dateEnd = @dateEnd, ";
      request.input("dateEnd", dateEnd);
    }

    if (idContactsProvider !== undefined) {
      updateQuery += "idContactsProvider = @idContactsProvider, ";
      request.input("idContactsProvider", idContactsProvider);
    }

    // Eliminar la última coma y agregar la condición WHERE
    updateQuery = updateQuery.slice(0, -2); // Remover la coma final
    updateQuery += " WHERE id_NegotiationTabColmedica = @id_NegotiationTabColmedica";

    // Ejecutar la consulta de actualización
    const result = await request.query(updateQuery);

    if (result.rowsAffected[0] === 0) {
      return {
        code: 404,
        message: "No record found to update",
        data: null,
      };
    }
    return {
      code: 200,
      message: "Update successful",
      data: negotiationTabColmedica,
    };
  } catch (err: any) {
    console.error("Error in updateNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "updateNegotiationTabColmedica" },
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
    select distinct p.idProvider,p.razonSocial + ' ' + identificacion as razonSocial from TB_Provider as p
    inner join TB_OfficeProvider as op on op.idProvider = p.idProvider
    inner join TB_OfficeProviderClientHoneSolution as opch on opch.idOfficeProvider = op.idOfficeProvider
    where idClientHoneSolutions = 9 AND @idProvider IS NULL OR op.idProvider = @idProvider;
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


export const getInfoOfficeProvider = async (idProvider: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    select distinct op.idOfficeProvider,op.OfficeProviderName as clientColmedica from TB_Provider as p
    inner join TB_OfficeProvider as op on op.idProvider = p.idProvider
    inner join TB_OfficeProviderClientHoneSolution as opch on opch.idOfficeProvider = op.idOfficeProvider
    where idClientHoneSolutions = 9 and p.idProvider = @idProvider;
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
    console.error("Error in getInfoOfficeProvider", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getInfoOfficeProvider" },
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
     select distinct idOfficeProvider,o.razonSocial,op.OfficeProviderName,td.typeDocument,o.identificacion,d.departament,c.city,
     op.address  from TB_OfficeProvider as op
     inner join TB_Provider as o on o.idProvider = op.idProvider
     inner join TB_typeDocument as td on td.idTypeDocument = o.idTypeDocument
     inner join TB_Department as d on op.idDepartament = d.idDepartament 
     inner join TB_City as c on c.idCity = op.idCity
     inner join TB_ContactsProvider as cp on cp.idProvider = o.idProvider
     where op.idOfficeProvider =  ISNULL(@idOfficeProvider,op.idOfficeProvider)
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
	  ne.id_NegotiationTabColmedica,
	  ne.idOfficeProvider,
	  offi.idProvider,
    offi.OfficeProviderName,
	  cp.idContactsProvider,
    pr.Product,
	  pr.idProduct,
    ne.dateBegin,
    ne.dateEnd,
    CASE 
        WHEN ne.dateEnd < GETDATE() THEN 'vencida'
        ELSE 'vigente'
    END AS Estado
    FROM 
        TB_NegotiationTabColmedica AS ne
    LEFT JOIN 
        TB_OfficeProvider AS offi ON offi.idOfficeProvider = ne.idOfficeProvider
    LEFT JOIN 
        TB_Product AS pr ON pr.idProduct = ne.idProduct
    LEFT JOIN 
        TB_ContactsProvider AS cp ON cp.idProvider = offi.idProvider
    ORDER BY ne.idProduct DESC
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


export const getNegotiationDetails = async (id: number): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const request = db.request();

    // Consulta 1: Obtener la información principal de la negociación
    const queryNegotiation = `
      SELECT
      ne.id_NegotiationTabColmedica,
      ne.idOfficeProvider,
      offi.idProvider,
      offi.OfficeProviderName,
      cp.idContactsProvider,
      pr.Product,
      pr.idProduct,
      ne.dateBegin,
      ne.dateEnd,
      CASE 
        WHEN ne.dateEnd < GETDATE() THEN 'vencida'
        ELSE 'vigente'
      END AS Estado
      FROM 
          TB_NegotiationTabColmedica AS ne
      LEFT JOIN 
          TB_OfficeProvider AS offi ON offi.idOfficeProvider = ne.idOfficeProvider
      LEFT JOIN 
          TB_Product AS pr ON pr.idProduct = ne.idProduct
      LEFT JOIN 
          TB_ContactsProvider AS cp ON cp.idProvider = offi.idProvider
      WHERE 
        ne.id_NegotiationTabColmedica = @id`;

    // Consulta 2: Obtener los planes
    const queryPlans = `
    SELECT idNegotiationTabPlansColmedica,	idNegotiationTabColmedica,nt.idPlan,idTypeService,pl.[plan] AS namePlan
    FROM TB_NegotiationTabPlansColmedica AS nt
    LEFT JOIN TB_Plans AS pl ON pl.idPlan = nt.idPlan
    WHERE idNegotiationTabColmedica = @id`;

    // Consulta 3: Obtener las tarifas base
    const queryFareBase = `
    SELECT * 
    FROM TB_NegotiationTabFareBaseColmedica 
    WHERE idNegotiationTabColmedica = @id`;

    // Consulta 4: Obtener los rendimientos
    const queryRendom = `
    SELECT * 
    FROM TB_NegotiationTabRendomColmedica 
    WHERE id_NegotiationTabColmedica = @id`;

    // Consulta 5: Obtener el tipo de incremento
    const queryTypeIncrement = `
    SELECT * 
    FROM TB_NegotiationTabTypeIncrement 
    WHERE id_NegotiationTabColmedica = @id`;

    // Ejecutar las consultas
    request.input('id', id);

    const [negotiationResult, plansResult, fareBaseResult, rendomResult, typeIncrementResult] = await Promise.all([
      request.query(queryNegotiation),
      request.query(queryPlans),
      request.query(queryFareBase),
      request.query(queryRendom),
      request.query(queryTypeIncrement)
    ]);

    const negotiationData = negotiationResult.recordset[0];
    const plansData = plansResult.recordset;
    const fareBaseData = fareBaseResult.recordset;
    const rendomData = rendomResult.recordset;
    const typeIncrementData = typeIncrementResult.recordset;

    const response = {
      negotiation: negotiationData,
      plans: plansData,
      fareBase: fareBaseData,
      rendom: rendomData,
      typeIncrement: typeIncrementData,
    };

    return {
      code: 200,
      message: "ok",
      data: response,
    };
  } catch (err: any) {
    console.error("Error in getNegotiationDetails", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getNegotiationDetails" },
      },
    };
  }
};

export const updateNegotiationTabPlansColmedica = async (
  idNegotiationTabColmedica: number,
  updates: {
    idPlan: number[][];
    idTypeService: number[];
  }
): Promise<IresponseRepositoryService> => {
  try {
    const { idPlan, idTypeService } = updates;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    // Verificar si hay campos para actualizar
    if (!idPlan || !idTypeService) {
      return {
        code: 400,
        message: "No fields to update",
        data: null,
      };
    }

    // Eliminar registros existentes para el idNegotiationTabColmedica
    const queryDelete = `
      DELETE FROM [dbo].[TB_NegotiationTabPlansColmedica]
      WHERE idNegotiationTabColmedica = @idNegotiationTabColmedica;
    `;

    const deleteRequest = db.request();
    deleteRequest.input("idNegotiationTabColmedica", idNegotiationTabColmedica);

    await deleteRequest.query(queryDelete);

    // Variables para construir la consulta de inserción
    const insertedRecords = [];
    const queryInsert = `
      INSERT INTO [dbo].[TB_NegotiationTabPlansColmedica]
        ([idNegotiationTabColmedica], [idPlan], [idTypeService])
      OUTPUT inserted.*
      VALUES (@idNegotiationTabColmedica, @idPlan, @idTypeService);
    `;

    // Insertar nuevos registros
    for (let i = 0; i < idTypeService.length; i++) {
      const typeService = idTypeService[i];
      const plansForService = idPlan[i] || [];

      for (const plan of plansForService) {
        const insertRequest = db.request(); // Crear una nueva solicitud para cada inserción
        insertRequest.input("idNegotiationTabColmedica", idNegotiationTabColmedica);
        insertRequest.input("idPlan", plan);
        insertRequest.input("idTypeService", typeService);

        const result = await insertRequest.query(queryInsert);

        if (!result.recordset || result.recordset.length === 0) {
          throw new Error("Failed to insert and retrieve the record");
        }

        insertedRecords.push(result.recordset[0]);
      }
    }

    return {
      code: 200,
      message: "Update successful",
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("Error in updateNegotiationTabPlansColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "updateNegotiationTabPlansColmedica" },
      },
    };
  }
};

export const updateNegotiationTabFareBaseColmedica = async (params: {
  idNegotiationTabColmedica: number;
  idTypeFare: number[];
}): Promise<IresponseRepositoryService> => {
  try {
    const { idNegotiationTabColmedica, idTypeFare } = params;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    // Eliminar registros existentes para el idNegotiationTabColmedica
    const queryDelete = `
      DELETE FROM [dbo].[TB_NegotiationTabFareBaseColmedica]
      WHERE idNegotiationTabColmedica = @idNegotiationTabColmedica;
    `;

    const deleteRequest = db.request();
    deleteRequest.input("idNegotiationTabColmedica", idNegotiationTabColmedica);
    await deleteRequest.query(queryDelete);

    // Insertar nuevos registros
    const insertedRecords = [];
    const queryInsert = `
      INSERT INTO [dbo].[TB_NegotiationTabFareBaseColmedica]
        ([idNegotiationTabColmedica], [idTypeFare])
      OUTPUT inserted.*
      VALUES (@idNegotiationTabColmedica, @idTypeFare);
    `;

    for (const fare of idTypeFare) {
      const insertRequest = db.request();
      insertRequest.input("idNegotiationTabColmedica", idNegotiationTabColmedica);
      insertRequest.input("idTypeFare", fare);

      const result = await insertRequest.query(queryInsert);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error("Failed to insert and retrieve the record");
      }

      insertedRecords.push(result.recordset[0]);
    }

    return {
      code: 200,
      message: "Update successful",
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("Error in updateNegotiationTabFareBaseColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "updateNegotiationTabFareBaseColmedica" },
      },
    };
  }
};

export const updateNegotiationTabRendomColmedica = async (
  negotiationTabColmedica: INegotiationTabRendomColmedica
): Promise<IresponseRepositoryService> => {
  try {
    const { id_NegotiationTabColmedica, idTypeRendom, idTypeService } = negotiationTabColmedica;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    // Eliminar registros existentes para el id_NegotiationTabColmedica
    const queryDelete = `
      DELETE FROM [dbo].[TB_NegotiationTabRendomColmedica]
      WHERE id_NegotiationTabColmedica = @id_NegotiationTabColmedica;
    `;

    const deleteRequest = db.request();
    deleteRequest.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);

    await deleteRequest.query(queryDelete);

    // Insertar nuevos registros
    const insertedRecords = [];
    const queryInsert = `
      INSERT INTO [dbo].[TB_NegotiationTabRendomColmedica]
        ([id_NegotiationTabColmedica], [idTypeRendom], [idTypeService])
      OUTPUT inserted.*
      VALUES (@id_NegotiationTabColmedica, @idTypeRendom, @idTypeService);
    `;

    for (let i = 0; i < idTypeRendom.length; i++) {
      const typeRendom = idTypeRendom[i];
      const servicesForRendom = idTypeService[i];

      for (const service of servicesForRendom) {
        const request = db.request(); // Crear un nuevo objeto de solicitud para cada inserción
        request.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
        request.input("idTypeRendom", typeRendom);
        request.input("idTypeService", service);

        const result = await request.query(queryInsert);

        if (!result.recordset || result.recordset.length === 0) {
          throw new Error("Failed to insert and retrieve the record");
        }

        insertedRecords.push(result.recordset[0]);
      }
    }

    return {
      code: 200,
      message: "Update successful",
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("Error in updateNegotiationTabRendomColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "updateNegotiationTabRendomColmedica" },
      },
    };
  }
};

export const updateNegotiationTabTypeIncrementColmedica = async (
  params: {
    id_NegotiationTabColmedica: number;
    idTypeIncrement: number[];
    valueIncrement: number[];
  }
): Promise<IresponseRepositoryService> => {
  try {
    const { id_NegotiationTabColmedica, idTypeIncrement, valueIncrement } = params;
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    // Eliminar registros existentes para el id_NegotiationTabColmedica
    const queryDelete = `
      DELETE FROM [dbo].[TB_NegotiationTabTypeIncrement]
      WHERE id_NegotiationTabColmedica = @id_NegotiationTabColmedica;
    `;

    const deleteRequest = db.request();
    deleteRequest.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
    await deleteRequest.query(queryDelete);

    // Insertar nuevos registros
    const insertedRecords = [];
    const queryInsert = `
      INSERT INTO [dbo].[TB_NegotiationTabTypeIncrement]
        ([id_NegotiationTabColmedica], [idTypeIncrement], [valueIncrement])
      OUTPUT inserted.*
      VALUES (@id_NegotiationTabColmedica, @idTypeIncrement, @valueIncrement);
    `;

    for (let i = 0; i < idTypeIncrement.length; i++) {
      const typeIncrement = idTypeIncrement[i];
      const incrementValue = valueIncrement[i];

      const insertRequest = db.request(); // Crear un nuevo objeto de solicitud para cada inserción
      insertRequest.input("id_NegotiationTabColmedica", id_NegotiationTabColmedica);
      insertRequest.input("idTypeIncrement", typeIncrement);
      insertRequest.input("valueIncrement", incrementValue);

      const result = await insertRequest.query(queryInsert);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error("Failed to insert and retrieve the record");
      }

      insertedRecords.push(result.recordset[0]);
    }

    return {
      code: 200,
      message: "Update successful",
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("Error in updateNegotiationTabTypeIncrementColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "updateNegotiationTabTypeIncrementColmedica" },
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
  	  select s.idSpeciality,s.speciality,* from TB_ClasificationTypeServiceSpeciality as ct
      inner join TB_Speciality as s on s.idSpeciality = ct.idSpeciality
      inner join TB_SpecialityClientHoneSolutions as sch on sch.idSpeciality = s.idSpeciality
      where ct.idClasificationTypeService = @idClasificationTypeService and sch.idClientHoneSolutions = 9
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
      select ct.clasificationTypeService as 'AGRUPADOR', s.speciality as 'SUBAGRUPADOR', ntcc.codigoCups, ntcc.codigoIPS, ntcc.codigoISS, ma.medicalAct as 'DESCRIPCION CUPS', 
      contratado, Iss2001uvrUvrOTarifa, ti.TypeIncrement, ntti.valueIncrement, tf.typeFare as 'typeFare1', fareGamaAltaA, fareGamaHumanaA, fareGamaMediaA, fareGamaMenorA, farePreferencialA,
      tfd.typeFare as 'typeFare2', fareGamaAltaA as 'fareGamaAltaA2', fareGamaHumanaA as 'fareGamaHumanaA2', fareGamaMediaA as 'fareGamaMediaA2', fareGamaMenorA as 'fareGamaMenorA2', farePreferencialA as 'farePreferencialA2'
      from TB_NegotiationTabCupsColmedica as ntcc
      left join TB_NegotiationTabTypeIncrement as ntti on ntti.id_NegotiationTabColmedica = ntcc.id_NegotiationTabColmedica
      left join TB_Speciality as s on s.idSpeciality = ntcc.idSpeciality
      left join TB_MedicalAct as ma on ma.idSpeciality = s.idSpeciality
      left join TB_TypeIncrement as ti on ti.idTypeIncrement = ntti.idTypeIncrement
      left join TB_TypeFares as tf on tf.idTypeFare = idTypeFareReferenceA
      left join TB_TypeFares as tfd on tfd.idTypeFare = idTypeFareReferenceH
      left join TB_ClasificationTypeServiceSpeciality as cts on cts.idSpeciality = s.idSpeciality
      left join TB_ClasificationTypeService as ct on ct.idClasificationTypeService = cts.idClasificationTypeService
      where ntcc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const inputIdNegotiationTabColmedica = id_NegotiationTabColmedica !== undefined ? id_NegotiationTabColmedica : null;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', inputIdNegotiationTabColmedica);

    const result = await request.query(queryProviders);

    const providers = result.recordset.map(record => ({
      AGRUPADOR: record.AGRUPADOR,
      SUBAGRUPADOR: record.SUBAGRUPADOR,
      codigoCups: record.codigoCups,
      codigoIPS: record.codigoIPS,
      codigoISS: record.codigoISS,
      'DESCRIPCION CUPS': record['DESCRIPCION CUPS'],
      contratado: record.contratado,
      Iss2001uvrUvrOTarifa: record.Iss2001uvrUvrOTarifa,
      TypeIncrement: record.TypeIncrement,
      valueIncrement: record.valueIncrement,
      typeFare1: record.typeFare1,
      fareGamaAltaA: record.fareGamaAltaA,
      fareGamaHumanaA: record.fareGamaHumanaA,
      fareGamaMediaA: record.fareGamaMediaA,
      fareGamaMenorA: record.fareGamaMenorA,
      farePreferencialA: record.farePreferencialA,
      typeFare2: record.typeFare2,
      fareGamaAltaA2: record.fareGamaAltaA2,
      fareGamaHumanaA2: record.fareGamaHumanaA2,
      fareGamaMediaA2: record.fareGamaMediaA2,
      fareGamaMenorA2: record.fareGamaMenorA2,
      farePreferencialA2: record.farePreferencialA2,
    }));

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


export const getInfoLogicTableColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryProviders = `
    select ntb.idNegotiationTabServiceColmedica,clasificationTypeService,ts.speciality,tsd.typeService,
    tfga.typeFare + ' +' + CAST(ntb.fareGamaAltaOperation AS VARCHAR(20)) + '% ' + isnull(tfgad.typeFare,'') as 'TARIFA GAMA ALTA',
    tfh.typeFare + ' +' + CAST(ntb.fareHumanOperation AS VARCHAR(20)) + '% ' + isnull(tfhd.typeFare,'') as 'TARIFA HUMANA (PLUS Y TRADICIONAL)', 
    tfm.typeFare + ' +' + CAST(ntb.fareGamaMediaOperation AS VARCHAR(20)) + '% ' + isnull(tfhd.typeFare,'') as 'TARIFA GAMA MEDIA',
    tfme.typeFare + ' +' + CAST(ntb.fareGamaMenorOperation AS VARCHAR(20)) + '% ' + isnull(tfmed.typeFare,'') as 'TARIFA GAMA MENOR',
    tfp.typeFare + ' +' + CAST(ntb.farePreferenciaOperation AS VARCHAR(20)) + '% ' + isnull(tfpd.typeFare,'') as 'TARIFA PREFERENCIAL' 
    from TB_NegotiationTabServiceColmedica as ntb
    left join TB_Speciality as ts on ntb.idSpeciality = ts.idSpeciality
    left join TB_ClasificationTypeServiceSpeciality as cts on cts.idSpeciality = ts.idSpeciality
    left join TB_ClasificationTypeService as ct on ct.idClasificationTypeService = cts.idClasificationTypeService
    left join TB_TypeService as tsd on tsd.idTypeService = ntb.idTypeService
    left join [TB_TypeFares] as tfga on tfga.idTypeFare = ntb.idTypeFareGamaAltaU
    left join [TB_TypeFares] as tfgad on tfgad.idTypeFare = ntb.idTypeFareGamaAltaD
    left join [TB_TypeFares] as tfh on tfh.idTypeFare = ntb.idTypeFareHumanAltaU
    left join [TB_TypeFares] as tfhd on tfhd.idTypeFare = ntb.idTypeFareHumanD
    left join [TB_TypeFares] as tfm on tfm.idTypeFare = ntb.idTypeFareGamaMediaU
    left join [TB_TypeFares] as tfmd on tfmd.idTypeFare = ntb.idTypeFareGamaMediaD
    left join [TB_TypeFares] as tfme on tfme.idTypeFare = ntb.idTypeFareGamaMenorU
    left join [TB_TypeFares] as tfmed on tfmed.idTypeFare = ntb.idTypeFareGamaMenorD
    left join [TB_TypeFares] as tfp on tfp.idTypeFare = ntb.idTypeFarePreferencialU
    left join [TB_TypeFares] as tfpd on tfpd.idTypeFare = ntb.idTypeFarePreferenciaD
    where id_NegotiationTabColmedica = @id_NegotiationTabColmedica
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
      select cts.idClasificationTypeService,clasificationTypeService from TB_ClasificationTypeService as cts
      inner join TB_ClasificationTypeServiceClientHoneSolutions as ctsch on cts.idClasificationTypeService = ctsch.idClasificationTypeService
      where ctsch.idClientHoneSolutions = 9
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

export const deleteNegotiationTabServiceColmedica = async (idNegotiationTabServiceColmedica: number): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryDelete = `
      DELETE FROM [dbo].[TB_NegotiationTabServiceColmedica]
      WHERE idNegotiationTabServiceColmedica = @idNegotiationTabServiceColmedica;
    `;

    const request = db.request();
    request.input("idNegotiationTabServiceColmedica", idNegotiationTabServiceColmedica);

    const result = await request.query(queryDelete);

    if (result.rowsAffected[0] === 0) {
      throw new Error("No record found to delete");
    }

    return {
      code: 200,
      message: "Deletion successful",
      data: { idNegotiationTabServiceColmedica },
    };
  } catch (err: any) {
    console.error("Error in deleteNegotiationTabServiceColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "deleteNegotiationTabServiceColmedica" },
      },
    };
  }
};

export const getGroupByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryGroup = `
      SELECT DISTINCT cts.idClasificationTypeService, cts.clasificationTypeService 
      FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_Speciality AS s ON s.idSpeciality = ntc.idSpeciality
      INNER JOIN TB_ClasificationTypeServiceSpeciality AS tc ON tc.idSpeciality = s.idSpeciality
      INNER JOIN TB_ClasificationTypeService AS cts ON cts.idClasificationTypeService = tc.idClasificationTypeService
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryGroup);

    const group: IGroupNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: group,
    };
  } catch (err: any) {
    console.error("Error in getgrouperByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getgrouperByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getSpecialityByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const querySpeciality = `
      SELECT DISTINCT s.idSpeciality, s.speciality FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_Speciality AS s ON s.idSpeciality = ntc.idSpeciality
      INNER JOIN TB_ClasificationTypeServiceSpeciality AS tc ON tc.idSpeciality = s.idSpeciality
      INNER JOIN TB_ClasificationTypeService AS cts ON cts.idClasificationTypeService = tc.idClasificationTypeService
      INNER JOIN TB_SpecialityClientHoneSolutions AS schs ON schs.idSpeciality = s.idSpeciality
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica AND schs.idClientHoneSolutions = 9
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(querySpeciality);

    const speciality: ISpecialityNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: speciality,
    };
  } catch (err: any) {
    console.error("Error in getSpecialityByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getSpecialityByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getTypeFareByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryTypeFare = `
      SELECT DISTINCT tf.idTypeFare,tf.typeFare FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryTypeFare);

    const typeFare: ITypeFareNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: typeFare,
    };
  } catch (err: any) {
    console.error("Error in getTypeFareByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getTypeFareByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryNegotiation = `
      SELECT DISTINCT ntc.idNegotiationTabCupsColmedica,
      ntc.id_NegotiationTabColmedica,
      ntc.idSpeciality,
      tbs.speciality,
      tbcs.idClasificationTypeService,
      tbcs.clasificationTypeService,
      ntc.idMedicalAct,
      tbm.medicalAct,
      ntc.idTypeIncrement,
      tbti.TypeIncrement,
      ntc.codigoCups,
      ntc.codigoIPS,
      ntc.codigoISS,
      ntc.contratado,
      ntc.Iss2001uvrUvrOTarifa,
      ntc.idTypeFareReferenceA,
      tf.typeFare AS typeFareA,
      fareGamaAltaA,
      fareGamaHumanaA,
      fareGamaMediaA,
      fareGamaMenorA,
      farePreferencialA,
      idTypeFareReferenceH,
      tf.typeFare AS typeFareH,
      fareGamaAltaH,
      fareGamaHumanaH,
      fareGamaMediaH,
      fareGamaMenorH,
      incrementTypeReferenceA,
      incrementTypeReferenceH,
      typeFare,
      codeFare
      FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      INNER JOIN TB_Speciality AS tbs ON tbs.idSpeciality = ntc.idSpeciality
      INNER JOIN TB_MedicalAct AS tbm ON tbm.idMedicalAct = ntc.idMedicalAct
      INNER JOIN TB_TypeIncrement AS tbti ON tbti.idTypeIncrement = ntc.idTypeIncrement
      INNER JOIN TB_ClasificationTypeServiceSpeciality AS tbctss ON tbctss.idSpeciality = ntc.idSpeciality
      INNER JOIN TB_ClasificationTypeService AS tbcs ON tbcs.idClasificationTypeService = tbctss.idClasificationTypeService
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryNegotiation);

    const negotiation: INegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: negotiation,
    };
  } catch (err: any) {
    console.error("Error in getByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getCodeIpsByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryCodeIps = `
      SELECT DISTINCT codigoIPS FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryCodeIps);

    const codeIps: ICodeIpsNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: codeIps,
    };
  } catch (err: any) {
    console.error("Error in getCodeIpsByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getCodeIpsByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getCodeCupsByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryCodeCups = `
      SELECT DISTINCT codigoCups FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryCodeCups);

    const codeCups: ICodeCupsNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: codeCups,
    };
  } catch (err: any) {
    console.error("Error in getCodeCupsByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getCodeCupsByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getCodeIssByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryCodeIss = `
      SELECT DISTINCT codigoISS FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryCodeIss);

    const codeIss: ICodeIsssNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: codeIss,
    };
  } catch (err: any) {
    console.error("Error in getCodeIssByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getCodeIssByIdNegotiationTabColmedica" },
      },
    };
  }
};

export const getTypeReferenceByIdNegotiationTabColmedica = async (id_NegotiationTabColmedica: string | any | undefined): Promise<IresponseRepositoryService> => {
  try {
    const db = await connectToSqlServer();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const queryFareReference = `
      SELECT DISTINCT tf.idTypeFare , typeFare + ' ' + ISNULL(incrementTypeReferenceA,0) AS fareReference FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
      SELECT DISTINCT tf.idTypeFare , typeFare + ' ' + ISNULL(incrementTypeReferenceH,0) AS fareReference FROM TB_NegotiationTabCupsColmedica AS ntc
      INNER JOIN TB_TypeFares AS tf ON tf.idTypeFare = ntc.idTypeFareReferenceA
      WHERE ntc.id_NegotiationTabColmedica = @id_NegotiationTabColmedica
    `;

    const request = db.request();
    request.input('id_NegotiationTabColmedica', id_NegotiationTabColmedica);

    const result = await request.query(queryFareReference);

    const fareReferences: ITypeFareReferenceNegotiationColmedica[] = result.recordset;

    return {
      code: 200,
      message: "ok",
      data: fareReferences,
    };
  } catch (err: any) {
    console.error("Error in getTypeReferenceByIdNegotiationTabColmedica", err);
    return {
      code: 400,
      message: {
        translationKey: "global.error_in_repository",
        translationParams: { name: "getTypeReferenceByIdNegotiationTabColmedica" },
      },
    };
  }
};