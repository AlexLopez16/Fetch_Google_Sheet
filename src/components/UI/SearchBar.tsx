import { Dispatch, SetStateAction } from 'react'
import { SearchIcon } from '../../assets/Icons/SearchIcon'

interface Props {
    setSearchedProject: Dispatch<SetStateAction<string | null>>
}

export const SearchBar = ({ setSearchedProject }: Props) => {
    return (
        <div className='flex items-center justify-end py-4 bg-white dark:bg-gray-800'>
            <label htmlFor='table-search' className='sr-only'>Search</label>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <SearchIcon />
                </div>
                <input
                    type='text'
                    className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500'
                    placeholder='Search for projects'
                    onChange={e => { setSearchedProject(e.target.value) }}
                />
            </div>
        </div>
    )
}
