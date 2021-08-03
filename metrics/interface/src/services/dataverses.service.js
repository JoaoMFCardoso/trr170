import http from "../http-common";

class DataversesDataService {
    getAll() {
        return http.get("/dataverses");
    }

    get(id) {
        return http.get(`/dataverses/${id}`);
    }
}

export default new DataversesDataService();