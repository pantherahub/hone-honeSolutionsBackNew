export interface ImessageComposed {
    translationKey: string,
    translationParams: object
}

export interface DepartmentsRepositoryService {
    code: number,
    message: string| { translationKey: string },
    data?: any
}

export interface CitiesRepositoryService {
    code: number,
    message: string| { translationKey: string },
    data?: any
}

export interface PlansRepositoryService {
    code: number,
    message: string| { translationKey: string },
    data?: any
}

export interface SpecialitiesRepositoryService {
    code: number,
    message: string| { translationKey: string },
    data?: any
}

export interface dataSpeciality {
    idCiudad?: number, 
    idDepartamento?: number, 
    idPlan?: number
}
export interface IresponseRepositoryService {
    code: number,
    message: string| { translationKey: string },
    data?: any,
    totalData?: number,
    totalPage?: number
}
export interface dataPlan {
    idCiudad?: number
}

export interface dataCity{
    idDepartamento?: number;
}
export interface dataProvider  {
    idDepartamento?: string;
    idCiudad?: string;
    idPlan?: string;
    idEspecialidad?: string;
    nombreComercial?: string;
    tamano?: number;
    pagina?: number;
}



