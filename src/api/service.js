let instance = null

class ApiService {
    constructor(connectorInstance, clientName) {
        this.connectorInstance = connectorInstance;
        this.clientName = clientName;
    }

    async getProvincias() {
        const response = await this.connectorInstance.get("/provincias")
            .catch((error) => {
                console.log(error)
            })
        return response.data;
    }

    async getFamilias() {
        const response = await this.connectorInstance.get("/familias")
            .catch((error) => {
                console.log(error)
            })
        return response.data;
    }

    async predict(provincia, familia) {
        this.connectorInstance.post("/predict", {
            provincia: provincia,
            familia: familia
        })
            .then(function (response) {
                console.log("Datos enviados axios: " + response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

function apiServiceInit(connectorInstance, clientName) {
    if (instance) {
        console.warn("Instancia ya existente, cliente: " + instance.clientName);
        return;
    }
    instance = new ApiService(connectorInstance, clientName);
    console.log("Instancia inicializada, cliente: " + instance.clientName)
}

function getApiService() {
    if (!instance) {
        console.error("Instancia inexistente");
        return;
    }
    console.log("Instancia obtenida, cliente: " + instance.clientName);
    return instance;
}

export { apiServiceInit, getApiService }