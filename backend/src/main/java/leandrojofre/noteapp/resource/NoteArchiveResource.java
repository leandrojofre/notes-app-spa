package leandrojofre.noteapp.resource;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import leandrojofre.noteapp.domain.NoteArchive;
import leandrojofre.noteapp.service.NoteArchiveService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes-archive")
@RequiredArgsConstructor
public class NoteArchiveResource {
	private final NoteArchiveService noteArchiveService;

	@GetMapping
	public ResponseEntity<Page<NoteArchive>> getNotes(
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		return ResponseEntity.ok().body(noteArchiveService.getAllArchives(page, size));
	}

	@GetMapping("/{id}")
	public ResponseEntity<NoteArchive> getNote(@PathVariable(value = "id") String id) {
		return ResponseEntity.ok().body(noteArchiveService.getArchive(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteNote(@PathVariable(value = "id") String id) {
		NoteArchive noteArchive = noteArchiveService.getArchive(id);
		String noteName = noteArchive.getTitle();

		noteArchiveService.deleteArchive(noteArchive);

		return ResponseEntity.ok().body(noteName + " (id): " + id + " / successfully removed.");
	}
}
