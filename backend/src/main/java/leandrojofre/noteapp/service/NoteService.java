package leandrojofre.noteapp.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

	public Page<Note> getAllNotes(int page, int size) {
		return noteRepo.findAll(PageRequest.of(page, size, Sort.by("title")));
	}

	public Note getNote(String id) {
		return noteRepo.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
	}

	public Note createNote(Note note) {
		return noteRepo.save(note);
	}

	public void deleteNote(Note note) {
		noteRepo.delete(note);
	}
}
