package leandrojofre.noteapp.domain;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "notes")
public class Note {

	@Id
	@UuidGenerator
	@Column(name = "id", unique = true, updatable = false)
	private String id;
	private String title;
	private String content;

	public Note(String title, String content) {
		this.title = title;
		this.content = content;
	}
}
