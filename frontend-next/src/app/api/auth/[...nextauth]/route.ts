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
            // if (token.expires) {
            //   // Convierte la cadena de fecha de expiración en un objeto Date
            //   const expires = new Date(token.expires);
            //   // Establece la propiedad expires de la sesión en la fecha de expiración de la token de Knox
            //   session.expires = expires.toISOString();
            // }
            return session;
        },
      },
      session: {
        maxAge: 10 * 60
      },
      secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

