class Company {
    
    id: number;
    companyTypeId: number;
    companyTypeName: string;
    companyId: number;
    name: string;
    cnpj: string;

    constructor() {
        this.id = 0;
        this.companyTypeId = 0;
        this.companyTypeName = "";
        this.companyId = 0;
        this.name = "";
        this.cnpj = "";
    }

}
export default Company;