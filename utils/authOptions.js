import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in.
    async signIn({ profile }) {
      // 1. Connect to db
      // 2. Check if user exists in db
      // 3. If not, create user
      // 3. If user exists, sign in user
    },
    // Session callback function that modifies the session object.
    async session({session}) {
        // 1. Get user from db
        // 2. assign user idf from the session
        // return session


    }
  },
};
