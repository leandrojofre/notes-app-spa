import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NoteButton from './NoteButton';
import Pagination from './Pagination';

const NotePad = ({ data, getAllNotes }) => {
	const [pageConfig, setConfiguration] = useState({ pageSize: 6, currentPage: 0, pageStartIndex: 0 });

	const pageChanged = async (pageChange) => {

		await getAllNotes();

		const pageSize = 6
		
		let currentPage = pageConfig.currentPage;
		let pageStartIndex;

			if (pageChange === "-1") currentPage -= 1;
		else if (pageChange === "+1") currentPage += 1;
		else currentPage = pageChange;

		pageStartIndex = pageSize * currentPage;

		setConfiguration({ pageSize: pageSize, currentPage: currentPage, pageStartIndex: pageStartIndex });
	}

	return (
	<>
	<div className='container-col'>
	
		<div className='container-normal'>
			<Link to={`/archive`} className='button'>
				<p className='title-sma'>&raquo; Archived Notes</p>
			</Link>
		</div>

		{data instanceof Array && data.notes.length === 0 && <div>Nothing to see, create a new note...</div>}

		<ul className='container-col'>
			{data instanceof Array && data.length > 0 && data.notes
				.filter((data, i) => i >= pageConfig.pageStartIndex && i < pageConfig.pageStartIndex + pageConfig.pageSize)
				.map((note) => <NoteButton getAllNotes={getAllNotes} note={note} key={note.id}></NoteButton>)
			}
		</ul>
		
		<Pagination pageChanged={pageChanged} data={data} pageConfig={pageConfig} getAllNotes={getAllNotes} dataName={"notes"} />
	
	</div>
	</>
	)
}

export default NotePad