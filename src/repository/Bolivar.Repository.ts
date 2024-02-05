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

export const getCities = async (requestData: CitiesRepositoryService) => {
    try {
        const db = await connectToSqlServer();
        const { idDepartament } = requestData;
        let queryCities = `SELECT DISTINCT op.idCity, c.city, op.idDepartament FROM TB_CategoryClasificationSpecialityAccesPlanPriorizationOffice AS opp
            INNER JOIN TB_OfficeProvider AS op ON op.idOfficeProvider = opp.idOfficeProvider
            INNER JOIN TB_City AS c ON c.idCity = op.idCity
            INNER JOIN TB_OfficeProviderClientHoneSolution AS opc ON opc.idOfficeProvider = opp.idOfficeProvider
            INNER JOIN TB_Roles AS r ON r.idClientHoneSolutions = opc.idClientHoneSolutions
            WHERE r.idRoles = 9 AND opp.idPublicationPrioritizacion != 5`;

        if (requestData.idDepartament !== undefined && requestData.idDepartament !== '') {
            queryCities = queryCities + ` AND c.idDepartament=${requestData.idDepartament}`;
        }

        const orderQuery = queryCities + ' ORDER BY c.city';

        const cities: any = await db?.request().query(orderQuery);

        const queryCitiesEmpty = cities[0];
        console.log(cities?.recordset);

        if (queryCitiesEmpty && Object.keys(queryCitiesEmpty).length === 0) {
            return {
                code: 204,
                message: { translationKey: "bolivar.emptyResponse", translationParams: {idDepartament} },
            };
        } else {
            console.log('OK');
            return {
                code: 200,
                message: { translationKey: "bolivar.succesfull" },
                data: {prueba: "OK"}
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
