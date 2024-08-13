import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNote, updateNote } from '../api/NoteService';

const Note = ({ getAllNotes }) => {
	const MAX_LENGTH_TITLE = 70;
	const MAX_LENGTH_CONTENT = 2500;

	const [note, setNote] = useState({title: "", content: ""});
	const [saveStatus, setSaveStatus] = useState({opacity: 0});
	const [classHidden, setClassHidden] = useState({title: "note-title", inputTitle: "input-text hidden"});
	const { id } = useParams();

	const apiGetNote = async (id) => {
		try {
			const { data } = await getNote(id);
			setNote(data);
		} catch (error) {
			console.log(error);
		}
	}

	const onChange = (e) => setNote({...note, [e.target.name]: e.target.value});

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			await updateNote(id, note.title, note.content);
			await getAllNotes();

			setSaveStatus({ opacity: 1 });
			
			await new Promise(resolve => {
				let interval = setInterval(() => {
					if (saveStatus.opacity <= 0) resolve(clearInterval(interval), setSaveStatus({ opacity: 0 }));
					else setSaveStatus({ opacity: saveStatus.opacity - 0.1 });
				}, 1000);
			});
		} catch (error) {
			console.log(error);
		}
	}

	const editTitle = (e) => {
		if (!classHidden.title.includes("hidden"))
			setClassHidden({
				title: "note-title title-med hidden",
				inputTitle: "input-monoline title-med"
			});
		else setClassHidden({
				title: "note-title title-med",
				inputTitle: "input-monoline title-med hidden"
			});
	}

	useEffect(() => {
		apiGetNote(id);
	}, []);

	return (
	<form id='note-form' className='container-col' method='dialog' onSubmit={handleFormSubmit}>
		<div className='container-row'>
			<div className='container-row'>
				<p className={classHidden.title}>{note.title}</p>
				<input maxLength={MAX_LENGTH_TITLE} type='text' value={note.title} onChange={onChange} className={classHidden.inputTitle} name='title' />

				<button type='button' className='button' onClick={editTitle}>Edit</button>
			</div>

			<Link to={`/notes`} onClick={() => document.getElementById("submit-note-form").click()} className='button right'>&laquo;</Link>
		</div>

		<textarea maxLength={MAX_LENGTH_CONTENT} form='note-form' name='content' className='input-text' onChange={onChange} value={note.content} ></textarea>

		<div className='container-normal right'>
			<p style={{opacity: saveStatus.opacity}}>Successfully saved!</p>
			<button type='submit' className='button' id='submit-note-form'>Save</button>
		</div>
	</form>
	)
}

export default Note