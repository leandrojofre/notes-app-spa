import React from 'react';
import NoteButton from './NoteButton';

const NotePad = ({ data, currentPage, getAllNotes }) => {
	return (
	<>
	{data?.content?.length === 0 && <div>Nothing to see, create a new note...</div>}

	<ul className='container-col'>
		{data?.content?.length > 0 && data.content.map(note => <NoteButton note={note} key={note.id}></NoteButton>)}
	</ul>
	
	{data?.content?.length > 0 && data?.totalPages > 1 &&
		<div className='container-col center-child'>
			<div className='container-normal'>
				<a onClick={() => getAllNotes(currentPage - 1)} className={(currentPage == 0) ? 'disabled button' : 'button'}> &laquo; </a>

					{data.totalElements && [...Array(data.totalPages).keys()].map((page) => {
						return (
							page > currentPage - 3 &&
							page < currentPage + 3 &&
							<a onClick={() => getAllNotes(page)} className={(currentPage === page) ? 'active button' : 'button'} key={page}> {page + 1} </a>
						)
					})}

				<a onClick={() => getAllNotes(currentPage + 1)} className={(currentPage + 1 === data.totalPages) ? 'disabled button right' : 'button right'}> &raquo; </a>
			</div>
		</div>
	}
	</>
	)
}

export default NotePad