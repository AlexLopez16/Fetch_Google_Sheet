declare global {
    interface Array<T> {
        toSorted(compareFn?: (a: T, b: T) => number): T[]
    }
}

export interface Project {
    name: string
    typeOfInstitucion: string
    industry: string
    country: string
    status: string
    starts: string
    page: string
    description: string
    profilesRequired: string
    possibilityOfHiring: string
    howToApply: string
    skills: string
    technicalSupport: string
}

export interface FilterBy {
    country: string[]
    // institution: string[]
    // industry: string[]
}

export enum SortBy {
    NONE = 'none',
    NAME = 'name',
    INSTITUTION = 'institution',
    INDUSTRY = 'industry',
    COUNTRY = 'country'
}