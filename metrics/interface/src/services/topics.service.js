import http from "../http-common";

class TopicsDataService {
    getAll() {
        return http.get("/topics");
    }

    get(id) {
        return http.get(`/topics/${id}`);
    }
}

export default new TopicsDataService();