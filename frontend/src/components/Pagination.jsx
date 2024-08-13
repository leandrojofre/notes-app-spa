import React from 'react';

const Pagination = ({ pageChanged, data, pageConfig, dataName }) => {
	const totalPages = () => Math.ceil((data[dataName].length || 0) / pageConfig.pageSize);

	return (
	<>
	{data instanceof Array &&
		<div className='container-col center-child'>
		<div className='container-normal'>
			<a onClick={() => pageChanged("-1")} className={(pageConfig.currentPage == 0) ? 'disabled button' : 'button'}> &laquo; </a>

				{[...Array(totalPages()).keys()].map((page) => {
					return (
						page > pageConfig.currentPage - 3 &&
						page < pageConfig.currentPage + 3 &&
						<a onClick={() => pageChanged(page)} className={(pageConfig.currentPage === page) ? 'active button' : 'button'} key={page}> {page + 1} </a>
					)
				})}

			<a onClick={() => pageChanged("+1")} className={(pageConfig.currentPage + 1 === totalPages()) ? 'disabled button right' : 'button right'}> &raquo; </a>
		</div>
		</div>
	}
	</>
	)
}

export default Pagination