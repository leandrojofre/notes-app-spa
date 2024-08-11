package leandrojofre.noteapp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import leandrojofre.noteapp.domain.Note;

@Repository
public interface NoteRepo extends JpaRepository<Note, String> {
	@SuppressWarnings("null")
	@Override
	Optional<Note> findById(String id);
}
