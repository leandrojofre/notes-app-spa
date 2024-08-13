import React, { useRef } from 'react';
import { deleteNote, updateNote } from '../api/NoteService';

const ArchiveElement = ({ note, getAllNotes }) => {

	const MAX_LENGTH_TITLE = 70;
	const MAX_LENGTH_CONTENT = 80;
	const EXTRA = note.content.length > MAX_LENGTH_CONTENT ? "..." : "";
	const modalRef = useRef();
	
	const toggleModal = (show) => (show) ? modalRef.current.showModal() : modalRef.current.close();

	const deleteNoteButton = async (e) => {
		toggleModal(false);

		try {
			await deleteNote(note.id);
			await getAllNotes();
		} catch (error) {
			console.log(error);
		}
	}

	const unarchiveNote = async (e) => {
		try {
			await updateNote(note.id, note.title, note.content, null);
			await getAllNotes();
		} catch (error) {
			console.log(error);
		}
	}

	return (
	<>
	
	<div className='container-col'>
		<div className='container-row'>
			<div className='note-item button no-cursor'>
				<p className='note-title title-sma'>&raquo; {note.title.substring(0, MAX_LENGTH_TITLE)}</p>
			</div>
			
			<div className='container-row'>
				<button className='button' onClick={unarchiveNote}>Unarchive</button>
				<button className='button' onClick={() => toggleModal(true)}>Delete</button>
			</div>
		</div>
		<p className='note-content'>{note.content.substring(0, MAX_LENGTH_CONTENT) + EXTRA}</p>
	</div>

	<dialog ref={modalRef}>
		<div className='container-col'>
			<h2 className='title-big'>Are you sure you want to delete this note?</h2>
			<h2 className='title-med'>You can't reverse this change</h2>
			<div className='container-row'>
				<button className='button' onClick={() => toggleModal(false)}>No</button>
				<button className='button' onClick={deleteNoteButton}>Yes</button>
			</div>
		</div>
	</dialog>
	
	</>
	)
}

export default ArchiveElement