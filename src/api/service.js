let instance = null

class ApiService {
    constructor(connectorInstance, clientName) {
        this.connectorInstance = connectorInstance;
        this.clientName = clientName;
    }

    async getTiendas() {
        const response = await this.connectorInstance.get("/tiendas")
            .catch((error) => {
                console.log(error)
            })
        return response.data;
    }

    async getTienda(idTienda) {
        const response = await this.connectorInstance.get("/datos_tienda", {
            params: { idTienda }
        })
            .then(function (response) {
                console.log(response.data);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            })

        return response.data;
    }

    async getTopFamilias() {
        const response = await this.connectorInstance.get("/top_familias")
            .catch((error) => {
                console.log(error)
            })
        return response.data;
    }

    async predictByTienda(tienda, familia) {
        const response = await this.connectorInstance.get("/predict_by_tienda", {
            params: { tienda, familia }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return {data: null};
            });
        return response.data;
    }

    async predictByTemporada(temporada, familia) {
        const response = await this.connectorInstance.get("/predict_by_temporada", {
            params: { temporada, familia }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return {data: null};
            });
        return response.data;
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