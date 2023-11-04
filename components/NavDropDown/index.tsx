import { useState } from 'react'

type Props = {
    category: string;
    subcategories: string[];
    selectCategory: (category: string, subcategory: string) => void
}

export default function NavDropDown({ category, subcategories, selectCategory }: Props) {
    const [isExpanded, setIsExpanded] = useState(false)
    const handleToggle = () => setIsExpanded(!isExpanded)
    const handleSelect = (event: any) => {
        if (event.target) {
            selectCategory(category, event.target.innerHTML)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center text-left w-full px-10 py-3 text-[#74664B]'>
        <span className='text-2xl font-bold w-full flex justify-between cursor-pointer' onClick={handleToggle}>
            <span>{category}</span> 
            <span className='opacity-25'>{isExpanded ? '-' : '+'}</span>
        </span>
        {isExpanded && (
            subcategories.map((subcategory) => (
                <span className='text-lg font-bold w-full pl-6 py-1 cursor-pointer' key={subcategory} onClick={handleSelect}>{subcategory}</span>
            ))
        )}
    </div>
  )
}