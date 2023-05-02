import { useEffect, Dispatch, SetStateAction } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '../../assets/Icons'
import { Project } from '../../types';

interface Props {
    projects: Project[]
    currPag: number
    setCurrPag: Dispatch<SetStateAction<number>>
}

export const Pagination = ({ projects, currPag, setCurrPag }: Props) => {

    const resultsPerPage = 10;
    const totalResults = projects.length
    const start = (currPag - 1) * resultsPerPage + 1;
    const end = Math.min(currPag * resultsPerPage, totalResults)
    const maxPages = Math.ceil(projects.length / resultsPerPage);
    const nPages = [...Array(maxPages)].map((_, index) => index + 1)

    useEffect(() => {
        setCurrPag(1)
    }, [setCurrPag, projects])

    const handleNextPage = () => {
        setCurrPag(currPag + 1)
    }

    const handlePrevPage = () => {
        setCurrPag(currPag - 1)
    }

    return (
        <div className='flex items-center justify-between border-t border-gray-200 bg-white py-5'>
            <div className='flex flex-1 items-center justify-between screen600:flex-col'>
                <div>
                    <p className='text-sm text-gray-700 screen600:mb-5'>
                        Showing <span className='font-medium'>{start}</span> to <span className='font-medium'>{end}</span> of{' '}
                        <span className='font-medium'>{projects.length}</span> results
                    </p>
                </div>
                <div>
                    <nav className='isolate inline-flex -space-x-px rounded-md' aria-label='Pagination'>
                        <button className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currPag === 1 && 'opacity-0 pointer-events-none'}`} onClick={handlePrevPage}>
                            <ChevronLeftIcon />
                        </button>
                        {nPages.map(nPage => (
                            <button className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 ${currPag === nPage ? 'bg-blue-600 text-white' : ''}`} key={nPage} onClick={() => setCurrPag(nPage)}>
                                {nPage}
                            </button>
                        ))}
                        <button
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${maxPages === 1 || currPag === maxPages ? 'opacity-0 pointer-events-none' : 'visible'}`}
                            onClick={handleNextPage}
                        >
                            <ChevronRightIcon />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
