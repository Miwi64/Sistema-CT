import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { UseFormReturn } from 'react-hook-form'

interface StudentProps {
    form: UseFormReturn<any>
}

const StudentForm = ({ form }: StudentProps) => {
    return (
        <>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem className="mt-5 mb-8">
                        <FormLabel>Usuario</FormLabel>
                        <FormControl>
                            <Input placeholder="Nombre de usuario" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export default StudentForm