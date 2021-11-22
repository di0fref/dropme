import http from "./http-common";

class CategoryService {
  getAll() {
    return http.get("/categories");
  }

  get(id) {
    return http.get(`/categories/${id}`);
  }
  count() {
    return http.get(`/categories/count`);
  }
  create(data) {
    return http.post("/categories/create", data);
  }

  update(id, data) {
    return http.put(`/categories/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/categories/delete/${id}`);
  }

}

export default new CategoryService();