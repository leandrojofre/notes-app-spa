package leandrojofre.noteapp.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import leandrojofre.noteapp.domain.Note;
import leandrojofre.noteapp.repo.NoteRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class NoteService {

	private final NoteRepo noteRepo;

	public List<Note> getAllNotes() {
		return noteRepo.findAll(Sort.by("title"));
	}

	public Note getNote(String id) {
		return noteRepo.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
	}

	public Note createNote(Note note) {
		return noteRepo.save(note);
	}

	public void updateNote(String id, String title, String content, String archive) {
		Note note = getNote(id);

		if ("null".equals(title))
			title = note.getTitle();
		if ("null".equals(content))
			content = note.getContent();
		if (!archive.contains("true"))
			archive = "null";

		note.setTitle(title);
		note.setContent(content);
		note.setArchive(archive);
	}

	public void deleteNote(Note note) {
		noteRepo.delete(note);
	}
}
