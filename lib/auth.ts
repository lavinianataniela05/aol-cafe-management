// // lib/auth.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
}

declare module "next-auth" {
  interface User {
    role?: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })

        if (user && credentials?.password === user.password) { // In production, use proper hashing!
          return {
            id: user.id,
            email: user.email,
            role: user.role
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: { role?: string } }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}
// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions: NextAuthOptions = {
// //   providers: [
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_ID!,
// //       clientSecret: process.env.GITHUB_SECRET!,
// //     }),
// //   ],
// //   secret: process.env.NEXTAUTH_SECRET,
// //   callbacks: {
// //     async session({ session, token, user }) {
// //       // Bisa tambahkan data tambahan di sini kalau perlu
// //       return session
// //     },
// providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // Logika cek login (panggil API, cek DB, dll)
//         if (
//           credentials?.email === "admin@example.com" &&
//           credentials?.password === "admin123"
//         ) {
//           return { id: "1", name: "Admin", email: "admin@example.com" }
//         }
//         return null
//       },
//     }),
//   ]
// }
// lib/auth.ts

// import CredentialsProvider from "next-auth/providers/credentials"
// import type { NextAuthOptions } from "next-auth"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Ganti logika ini dengan validasi yang sesungguhnya (contoh pakai DB)
//         if (
//           credentials?.email === "admin@example.com" &&
//           credentials?.password === "admin123"
//         ) {
//           return { id: "1", name: "Admin", email: "admin@example.com" }
//         }
//         return null
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // custom login page (opsional)
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// }
