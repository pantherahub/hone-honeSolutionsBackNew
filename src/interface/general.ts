export interface ImessageComposed {
    translationKey: string;
    translationParams: object;
  }
  
  export interface IresponseRepositoryService {
    code: number;
    message: string | ImessageComposed;
    data?: any;
  }
  