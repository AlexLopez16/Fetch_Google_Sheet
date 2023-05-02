export const Skeleton = () => {
    return (
        <div className='w-full animate-pulse px-10 py-5'>
            <div className='h-10 bg-gray-700  dark:bg-gray-700 w-ful'></div>
            {
                [...Array(17)].map((_, index) => index + 1).map((value, index) => {
                    const backgroundColor = index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'

                    return (
                        <div className={`h-6 ${backgroundColor} border-b dark:bg-gray-700 max-w-full`} key={value}></div>

                    )
                })
            }
            <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-ful mt-8'></div>
        </div>
    )
}
