'use client'

import { fetchVillagers } from '@/api/fetchVillagers'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import VillagerCard from '@/components/VillagerCard'
import { Villager } from '@/types/villager'
import Navbar from '@/components/Navbar'

export default function Home() {
  const [villagers, setVillagers] = useState<Villager[]>([])
  const [filteredVillagers, setFilteredVillagers] = useState<Villager[]>([])
  const [birthDates, setBirthDates] = useState<string[]>([])
  const [category, setCategory] = useState<string>('all')
  const [subcategory, setSubcategory] = useState<string>('all')

  // Fetch villagers on page load
  useEffect(() => {
    const getVillagers = async () => {
      const villagers = await fetchVillagers()
      setVillagers(villagers)
      setFilteredVillagers(villagers)
    }
    getVillagers()
  }, [])

  const updateCategory = (category: string, subcategory: string) => {
    setCategory(category)
    setSubcategory(subcategory.toLowerCase())

    // Sort by zodiac sign
    if (category === 'Zodiac') {
      setFilteredVillagers(villagers.filter((villager) => villager.sign.toLowerCase() === subcategory.toLowerCase()))
      
    // Sort by birthday month
    } else if (category === 'Birthday') {
      var villagerArray: Villager[] = villagers.filter((villager) => villager.birthday_month.toLowerCase() === subcategory.toLowerCase())
      var birthDatesArray: string[] = []
      villagerArray.forEach((villager) => {
        if (!birthDatesArray.includes(villager.birthday_day)) {
          birthDatesArray.push(villager.birthday_day)
        }
      })
      setBirthDates(birthDatesArray.sort((a, b) => parseInt(a) - parseInt(b)))
      setFilteredVillagers(villagerArray)

    // Show all villagers
    } else if (category === 'all') {
      setFilteredVillagers(villagers)

    // Sort all other categories
    } else {
      setFilteredVillagers(villagers.filter((villager: any) => villager[category.toLowerCase()] === subcategory))
    }
  }

  return (
    <>
      <Navbar updateCategory={updateCategory} villagers={villagers} />
      <main className='flex min-h-screen flex-col items-center justify-between p-12'>
        <header className='flex flex-col items-center justify-center mb-12 w-full h-[220px]'
        style={{
          backgroundImage: 'url(/assets/images/text-bubble.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}>
          <h1 className='text-3xl text-[#74664B] font-bokutoh'>Currently showing <span className={category === 'Birthday' ? 'capitalize' : ''}>{subcategory}</span> villagers ({filteredVillagers.length})</h1>
        </header>
        {category === 'Birthday' ? (
          <div>
            {birthDates.map((birthDate) => (
              <div className='grid grid-cols-4 gap-12 mb-12' key={birthDate}>
                <h2 className='col-span-4 text-2xl text-[#74664B] capitalize font-bokutoh'>{subcategory} {birthDate}</h2>
                {filteredVillagers.filter((villager) => villager.birthday_day === birthDate).map((villager) => (
                  <Link key={villager.id} href={{
                    pathname: `/villager/${villager.name.toLowerCase().replace(/\s/g, '-')}`,
                    query: { id: villager.id }
                  }}>
                    <VillagerCard name={villager.name} imageUrl={villager.image_url}/>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-4 gap-12'>
            {filteredVillagers.map((villager) => (
              <Link key={villager.image_url} href={{
                pathname: `/villager/${villager.name.toLowerCase().replace(/\s/g, '-')}`,
                query: { id: villager.id }
              }}>
                <VillagerCard name={villager.name} imageUrl={villager.image_url}/>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
