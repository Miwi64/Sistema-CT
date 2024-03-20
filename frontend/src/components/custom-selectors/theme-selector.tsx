"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { notification } from '../responsive/notification'

const ThemeSelector = () => {
    const { theme, setTheme } = useTheme()
    const [select, setSelect] = useState(theme)
    return (
        <section className='grid gap-4'>
            <Select value={select} onValueChange={setSelect}>
                <SelectTrigger>
                    <SelectValue placeholder={theme} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
            </Select>
            <div>
                <Button onClick={() => { 
                    setTheme(select ? select : "system") 
                    notification("Cambios aplicados correctamente", "success", undefined, false)
            }}>Guardar cambios</Button>
            </div>
        </section>
    )
}

export default ThemeSelector