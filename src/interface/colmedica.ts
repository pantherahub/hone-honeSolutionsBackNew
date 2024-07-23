export interface INegotiationTabColmedica {
    idOfficeProvider: string;
    dateBegin: string;
    dateEnd: string;
    idProduct: string;
    idContactsProvider: string;
  }
  
export interface IProviderColmedica {
    idProvider: number;
    razonSocial: string;
    idTypeDocument: number;
    typeDocument: string;
    identificacion: string;
    idCity: number;
    city: string;
    idOfficeProvider: number;
  }

    
export interface IOfficeProviderColmedica {
  idProvider: number;
  OfficeProviderName: string;
  idOfficeProvider: number;
}

export interface IContactsProviderColmedica {
  name: string;
  SurName: string;
  idOccupation: number;
  occupation: string;
  phone: string;
  email: string;
  idProvider: number;
}

export interface INegotiationTabRendomColmedica {
  idTypeService: number;
  idTypeRendom: number;
  id_NegotiationTabColmedica: number;
}

export interface INegotiationTabTypeIncrementColmedica {
  id_NegotiationTabColmedica: number;
  idTypeIncrement: number;
}

export interface INegotiationTabTypeIncrement {
  idTypeService: number;
  idTypeRendom: number;
  id_NegotiationTabColmedica: number;
}

export interface IProductColmedica {
  idProduct: number;
  Product: string;
}

export interface IOccupationColmedica {
  idOccupation: number;
  occupation: string;
}


export interface IPlansColmedica {
  idPlan: number;
  namePlan: string;
}


export interface ITypeRendomColmedica {
  idTypeRendom: string;
  typeRendom: number;
}

export interface ITypeIncrementColmedica {
  TypeIncrement: string;
  idTypeIncrement: number;
}

export interface ITypeFaresColmedica {
  idTypeFare: number;
  typeFare: string;
  codeFare: string;
}

export interface INegotiationTabPlansColmedica {
  idNegotiationTabColmedica: number;
  idPlan: number;
  idTypeService: number;
}
