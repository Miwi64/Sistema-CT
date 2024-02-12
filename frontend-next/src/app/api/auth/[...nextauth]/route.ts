import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions  = {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {
            username: { label: "Username", type: "text"},
            password: { label: "Password", type: "password"}
          },
          authorize: async (credentials) => {
            const res = await fetch(
                `${process.env.DJANGO_API_AUTH_URL}/login/`,
                {
                method:'POST',
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    username: credentials?.username,
                    password: credentials?.password
                }),
            });
            const user = await res.json();
            if(res.status===200) return user;
            return null;
          }
        }),
      ],
      pages: {
        signIn: "/"
      },
      callbacks:{
        async jwt({token, user}:any){
            return { ...token, ...user};
        },
        async session({session, token}:any){
            session.user = token.user as any;
            session.token = token.token as any;
            session.maxAge = 10 * 60 * 60;
            session.expires = new Date(Date.now() + session.maxAge);
            return session;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

