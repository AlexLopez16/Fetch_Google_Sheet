import { useState } from 'react';
import { ChevronUpDown } from '../assets/Icons'

import { Project, SortBy } from '../types';
import { Modal } from './Modal';
import { Pagination } from './UI/Pagination'

interface Props {
    projects: Project[]
    changeSorting: (sort: SortBy) => void
    thead: string[]
    toggleSortByAsc: () => void
}

interface DataProps {
    country: string
    industry: string
    name: string
    typeOfInstitucion: string
}

interface SortProps {
    [key: string]: SortBy
    'Nombre': SortBy
    'Tipo de institución': SortBy
    'Industria / Sector': SortBy
    'País, Ciudad': SortBy
}

export const ProjectList = ({ projects, changeSorting, thead, toggleSortByAsc }: Props) => {
    const [projectModal, setProjectModal] = useState<Project[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currPag, setCurrPag] = useState<number>(1)

    let firstIndx = 0
    let lastIndx = 0

    if (currPag !== 1) {
        lastIndx = (currPag * 10);
        firstIndx = lastIndx - 10
    }

    const handleOpenModal = (data: DataProps) => {
        const project = projects.filter(project => (
            project.name === data.name &&
            project.country === data.country &&
            project.industry === data.industry &&
            project.typeOfInstitucion === data.typeOfInstitucion
        ))

        setProjectModal(project)
        setOpenModal(true)
    }

    const Sort: SortProps = {
        'Nombre': SortBy.NAME,
        'Tipo de institución': SortBy.INSTITUTION,
        'Industria / Sector': SortBy.INDUSTRY,
        'País, Ciudad': SortBy.COUNTRY
    }

    const handleSorting = (sort: SortBy) => {
        changeSorting(sort)
        toggleSortByAsc()
    }

    const MessageError = () => {
        if (projects.length > 0) return null;
        return (
            <h1 className='text-2xl text-center text-red-600 py-10 font-semibold'>No projects found with that name or filter</h1>
        )
    }

    const projectsPaginated = (): Project[] => {
        if (currPag === 1) {
            return projects.slice(0, 10)
        }
        return projects.slice(firstIndx, lastIndx)
    }

    return (
        <div className='relative overflow-x-auto border rounded px-10 w-full mx-5 py-5 '>
            <table className='w-full text-sm text-center text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {thead.slice(0, 5).map((value, index) => (
                            <th scope='col' className='px-6 py-3' key={value}>
                                <div className='flex items-center justify-center select-none '>
                                    {value}
                                    {index < 4 && (
                                        <div className='cursor-pointer mx-2' onClick={() => { handleSorting(Sort[value]) }}>
                                            <ChevronUpDown />
                                        </div>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {projectsPaginated().map(({ country, industry, name, status, typeOfInstitucion }, index) => {
                        const backgroundColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                        return (
                            <tr className={`${backgroundColor} border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-yellow-100 cursor-pointer hover:font-bold`} key={index} onClick={() => handleOpenModal({ country, industry, name, typeOfInstitucion })}>
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white hover:font-bold' >
                                    {name}
                                </th>
                                <td className='px-6 py-4'>{typeOfInstitucion}</td>
                                <td className='px-6 py-4'>{industry}</td>
                                <td className='px-6 py-4'>{country}</td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center'>
                                        <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div> {status}
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <MessageError />

            <Pagination
                projects={projects}
                currPag={currPag}
                setCurrPag={setCurrPag}
            />

            {
                projectModal.length > 0 && (
                    <Modal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        project={projectModal}
                        labels={thead}
                    />
                )
            }
        </div >
    )
}
