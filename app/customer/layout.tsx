import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (session?.user.role !== 'CUSTOMER') {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar  />
      <main className="p-4">{children}</main>
    </div>
  )
}