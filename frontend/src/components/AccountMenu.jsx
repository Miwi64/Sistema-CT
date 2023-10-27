import { Button, Title1, makeStyles, tokens } from '@fluentui/react-components'
import { AddCircle24Regular, DataArea24Regular, Home24Regular, SignOut24Regular } from '@fluentui/react-icons'
import React from 'react'

const useStyle = makeStyles({
    menuContainer: {
        position:"fixed",
        zIndex: "8",
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: tokens.colorNeutralBackground4,
        paddingTop:"20px",
        paddingBottom:"20px",
        paddingLeft:"20px",
        rowGap: "10px",
        paddingRight: "20px"
      }
})

const AccountMenu = () => {
  const style = useStyle()
    return (
    <div className={style.menuContainer}>
        <Title1>Usuario</Title1>
        <Button as='a' href='/login' icon={<SignOut24Regular />}>Cerrar sesión</Button>
    </div>
  )
}

export default AccountMenu