import http from "./http-common";

class NotesService {
	getAll() {
		return http.get("/notes");
	}
	get(id) {
		return http.get(`/notes/${id}`);
	}
	getNotesByCategory(id) {
		return http.get(`/notes/category/${id}`);
	}
	count() {
		return http.get(`/notes/count`);
	}
	create(data) {
		return http.post("/notes/create", data);
	}
	update(id, data) {
		return http.put(`/notes/update/${id}`, data);
	}
	delete(id) {
		return http.delete(`/notes/delete/${id}`);
	}
}

export default new NotesService();
