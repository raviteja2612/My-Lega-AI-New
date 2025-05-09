import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { getUserByEmail, verifyPassword, createUser } from "@/lib/user-service"
import bcrypt from "bcrypt"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email)

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await verifyPassword(user, credentials.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      // If it's a Google sign-in and we don't have the user in our database yet
      if (account?.provider === "google" && user?.email) {
        const existingUser = await getUserByEmail(user.email)

        if (!existingUser) {
          // Create a new user with Google credentials
          const newUser = await createUser({
            name: user.name || "User",
            email: user.email,
            password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Random password
            role: "consumer", // Default role
          })

          if (newUser) {
            token.id = newUser.id
            token.role = newUser.role
          }
        } else {
          token.id = existingUser.id
          token.role = existingUser.role
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
