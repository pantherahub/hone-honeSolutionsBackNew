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
    idDepartament?: string | { translationParams: string},
    code: number,
    message: string| { translationKey: string },
    data?: any
}

