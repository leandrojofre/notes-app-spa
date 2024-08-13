import axios from 'axios';

const API_URL = 'http://127.0.0.1:8081/notes';

export async function createNote(note) {
	return await axios.post(API_URL, note);
}

export async function getNotes() {
	return await axios.get(API_URL);
}

export async function getNote(id) {
	return await axios.get(`${API_URL}/${id}`);
}

export async function updateNote(id, title, content, archive) {
	return await axios.put(`${API_URL}/${id}?title=${title}&content=${content}&archive=${archive}`);
}

export async function deleteNote(id) {
	return await axios.delete(`${API_URL}/${id}`);
}