import { LogIn, User } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { ModeToggle } from "../components/mode-toggle"
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
    username: z.string().min(5, "Mínimo 5 caracteres").max(50, "Límite de caracteres excedido"),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mínimo 8 caracteres, al menos una letra y un número")
})




const Login = () => {
    const navigate = useNavigate()
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(values)
        navigate("/students-table")
    }
    const imgUrl = new URL('../assets/558866.jpg', import.meta.url).href
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    return (
        <div className="relative">
            <section className="hidden md:block w-full h-screen bg-no-repeat bg-cover absolute" style={{backgroundImage: `url(${imgUrl})`}} />
            <section className="w-full h-screen flex justify-center items-center overflow-y-auto absolute md:bg-[rgba(255,255,255,0.9)] md:dark:bg-[rgba(0,0,0,0.9)] backdrop-blur-3xl">
                <Card className="rounded-none md:rounded-lg bg-transparent md:bg-card w-full h-full md:w-[420px] md:h-auto">
                    <div className="text-right">
                    <ModeToggle/>
                    </div>
                    <CardHeader className="flex-column items-center">
                        <Avatar className="w-[90px] h-[90px] mb-1">
                            <AvatarFallback>
                                <User size={45} />
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle>Iniciar sesión</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="mb-8">
                                            <FormLabel>Usuario</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nombre de usuario" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="mb-8">
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Mínimo 8 caracteres, al menos una letra y un número
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    <LogIn className="mr-2 h-4 w-4" /> Iniciar sesión
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

export default Login