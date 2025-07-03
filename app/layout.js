export const metadata = {
  title: 'pc? smartphone? help?',
  keywords: 'Ronse, Computer, Smartphone, Hulp, Problemen, Contact',
  description: 'Neem contact met mij voor hulp bij computer- of smartphoneproblemen.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}