import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MinusIcon, PlusIcon } from '../../../assets/Icons'
import { FilterBy } from '../../../types';

interface Props {
    title: string
    options: string[]
    setFilterBy: Dispatch<SetStateAction<FilterBy>>
    filterBy: FilterBy
}

interface FilterKeyProps {
    [key: string]: string;
    'País': string
    'Tipo de Institución': string
    'Industria/Sector': string
}

export const FilterOption = ({ title, options, filterBy, setFilterBy }: Props) => {
    const uniqueValues = [...new Set(options)].sort()

    const [showOptions, setShowOptions] = useState<boolean>(true);
    const [checkboxes, setCheckboxes] = useState<string[]>([])

    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const RenderIcons = () => {
        if (showOptions) return (<MinusIcon />)
        else return (<PlusIcon />)
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (!checked) {
            const filterCheckboxes = checkboxes.filter(checkbox => checkbox !== value)
            setCheckboxes(filterCheckboxes)
            return;
        }
        setCheckboxes([
            ...checkboxes,
            value
        ])
    }

    useEffect(() => {
        const filterKeys: FilterKeyProps = {
            'País': 'country',
            'Tipo de Institución': 'institution',
            'Industria/Sector': 'industry'
        }
        setFilterBy({
            ...filterBy,
            [filterKeys[title]]: checkboxes
        })
    }, [checkboxes])


    return (
        <div className='border-b border-gray-200 py-6'>
            <h3 className='-my-3'>
                <button
                    className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'
                    onClick={handleShowOptions}
                >
                    <span className='font-medium text-gray-900'>
                        {title}
                    </span>
                    <span className='flex items-center'>
                        <RenderIcons />
                    </span>
                </button>

            </h3>
            <div className={`pt-6 ${!showOptions && 'hidden'}`}>
                <div className='space-y-2'>
                    {uniqueValues.map(value => (
                        <div className='flex items-center' key={value}>
                            <input
                                id={value}
                                name={value}
                                value={value}
                                type='checkbox'
                                className='h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-1 cursor-pointer'
                                onChange={handleCheckbox}
                            />
                            <label htmlFor={value} className='ml-3 text-sm text-gray-600 cursor-pointer select-none'>{value}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
