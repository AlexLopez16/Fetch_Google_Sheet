import { Dispatch, SetStateAction } from 'react'
import { FilterBy, Project } from '../../../types'

import { FilterOption } from './FilterOption'

interface Props {
    data: Project[]
    setFilterBy: Dispatch<SetStateAction<FilterBy>>
    filterBy: FilterBy
}

export const FiltersSection = ({ data, filterBy, setFilterBy }: Props) => {
    const countryOptions = data.slice(1).map(({ country }) => country.toUpperCase())
    // const typeOfInstitutionOptions = data.slice(1).map(({ typeOfInstitucion }) => typeOfInstitucion.toUpperCase())
    // const industryOptions = data.slice(1).map(({ industry }) => industry.toUpperCase())

    return (
        <nav className='min-w-[250px] overflow-y-auto border rounded-lg screen600:hidden'>
            <main className='mx-auto px-4 max-w-sm'>
                <FilterOption title='País' options={countryOptions} filterBy={filterBy} setFilterBy={setFilterBy} />
                {/* <FilterOption title='Tipo de Institución' options={typeOfInstitutionOptions} filterBy={filterBy} setFilterBy={setFilterBy} />
                <FilterOption title='Industria/Sector' options={industryOptions} filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            </main>
        </nav>
    )
}
