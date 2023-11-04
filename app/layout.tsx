import type { Metadata } from 'next'
import './globals.css'
import { IconURL } from 'next/dist/lib/metadata/types/metadata-types'

//const icon: IconURL = '/leaf-icon.png'

export const metadata: Metadata = {
  title: 'Animal Crossing Villager Wiki',
  description: 'A wiki for all Animal Crossing villagers',
  /*
  icons: {
    icon: icon,
  },
  */
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className='font-seurat ml-[300px]'>
        {children}
      </body>
    </html>
  )
}
