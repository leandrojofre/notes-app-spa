package leandrojofre.noteapp.domain;

import java.util.ArrayList;

public class NotePad {

	private ArrayList<Note> notes;

	public NotePad() {
		this.notes = new ArrayList<>();
	}

	public void setNotes(ArrayList<Note> notes) {
		this.notes = notes;
	}

	public ArrayList<Note> getNotes() {
		return notes;
	}

}
