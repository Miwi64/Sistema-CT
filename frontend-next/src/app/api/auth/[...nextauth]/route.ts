import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
            console.log(user);
            if(user.error) throw user;

            return user;
            
          }
        }),
      ],
      pages: {
        signIn: "/"
      },
      callbacks:{
        async jwt({token, user}){
            return { ...token, ...user};
        },
        async session({ session, token}){
            session.user = token as any;
            return session;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
}
);

export { handler as GET, handler as POST };

