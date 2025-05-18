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
        //console.log(response);
        return response;
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