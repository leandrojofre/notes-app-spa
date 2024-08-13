import React from 'react'

const Header = ({ toggleModal, numberOfNotes = 0 }) => {
	return (
	<header className='header'>
		<div className='container-row'>
			<h2  className='title-big'>Notes</h2>

			<div className='container-row'>
				<h2 className='title-med'>Total: {numberOfNotes}</h2>
				<button onClick={() => toggleModal(true)} className='button right'>+</button>
			</div>
		</div>
	</header>
	)
}

export default Header