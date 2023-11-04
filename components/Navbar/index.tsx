'use client'

import { Category } from '@/types/category'
import { Villager } from '@/types/villager'
import { useEffect, useState } from 'react'
import NavDropDown from '../NavDropDown'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    updateCategory: (category: string, subcategory: string) => void
    villagers: Villager[]
}

export default function Navbar({ updateCategory, villagers }: Props) {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        if (villagers) {
            var categoriesArray: Category[] = []
            var speciesArray: string[] = []
            var personalityArray: string[] = []
            var birthdayMonthArray: string[] = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ]
            var zodiacArray: string[] = [
                'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius','Pisces'
            ]
            villagers.forEach((villager: Villager) => {
                if (!speciesArray.includes(villager.species)) {
                    speciesArray.push(villager.species)
                }
                if (!personalityArray.includes(villager.personality)) {
                    personalityArray.push(villager.personality)
                }
            })
            categoriesArray.push({category: 'Gender', subcategories: [ 'Male', 'Female' ]})
            categoriesArray.push({category: 'Species', subcategories: speciesArray.sort()})
            categoriesArray.push({category: 'Personality', subcategories: personalityArray.sort()})
            categoriesArray.push({category: 'Birthday', subcategories: birthdayMonthArray})
            categoriesArray.push({category: 'Zodiac', subcategories: zodiacArray})
            setCategories(categoriesArray)
        }
    }, [villagers])
    
    const selectCategory = (category: string, subcategory: string) => {
        updateCategory(category, subcategory)
    }

    const resetCategory = () => {
        updateCategory('all', 'all')
    }
    
    return (
        <nav className='h-full w-[325px] bg-[#F8F5DF] flex flex-col justify-between gap-4 fixed py-6 top-0 left-0' style={{
            boxShadow: '10px -2px 30px -13px rgba(0,0,0,0.4)',
            overflowY: 'auto'
        }}>
            <div>
                <Link href='/' onClick={resetCategory}>
                    <header className='w-full gap-2 items-center justify-center flex flex-col mb-10'>
                        <Image src='/assets/images/ac-logo.png' width={200} height={200} alt='Animal Crossing Logo' />
                        <h3 className='font-bokutoh text-[#FDC539] text-4xl' style={{
                            textShadow: '-1px -1px 1px rgba(255, 255, 255, 0.2), 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.6)',
                            transform: 'rotate(-5deg)'
                        }}>Villager Wiki</h3>
                    </header>
                </Link>
                { categories.map((category) => (
                    <NavDropDown category={category.category} subcategories={category.subcategories} key={category.category} selectCategory={selectCategory} />    
                ))}
            </div>
            <footer>
                <div className='flex flex-col items-center justify-center mt-10'>
                    <span className='text-[#74664B] text-md'>Made by Lea Skagen ❤️</span>
                    <span className='text-[#74664B] text-sm underline'><a href='https://github.com/leaskagen/acnh-wiki'>See Github Repository</a></span>
                </div>
            </footer>
        </nav>
    )
}