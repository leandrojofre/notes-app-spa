package leandrojofre.noteapp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import leandrojofre.noteapp.domain.NoteArchive;

@Repository
public interface NoteArchiveRepo extends JpaRepository<NoteArchive, String> {
	@SuppressWarnings("null")
	@Override
	Optional<NoteArchive> findById(String id);
}
