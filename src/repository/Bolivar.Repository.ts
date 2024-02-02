import { connectToSqlServer } from "../DB/config"


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
        if (rows && Object.keys(rows).length === 0) {
            return {
                code: 204,
                message: 'No se encontró información',
            };
        }
        return {
            code: 200,
            message: 'Departments',
            data: data?.recordset
        };
    } catch (err : any) {
        console.log("Error al traer departamentos", err)
        return {
            code: 400,
            message: { translationKey: "users.errorInRepository", translationParams: { name: "getUser" } },
        };
    };
}