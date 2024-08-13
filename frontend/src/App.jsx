import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createNote, getNotes } from './api/NoteService';
import './App.css';
import Archive from './components/Archive';
import Header from './components/Header';
import Note from './components/Note';
import NotePad from './components/NotePad';

function App() {
	const MAX_LENGTH_TITLE = 70
	const MAX_LENGTH_CONTENT = 2500
	const modalRef = useRef();

	const [data, setData] = useState({ length: 0 })
	const [formValues, setFormValues] = useState({title: "", content: "", archive: ""});

	const getAllNotes = async () => {
		try {
			const {data} = await getNotes();

			data.notes = data.filter((note) => !(note.archive === "true"));
			data.archive = data.filter((note) => (note.archive === "true"));

			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleModal = (show) => (show) ? modalRef.current.showModal() : modalRef.current.close();

	const onChange = (e) => setFormValues({...formValues, [e.target.name]: e.target.value});

	const resetForm = () => setFormValues({title: "",	content: ""});

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			setFormValues({...formValues, "archive": "null"});

			await createNote(formValues);
			await getAllNotes();

			toggleModal(false);
			resetForm();
		} catch (error) {
			console.log(error);
		}
	}
	
	useEffect(() => {
		getAllNotes();
	}, []);

	return (
		<>
		<Header toggleModal={toggleModal} numberOfNotes={data.length} />
		
		<main className='main'>
			<Routes>
				<Route path='/' element={ <Navigate to={'/notes'} /> } />
				<Route path='/archive' element={ <Archive data={data} getAllNotes={getAllNotes} /> } />
				<Route path='/notes' element={ <NotePad data={data} getAllNotes={getAllNotes} /> } />
				<Route path='/notes/:id' element={ <Note getAllNotes={getAllNotes} /> } />
			</Routes>
		</main>

		<dialog ref={modalRef}>
			<form id='create-note-form' className='container-col' method='dialog' onSubmit={handleFormSubmit}>
				<div className='container-row'>
					<p className='title-med'>Create a new note:</p>
					<button type='button' onClick={() => toggleModal(false)} className='button right'>X</button>
				</div>
				<div className='container-col'>
					<div className='container-col'>
						<p className='title-sma'>Title:</p>
						<input required minLength='1' maxLength={MAX_LENGTH_TITLE} type='text' value={formValues.title} onChange={onChange} className='input-monoline' name='title' />
					</div>
					<div className='container-col'>
						<p className='title-sma'>Note:</p>
						<textarea required minLength='1' maxLength={MAX_LENGTH_CONTENT} form='create-note-form' name='content' className='input-text' onChange={onChange} value={formValues.content} >
						</textarea>
					</div>
					<div className='container-row'>
						<button type='reset' onClick={() => { toggleModal(false); resetForm() }} className='button'>Cancel</button>
						<button type='submit' className='button right'>Accept</button>
					</div>
				</div>
			</form>
		</dialog>
		</>
	)
}

export default App
