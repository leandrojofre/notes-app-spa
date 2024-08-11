package leandrojofre.noteapp.resource;

import java.net.URI;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<Page<Note>> getNotes(
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		return ResponseEntity.ok().body(noteService.getAllNotes(page, size));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Note> getNote(@PathVariable(value = "id") String id) {
		return ResponseEntity.ok().body(noteService.getNote(id));
	}
}
