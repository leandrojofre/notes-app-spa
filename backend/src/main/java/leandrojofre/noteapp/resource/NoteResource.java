package leandrojofre.noteapp.resource;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import leandrojofre.noteapp.domain.Note;
import leandrojofre.noteapp.service.NoteService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteResource {

	private final NoteService noteService;

	@PostMapping
	public ResponseEntity<Note> createNote(@RequestBody Note note) {
		return ResponseEntity.created(URI.create("/notes/userID")).body(noteService.createNote(note));
	}

	@GetMapping
	public ResponseEntity<List<Note>> getNotes() {
		return ResponseEntity.ok().body(noteService.getAllNotes());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Note> getNote(@PathVariable(value = "id") String id) {
		return ResponseEntity.ok().body(noteService.getNote(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Note> updateNote(
			@PathVariable(value = "id") String id,
			@RequestParam(value = "title", defaultValue = "null") String title,
			@RequestParam(value = "content", defaultValue = "null") String content,
			@RequestParam(value = "archive", defaultValue = "null") String archive) {

		noteService.updateNote(id, title, content, archive);

		return ResponseEntity.ok().body(noteService.getNote(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteNote(@PathVariable(value = "id") String id) {
		Note note = noteService.getNote(id);
		String noteName = note.getTitle();

		noteService.deleteNote(note);

		return ResponseEntity.ok().body(noteName + " (id): " + id + " / successfully removed.");
	}
}
