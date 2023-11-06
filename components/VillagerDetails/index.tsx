type Props = {
    personality: string;
    species: string;
    gender: string;
    birthday: string;
    zodiacSign: string;
}

type Zodiac = {
    zodiac: string;
    symbol: string;
}

const zodiacSymbols: Zodiac[] = [
    {
        zodiac: 'aires',
        symbol: '♈',
    }, {
        zodiac: 'taurus',
        symbol: '♉',
    }, {
        zodiac: 'gemini',
        symbol: '♊',
    }, {
        zodiac: 'cancer',
        symbol: '♋',
    }, {
        zodiac: 'leo',
        symbol: '♌',
    }, {
        zodiac: 'virgo',
        symbol: '♍',
    }, {
        zodiac: 'libra',
        symbol: '♎',
    }, {
        zodiac: 'scorpio',
        symbol: '♏',
    }, {
        zodiac: 'sagittarius',
        symbol: '♐',
    }, {
        zodiac: 'capricorn',
        symbol: '♑',
    }, {
        zodiac: 'aquarius',
        symbol: '♒',
    }, {
        zodiac: 'pisces',
        symbol: '♓',
    }
]

export default function VillagerDetails({ personality, species, gender, birthday, zodiacSign}: Props) {
    const zodiacSymbol: Zodiac | undefined =  zodiacSymbols.find((zodiac) => zodiac.zodiac === zodiacSign.toLowerCase())
    return (
        <div className="w-40">
            <div className="border-[#cfc6b6] border-2">
                <header className="bg-[#cfc6b6] text-[#483D2E] py-2 text-lg">
                    Species
                </header>
                <div className="py-2">
                    {species}
                </div>
            </div>
            <div className="border-[#cfc6b6] border-2">
                <header className="bg-[#cfc6b6] text-[#483D2E] py-2 text-lg">
                    Gender
                </header>
                <div className="py-2">
                    {gender} {gender === 'Female' ? '♀️' : '♂️'}
                </div>
            </div>
            <div className="border-[#cfc6b6] border-2">
                <header className="bg-[#cfc6b6] text-[#483D2E] py-2 text-lg">
                    Personality
                </header>
                <div className="py-2">
                    {personality}
                </div>
            </div>
            <div className="border-[#cfc6b6] border-2">
                <header className="bg-[#cfc6b6] text-[#483D2E] py-2 text-lg">
                    Zodiac sign
                </header>
                <div className="py-2">
                    {zodiacSign} {zodiacSymbol && zodiacSymbol.symbol}
                </div>
            </div>
            <div className="border-[#cfc6b6] border-2">
                <header className="bg-[#cfc6b6] text-[#483D2E] py-2 text-lg">
                    Birthday
                </header>
                <div className="py-2">
                    {birthday}
                </div>
            </div>
        </div>
    )
}