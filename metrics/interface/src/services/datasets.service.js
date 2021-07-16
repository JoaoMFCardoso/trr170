import http from "../http-common";

class DatasetsDataService {
    getAll() {
        return http.get("/datasets");
    }

    get(id) {
        return http.get(`/datasets/${id}`);
    }
}

export default new DatasetsDataService();