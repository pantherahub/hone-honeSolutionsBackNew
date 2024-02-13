"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExample = exports.createExample = exports.updateExample = exports.findExamples = void 0;
const findExamples = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar datos en la base de datos
        // Manejo de datos
        // Retornar respuesta formato json {code: 200, data: []...}
        return {
            code: 200,
            message: "example.succesfull",
            data: [{ _id: "example" }],
        };
    }
    catch (err) {
        console.log("Err repo findExample", err);
        return {
            code: 400,
            message: { translationKey: "example.errorInRepository", translationParams: { name: "findExample" } },
        };
    }
});
exports.findExamples = findExamples;
const updateExample = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = data;
        // Actualizar example
        return {
            code: 200,
            message: { translationKey: "example.idComposed", translationParams: { _id } },
        };
    }
    catch (err) {
        console.log("Err updateExample", err);
        return {
            code: 400,
            message: { translationKey: "example.errorInRepository", translationParams: { name: "updateExample" } },
        };
    }
});
exports.updateExample = updateExample;
const createExample = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = data;
        // crear example
        return {
            code: 200,
            message: { translationKey: "example.idComposed", translationParams: { _id } },
        };
    }
    catch (err) {
        console.log("Err createExample", err);
        return {
            code: 400,
            message: { translationKey: "example.errorInRepository", translationParams: { name: "createExample" } },
        };
    }
});
exports.createExample = createExample;
const deleteExample = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   Eliminar Exaple por id
        return {
            code: 200,
            message: { translationKey: "example.idComposed", translationParams: { _id } },
        };
    }
    catch (err) {
        console.log("Err deleteExample", err);
        return {
            code: 400,
            message: { translationKey: "example.errorInRepository", translationParams: { name: "deleteExample" } },
        };
    }
});
exports.deleteExample = deleteExample;
//# sourceMappingURL=example.js.map