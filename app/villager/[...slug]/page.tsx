'use client'

import { Villager } from '@/types/villager'
import { fetchVillager } from '@/api/fetchVillagers'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VillagerDetails from '@/components/VillagerDetails'

export default function Page({ params } : { params: { slug: string }}) {
    const [villager, setVillager] = useState<Villager>()
    const query = useSearchParams().get('id') as string

    useEffect(() => {
        const getVillager = async (slug: string, id: string) => {
            const villager = await fetchVillager(slug, id)
            setVillager(villager)
                    }
        if (params.slug && query && !villager) {
            getVillager(params.slug, query)
        }
    }, [params.slug, query])
    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-24'>
            { villager && (
                <div className='flex items-center justify-between w-full gap-24'>
                    <div className='h-[600px] relative w-[400px]'>
                        <Image src={villager.image_url} alt={villager.name} fill={true} style={{objectFit: 'contain', filter: 'drop-shadow(1px 1px 13px #75a989)'}} sizes='(max-width: 400px) auto' />
                    </div>
                    <div className='w-full h-full bg-[#F8F5DF] text-[#74664B] text-center p-12 rounded-2xl' style={{
                        boxShadow: '1px 5px 21px -4px rgba(0,0,0,0.2'
                    }}>
                        <h1 className='text-4xl border-b-[#cfc6b6] border-b-2 pb-4 font-bokutoh flex justify-center gap-4'>{villager.name} <Image src={villager.nh_details.icon_url} width={45} height={30} alt='icon' style={{ objectFit: 'cover' }}/></h1>
                        <div className='flex mb-8'>
                            <div className='w-full p-4 flex flex-col gap-10'>
                                <div>
                                    <h2 className='text-xl mb-6'>Favorites</h2>
                                    <div className='flex justify-evenly'>
                                        <div>
                                            <h3>Colors:</h3>
                                            <ul>
                                                {villager.nh_details.fav_colors.map((color) => (
                                                    <li>{color}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3>Styles:</h3>
                                            <ul>
                                                {villager.nh_details.fav_styles.map((style) => (
                                                    <li>{style}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-xl mb-6'>House</h2>
                                    <div className='flex justify-evenly'>
                                        <div className='flex flex-col justify-center'>
                                            <Image src={villager.nh_details.house_exterior_url} alt={`Exterior of ${villager.name}'s house`} width={200} height={200} />
                                            <p>Exterior</p>
                                        </div>
                                        <div className='flex flex-col justify-center'>
                                            <Image src={villager.nh_details.house_interior_url} alt={`Interior of ${villager.name}'s house`} width={200} height={200} style={{ objectFit: 'contain' }} />
                                            <p>Interior</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <VillagerDetails 
                                personality={villager.personality}
                                species={villager.species}
                                gender={villager.gender}
                                birthday={`${villager.birthday_month} ${villager.birthday_day}`}
                                zodiacSign={villager.sign}
                            />
                        </div>
                        <Link href={villager.url} target='_blank'>
                            <button className='bg-[#74e0aa] hover:bg-[#57b385] py-4 px-6 rounded-xl text-[#4f432b] hover:text-white' style={{
                                boxShadow: '1px 5px 21px -4px rgba(0,0,0,0.2'
                            }}>
                                Read more about {villager.name}
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            <div className='absolute top-20 left-48'>
                <Link href='/'>
                    <Image src='/assets/images/arrow.png' width={50} height={50} alt='Animal Crossing Logo' style={{filter: 'drop-shadow(1px 1px 13px #75a989)'}} />
                </Link>
            </div>
        </main>
    )
}