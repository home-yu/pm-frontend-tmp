import React from "react"

type BtnProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
}

export const Button = ({onClick, children}: BtnProps) => {
    return (
        <button onClick={onClick}>{children}</button>
    )
}