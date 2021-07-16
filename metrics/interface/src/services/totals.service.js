import http from "../http-common";

class TotalsDataService {
    getAll() {
        return http.get("/totals");
    }

    get(id) {
        return http.get(`/totals/${id}`);
    }
}

export default new TotalsDataService();