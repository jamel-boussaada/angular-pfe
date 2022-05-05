export interface Visite
//product
{
    id?: string;
    typevisite?: string;
    resultatvisite?: string;
    datevisite?: string;
    intervenant?: string;
    autorisation?: string;
    heureTotale?: string;
    tolerance?: string;
    dateVisite?: string;
    dateButeé?: string;
    heureButeé?: string;
    nBill?: string;
    nomIngenieur?: string;
    // operationss: Array<string>;
    potentielProchainVisite?: string;
    resultatVisite?: string;
    status?: string;
    typeVisite?: string;
    // traveauSupplimentaires: Array<any>;
}

export interface VisitePagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

//categorie
export interface VisiteTypeVisite
{
    id: string;
    name: string;
}
//brand
export interface VisiteStatus
{
    id: string;
    name: string;
}


