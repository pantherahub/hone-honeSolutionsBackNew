"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const getDepartments: RequestHandler = async (req, res) => {
//     try {
//         let basic_query: string =
//         `
//         SELECT DISTINCT 
//             td.idDepartament,
//             td.departament
//         FROM TB_OfficeProvider topr
//             LEFT JOIN TB_Department td on topr.idDepartament = td.idDepartament
//             LEFT JOIN TB_OfficeProviderClientHoneSolution AS toc
//                       ON toc.idOfficeProvider = topr.idOfficeProvider
//             LEFT JOIN TB_ClientHoneSolutions AS tch
//                       ON tch.idClientHoneSolutions = toc.idClientHoneSolutions
//         WHERE tch.idClientHoneSolutions = 5
//             `;
//             const data = await queryBuilder.query(basic_query);
//             const rows = data[0];
//             const total = data[1];
//             if(Object.keys(rows).length===0){
//               return res.status(204).json({
//                 msg: 'No se encontraron más resultados',
//               });
//             }else{
//               return res.status(200).json(rows);
//             }
//     } catch (error) {
//         return res.status(500).json({msg: 'Lo sentimos hubo un error en el servidor'})
//     }
// }
//# sourceMappingURL=Bolivar.Controller.js.map