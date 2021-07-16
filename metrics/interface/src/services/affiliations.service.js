import http from "../http-common";

class AffiliationsDataService {
    getAll() {
        return http.get("/affiliations");
    }

    get(id) {
        return http.get(`/affiliations/${id}`);
    }

    create(data) {
        return http.post("/affiliations", data);
    }

    update(id, data) {
        return http.put(`/affiliations/${id}`, data);
    }

    delete(id) {
        return http.delete(`/affiliations/${id}`);
    }

    deleteAll() {
        return http.delete(`/affiliations`);
    }

    findBy(affiliation) {
        return http.get(`/affiliations?affiliation=${affiliation}`);
    }
}

export default new AffiliationsDataService();