import Image from 'next/image'
import RandomShape from '../RandomShape'

type Props = {
    name: string
    imageUrl: string
}

export default function VillagerCard({ name, imageUrl }: Props) {
    return (
        <div className='w-48 h-52 flex items-center cardHover justify-center overflow-visible bg-[#F8F5DF] rounded-xl' style={{
            boxShadow: '1px 5px 21px -4px rgba(0,0,0,0.2'
        }}>
            <RandomShape />
            <div className='absolute flex flex-col items-center justify-center gap-[1rem] h-48 w-48'>
                <span className='text-[#D3135A] px-2 py-1 rounded-xl text-2xl'>{name}</span>
                <div className='relative h-[150px] w-full cardHoverEffect'>
                    <Image fill={true} src={imageUrl} alt={name} style={{objectFit: 'contain'}} sizes='(max-width: 192px) auto'/>
                </div>
            </div>
        </div>
    )
}