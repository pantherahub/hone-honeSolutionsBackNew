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


