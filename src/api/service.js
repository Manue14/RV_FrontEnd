let instance = null

class ApiService {
    constructor(connectorInstance, clientName) {
        this.connectorInstance = connectorInstance;
        this.clientName = clientName;
    }

    async getTiendas() {
        try {
            const response = await this.connectorInstance.get("/tiendas");
            return response.data;
        } catch (error) {
            console.error("Error al obtener tiendas:", error);
            return [];
        }
    }

    async getTienda(idTienda) {
        try {
            const response = await this.connectorInstance.get("/datos_tienda", {
                params: { idTienda }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener datos de la tienda:", error);
            return null;
        }
    }

    async getTopFamilias() {
        try {
            const response = await this.connectorInstance.get("/top_familias");
            return response.data;
        } catch (error) {
            console.error("Error al obtener top familias:", error);
            return [];
        }
    }

    async getTopProductos() {
        try {
            const response = await this.connectorInstance.get("/top_productos");
            return response.data;
        } catch (error) {
            console.error("Error al obtener top productos:", error);
            return [];
        }
    }

    async predictByTienda(tienda, familia) {
        try {
            const response = await this.connectorInstance.get("/predict_by_tienda", {
                params: { tienda, familia }
            });
            return response.data;
        } catch (error) {
            console.error("Error al predecir por tienda:", error);
            return null;
        }
    }

    async predictByTemporada(temporada, familia) {
        try {
            const response = await this.connectorInstance.get("/predict_by_temporada", {
                params: { temporada, familia }
            });
            return response.data;
        } catch (error) {
            console.error("Error al predecir por temporada:", error);
            return null;
        }
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