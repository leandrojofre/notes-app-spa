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
public class NoteArchiveService {

	private final NoteRepo noteRepo;
	private final NoteArchiveRepo noteArchiveRepo;

	public Page<NoteArchive> getAllArchives(int page, int size) {
		return noteArchiveRepo.findAll(PageRequest.of(page, size, Sort.by("title")));
	}

	public NoteArchive getArchive(String id) {
		return noteArchiveRepo.findById(id).orElseThrow(() -> new RuntimeException("Archive not found"));
	}

	public void deleteArchive(NoteArchive archive) {
		noteArchiveRepo.delete(archive);
	}

	public void unarchiveNote(String id) {
		NoteArchive archive = getArchive(id);
		Note newNote = new Note();

		newNote.setTitle(archive.getTitle());
		newNote.setContent(archive.getContent());

		noteRepo.save(newNote);
	}
}
