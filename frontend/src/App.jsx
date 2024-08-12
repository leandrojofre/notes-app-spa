import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createNote, getNotes } from './api/NoteService';
import './App.css';
import Header from './components/Header';
import Note from './components/Note';
import NotePad from './components/NotePad';

function App() {
	const MAX_LENGTH_TITLE = 70
	const MAX_LENGTH_CONTENT = 2500
	const modalRef = useRef();
	const [data, setData] = useState({ totalElements: 0 });
	const [currentPage, setCurrentPage] = useState(0);
	const [formValues, setFormValues] = useState({title: "", content: ""});

	const getAllNotes = async (page = 0, size = 6) => {
		console.log("getAllNotes");
		
		try {
			setCurrentPage(page);
			const {data} = await getNotes(page, size);
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
			await createNote(formValues);
			await getAllNotes();
			resetForm()
		} catch (error) {
			console.log(error);
		}
	}
	
	useEffect(() => {
		getAllNotes();
	}, []);

	return (
		<>
		<Header toggleModal={toggleModal} numberOfNotes={data.totalElements} />
		
		<main className='main'>
			<Routes>
				<Route path='/' element={ <Navigate to={'/notes'} /> } />
				<Route path='/notes' element={ <NotePad data={data} currentPage={currentPage} getAllNotes={getAllNotes} /> } />
				<Route path='/notes/:id' element={ <Note getAllNotes={getAllNotes} /> } />
			</Routes>
		</main>

		<dialog ref={modalRef}>
			<form className='container-col' method='dialog' onSubmit={handleFormSubmit}>
				<div className='container-row'>
					<p className='title-med'>Create a new note:</p>
					<button type='button' onClick={() => toggleModal(false)} className='button right'>X</button>
				</div>
				<div className='container-col'>
					<div className='container-col'>
						<p className='title-sma'>Title:</p>
						<input minLength='1' maxLength={MAX_LENGTH_TITLE} type='text' value={formValues.title} onChange={onChange} className='input-monoline' name='title' />
					</div>
					<div className='container-col'>
						<p className='title-sma'>Note:</p>
						<textarea maxLength={MAX_LENGTH_CONTENT} form='note-form' name='content' className='input-text' onChange={onChange} value={formValues.content} >
						</textarea>
					</div>
					<div className='container-row'>
						<button type='reset' onClick={() => { toggleModal(false); resetForm() }} className='button'>Cancel</button>
						<button type='submit' onClick={() => toggleModal(false)} className='button right'>Accept</button>
					</div>
				</div>
			</form>
		</dialog>
		</>
	)
}

export default App
