import { Button, makeStyles, tokens } from '@fluentui/react-components'
import { AddCircle24Regular, DataArea24Regular, Home24Regular } from '@fluentui/react-icons'
import React from 'react'

const useStyle = makeStyles({
    menuContainer: {
        position:"fixed",
        zIndex: "9",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: tokens.colorNeutralBackground4,
        paddingTop:"20px",
        rowGap: "15px",
        paddingRight: "40px"
      }
})

const MenuBar = () => {
  const style = useStyle()
    return (
    <nav className={style.menuContainer}>
            <Button as='a' href='/dashboard' size='large' appearance='transparent' icon={<Home24Regular />}>Inicio</Button>
            <Button as='a' href='/dashboard/import' size='large' appearance='transparent' icon={<AddCircle24Regular />}>Importar datos</Button>
            <Button as='a' href='/dashboard/export' size='large' appearance='transparent' icon={<DataArea24Regular />}>Exportar datos</Button>
    </nav>
  )
}

export default MenuBar