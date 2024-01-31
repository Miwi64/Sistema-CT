export {default} from "next-auth/middleware"

export const config = {
    matcher: ["/students-table/:path*","/export","/profile", "/view/:path*", "/edit/:path*"],
}