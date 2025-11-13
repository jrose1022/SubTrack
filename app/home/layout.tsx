export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* You can put shared layout UI here */}
      <main>{children}</main>
    </div>
  )
}
