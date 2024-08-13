package leandrojofre.noteapp.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import leandrojofre.noteapp.domain.Note;
import leandrojofre.noteapp.domain.NoteArchive;
import leandrojofre.noteapp.repo.NoteArchiveRepo;
import leandrojofre.noteapp.repo.NoteRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class NoteService {

	private final NoteRepo noteRepo;
	private final NoteArchiveRepo noteArchiveRepo;

	public Page<Note> getAllNotes(int page, int size) {
		return noteRepo.findAll(PageRequest.of(page, size, Sort.by("title")));
	}

	public Note getNote(String id) {
		return noteRepo.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
	}

	public Note createNote(Note note) {
		return noteRepo.save(note);
	}

	public void updateNote(String id, String title, String content) {
		Note note = getNote(id);

		if ("null".equals(title))
			title = note.getTitle();
		if ("null".equals(content))
			content = note.getContent();

		note.setTitle(title);
		note.setContent(content);
	}

	public void deleteNote(Note note) {
		noteRepo.delete(note);
	}

	public void archiveNote(String id) {
		Note note = getNote(id);
		NoteArchive newArchive = new NoteArchive();

		newArchive.setTitle(note.getTitle());
		newArchive.setContent(note.getContent());

		noteArchiveRepo.save(newArchive);
	}
}
