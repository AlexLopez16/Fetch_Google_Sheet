import { useEffect, useMemo, useState } from 'react'
import { config } from './sheetConfig'
import { Project, SortBy, FilterBy } from './types';

import { ProjectList,SearchBar, Skeleton, FiltersSection, Footer } from './components'

function App() {
    const API_KEY = import.meta.env.VITE_API_KEY
    const [data, setData] = useState<Project[]>([])
    const [thead, setThead] = useState<string[]>([])
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
    const [isSortingAsc, setIsSortingAsc] = useState<boolean>(false);
    const [searchedProject, setSearchedProject] = useState<string | null>(null)
    const [filterBy, setFilterBy] = useState<FilterBy>({ country: [] })

    const handleChangeSort = (sort: SortBy) => {
        setSorting(sort)
    }

    const toggleSortByAsc = () => {
        const newSorting = isSortingAsc ? false : true
        setIsSortingAsc(newSorting)
    }

    useEffect(() => {
        fetch(`https://content-sheets.googleapis.com/v4/spreadsheets/${config.SPREADSHEET_ID}/values/${config.RANGE}?majorDimension=${config.MAJOR_DIMENSIONS}&valueRenderOption=${config.VALUE_RENDER_OPTION}&dateTimeRenderOption=${config.DATE_TIME_RENDER_OPTION}&key=${API_KEY}`)
            .then(async (res) => await res.json())
            .then((res) => {
                const data: Project[] = res.values.map((value: string[]) => ({
                    name: value[0].trim(),
                    typeOfInstitucion: value[1].trim(),
                    industry: value[2].trim(),
                    country: value[3].trim(),
                    status: value[4].trim(),
                    starts: value[5].trim(),
                    page: value[6].trim(),
                    description: value[7].trim(),
                    profilesRequired: value[8].trim(),
                    possibilityOfHiring: value[9].trim(),
                    howToApply: value[10].trim(),
                    skills: value[11].trim(),
                    technicalSupport: value[12].trim()
                }))
                const onlyOpenStatus = data.filter(({ status }) => status === 'Open')
                setData(onlyOpenStatus)
                setThead(Object.values(data[0]))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const searchedProjects = useMemo(() => {
        return searchedProject !== null && searchedProject.length > 0
            ? data.filter(project => {
                return project.name.toLowerCase().includes(searchedProject.toLowerCase())
                    || project.profilesRequired.toLowerCase().includes(searchedProject.toLowerCase())
                    || project.skills.toLowerCase().includes(searchedProject.toLowerCase())
            })
            : data
    }, [data, searchedProject])

    const sortedProjects = useMemo(() => {
        if (sorting === SortBy.NONE) return searchedProjects

        const compareProperties: Record<string, (project: Project) => string> = {
            [SortBy.COUNTRY]: project => project.country,
            [SortBy.INDUSTRY]: project => project.industry,
            [SortBy.INSTITUTION]: project => project.typeOfInstitucion,
            [SortBy.NAME]: project => project.name
        }

        const sortOrder = isSortingAsc ? 1 : -1;
        const sortingFunction = (a: Project, b: Project) => {
            const extractProperty = compareProperties[sorting];
            return sortOrder * extractProperty(a).localeCompare(extractProperty(b));
        };

        return searchedProjects.toSorted(sortingFunction);
    }, [searchedProjects, sorting, isSortingAsc])

    const filterByProjects = useMemo(() => {
        return filterBy.country.length > 0
            ? sortedProjects.filter(project => filterBy.country.includes(project.country.toUpperCase()))
            : sortedProjects
    }, [filterBy.country, sortedProjects])

    return (
        <div>
            <h1 className='text-4xl text-center p-10 font-bold w-screen'>
                WELCOME TO HENRY PROJECT'S
            </h1>
            <header className='px-10'>
                <SearchBar setSearchedProject={setSearchedProject} />
            </header>
            <main>
                <div className='flex'>
                    <FiltersSection data={data} filterBy={filterBy} setFilterBy={setFilterBy} />
                    {data.length
                        ? (<ProjectList
                            projects={filterByProjects}
                            changeSorting={handleChangeSort}
                            thead={thead}
                            toggleSortByAsc={toggleSortByAsc}
                        />)
                        : (<Skeleton />)
                    }
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default App
