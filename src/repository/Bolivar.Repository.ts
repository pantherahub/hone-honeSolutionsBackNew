import { connectToSqlServer } from "../DB/config"
import { CitiesRepositoryService } from "../interface/Bolivar.Interface";



export const getDepartments = async () => {
    try {
        const db = await connectToSqlServer();
        const data : any = await db?.request()
        .query(`SELECT DISTINCT 
                    td.idDepartament,
                    td.departament
                FROM TB_OfficeProvider topr
                LEFT JOIN TB_Department td on topr.idDepartament = td.idDepartament
                LEFT JOIN TB_OfficeProviderClientHoneSolution AS toc ON toc.idOfficeProvider = topr.idOfficeProvider
                LEFT JOIN TB_ClientHoneSolutions AS tch ON tch.idClientHoneSolutions = toc.idClientHoneSolutions
                WHERE tch.idClientHoneSolutions = 5`);
        const rows = data[0];
        console.log(data)
        if (rows && Object.keys(rows).length === 0) {
            return {
                code: 204,
                message: { translationKey: "bolivar.emptyResponse" },
            };
        }
        return {
            code: 200,
            message: { translationKey: "bolivar.succesfull"},
            data: data?.recordset
        };
    } catch (err : any) {
        console.log("Error al traer departamentos", err)
        return {
            code: 400,
            message: { translationKey: "bolivar.error_server", translationParams: { name: "getDepartments" }},
        };
    };
}

export const getCities = async ( idDepartament?: number) => {
    try {
        const db = await connectToSqlServer();

        let queryCities = `SELECT DISTINCT op.idCity, c.city, op.idDepartament FROM TB_CategoryClasificationSpecialityAccesPlanPriorizationOffice AS opp
            INNER JOIN TB_OfficeProvider AS op ON op.idOfficeProvider = opp.idOfficeProvider
            INNER JOIN TB_City AS c ON c.idCity = op.idCity
            INNER JOIN TB_OfficeProviderClientHoneSolution AS opc ON opc.idOfficeProvider = opp.idOfficeProvider
            INNER JOIN TB_Roles AS r ON r.idClientHoneSolutions = opc.idClientHoneSolutions
            WHERE r.idRoles = 9 AND opp.idPublicationPrioritizacion != 5`;

        if (idDepartament !== undefined ) {
            queryCities += ` AND op.idDepartament = ${idDepartament}`;
        }

        const orderQuery = queryCities + ' ORDER BY c.city';

        const cities: any = await db?.request().query(orderQuery);

        const queryCitiesEmpty = cities[0];

        if (queryCitiesEmpty && Object.keys(queryCitiesEmpty).length === 0) {
            return {
                code: 204,
                message: { translationKey: "bolivar.emptyResponse" },
            };
        } else {
            return {
                code: 200,
                message: { translationKey: "bolivar.succesfull" },
                data: cities?.recordset
            };
        }
    } catch (err) {
        console.log("Error al traer ciudades", err);
        return {
            code: 400,
            message: { translationKey: "bolivar.error_server", translationParams: { name: "getCities" } },
        };
    }
};

export const getPlans = async ( idCity?: number ) => {
    try {
        const db = await connectToSqlServer();
        let queryPlans = `SELECT DISTINCT p.idPlan,p.[plan] FROM TB_Plans as p
        INNER JOIN TB_CategoryClasificationSpecialityAccesPlanPriorizationOffice AS pap ON pap.idPlan = p.idPlan
        INNER JOIN TB_OfficeProviderClientHoneSolution AS opc ON opc.idOfficeProvider = pap.idOfficeProvider
        INNER JOIN TB_OfficeProvider AS op ON op.idOfficeProvider = opc.idOfficeProvider
        INNER JOIN TB_Roles AS tr ON tr.idClientHoneSolutions=opc.idClientHoneSolutions
        WHERE tr.idRoles=9  AND  pap.idPublicationPrioritizacion != 5`;

    if (idCity !== undefined ) {
        queryPlans += ` AND op.idCity = ${idCity}`;
    }
    const plans: any = await db?.request().query(queryPlans);
        const queryPlansEmpty = plans[0];

        if (queryPlansEmpty && Object.keys(queryPlansEmpty).length === 0) {
            return {
                code: 204,
                message: { translationKey: "bolivar.emptyResponse" },
            };
        } else {
            return {
                code: 200,
                message: { translationKey: "bolivar.succesfull" },
                data: plans?.recordset
            };
        }
    } catch (err) {
        console.log("Error al traer los planes", err);
        return {
            code: 400,
            message: { translationKey: "bolivar.error_server", translationParams: { name: "getPlan" } },
        };      
    }
};

export const getSpecialties = async (idCiudad?: number, idDepartamento?: number, idPlan?: number) => {
    try {
        const db = await connectToSqlServer();
        let querySpeciality = 
        `
        SELECT DISTINCT
        s.idSpeciality,
        s.speciality
        FROM  TB_CategoryClasificationSpecialityAccesPlanPriorizationOffice as css
        inner join TB_OfficeProvider as op on op.idOfficeProvider = css.idOfficeProvider
        inner join TB_Speciality as s on s.idSpeciality = css.idSpeciality
        LEFT JOIN TB_OfficeProviderClientHoneSolution AS tch ON tch.idOfficeProvider = op.idOfficeProvider
        WHERE tch.idClientHoneSolutions = 5 AND css.idPublicationPrioritizacion != 5
      `;
        if (idCiudad !== undefined) {
        querySpeciality += ` AND op.idCity=${idCiudad}`;
        }
        if (idDepartamento !== undefined) {
        querySpeciality += ` AND op.idDepartament=${idDepartamento}`;
        }
        if (idPlan !== undefined) {
        querySpeciality += ` AND css.idPlan=${idPlan}`;
        }
        const orderQuery = querySpeciality + ' ORDER BY s.speciality ASC';
        const speciality: any = await db?.request().query(orderQuery);
        
        if (speciality.recordset.length === 0) {
            return {
                code: 204,
                message: { translationKey: "bolivar.emptyResponse" },
            };
        } else {
            return {
                code: 200,
                message: { translationKey: "bolivar.succesfull" },
                data: speciality?.recordset
            };
        }
    } catch (err) {
        console.log("Error al traer las especialidades", err);
        return {
            code: 400,
            message: { translationKey: "bolivar.error_server", translationParams: { name: "getSpecialties" } },
        }; 
    }
};


