'use client'

import { Villager } from '@/types/villager'
import { fetchVillager } from '@/api/fetchVillagers'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page({ params } : { params: { slug: string }}) {
    const [villager, setVillager] = useState<Villager>()
    const query = useSearchParams().get('id') as string

    useEffect(() => {
        const getVillager = async (slug: string, id: string) => {
            const villager = await fetchVillager(slug, id)
            setVillager(villager)
        }
        getVillager(params.slug, query)
    }, [])
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">{
            villager && (

                <h1 className="text-4xl font-bold">{villager.name}</h1>
            )
        }
        </main>
    )
}