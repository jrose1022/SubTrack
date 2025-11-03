// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'SubTrack',
  description: 'Expense tracking system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
