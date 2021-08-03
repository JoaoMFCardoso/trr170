import http from "../http-common";

class ContentTypesDataService {
    getAll() {
        return http.get("/content_types");
    }

    get(id) {
        return http.get(`/content_types/${id}`);
    }
}

export default new ContentTypesDataService();