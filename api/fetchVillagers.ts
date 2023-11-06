import { Villager } from '@/types/villager'

const fetchRequest = async (url: string) => {
  const res = await fetch(url, {
    headers: {  'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY as string }
  })
  const data = await res.json()
  return data
}

// Fetch all villagers
export const fetchVillagers = async () => {
  const villagers: Villager[] = await fetchRequest('https://api.nookipedia.com/villagers?game=nh')
  return villagers;
}

// Fetch a single villager
// slug is the villager's name, id is the villager's id
// If the villager's name has a dash, it is replaced with a space
// some villagers share the same name, so we need the id to differentiate them
export const fetchVillager = async (slug: string, id: string) => {
  var name = slug[0].includes('-') ? slug[0].split('-').join(' ') : slug[0]
  const villagers: Villager[] = await fetchRequest(`https://api.nookipedia.com/villagers?game=nh&nhdetails=true&name=${name}`)
  const villager: Villager = villagers.find(villager => villager.id === id) as Villager
  return villager
}