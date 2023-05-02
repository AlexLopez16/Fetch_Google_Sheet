import { Dispatch } from 'react';
import { CloseIcon } from '../assets/Icons'
import { Project } from '../types';

interface Props {
    openModal: boolean,
    setOpenModal: Dispatch<React.SetStateAction<boolean>>
    project: Project[]
    labels: string[]
}

interface ProjectModalProps {
    [key: string]: string | undefined | JSX.Element;
    'Tipo de institución': string | undefined
    'Industria / Sector': string | undefined
    'País, Ciudad': string | undefined
    'Cuando comenzara el proyecto?': string | undefined
    'Web': string | undefined
    'Perfiles Buscados': string | undefined
    'Posibilidad de Contratación': string | undefined | JSX.Element
    'Link o mail de aplicacion': string | undefined
    'Tecnologias requeridas para el proyecto': string | undefined
    '¿El proyecto tiene acompañamiento tecnico?': string | undefined | JSX.Element
    'Descripcion Proyecto': string | undefined
}

export const Modal = ({ openModal, setOpenModal, project, labels }: Props) => {

    const handleCloseModal = () => {
        setOpenModal(!openModal)
    }

    labels = labels.filter(label => !['Nombre', 'Status', 'Descripcion Proyecto'].includes(label)).sort()

    const PosibiltyOfHiring = () => {
        const isPosibility = project[0].possibilityOfHiring?.toLowerCase().includes('si')
        const color = isPosibility ? 'bg-green-500' : 'bg-red-500';

        return (
            <div className='flex items-center'>
                <div className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></div>{project[0].possibilityOfHiring}
            </div>
        )
    }

    const TechnicalSupport = () => {
        const hasSupport = project[0].technicalSupport?.toLowerCase().includes('si')
        const color = hasSupport ? 'bg-green-500' : 'bg-red-500';

        return (
            <div className='flex items-center'>
                <div className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></div>{project[0].technicalSupport}
            </div>
        )
    }

    const projectModal: ProjectModalProps = {
        'Tipo de institución': project[0].typeOfInstitucion,
        'Industria / Sector': project[0].industry,
        'País, Ciudad': project[0].country,
        'Cuando comenzara el proyecto?': project[0].starts,
        'Web': project[0].page,
        'Perfiles Buscados': project[0].profilesRequired,
        'Posibilidad de Contratación': <PosibiltyOfHiring />,
        'Link o mail de aplicacion': project[0].howToApply,
        'Tecnologias requeridas para el proyecto': project[0].skills,
        '¿El proyecto tiene acompañamiento tecnico?': <TechnicalSupport />,
        'Descripcion Proyecto': project[0].description
    }

    return (
        <div className='relative z-10' role='dialog' hidden={!openModal}>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
            <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-5xl '>

                        <div className='flex items-center p-4 border-b rounded-t'>
                            <h3 className='text-xl font-bold text-gray-900 text-center w-full'>
                                {project[0].name}
                            </h3>
                            <button
                                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center'
                                onClick={handleCloseModal}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <div className='p-6 space-y-6'>
                            <div className='grid grid-cols-6 gap-6'>

                                {labels.map(label => (
                                    <div className='col-span-6 sm:col-span-3' key={label}>
                                        <label className='block mb-2 text-sm font-medium text-gray-900'>
                                            {label}
                                        </label>
                                        <span className='shadow-sm bg-gray-50 border-b border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'>
                                            {projectModal[label]}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label htmlFor='first-name' className='block mb-2 text-sm font-medium text-gray-900'>
                                    Descripcion Proyecto
                                </label>
                                <span className='shadow-sm bg-gray-50 border-b border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 break-words' >
                                    {projectModal['Descripcion Proyecto']}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
