import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: Number,
      username: string
    },
    token: string
  }
}
