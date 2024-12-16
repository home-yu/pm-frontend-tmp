import Image from "next/image"
import React from "react"
import styles from "./MapDialog.module.css"

import { Button } from "../data"

export const MapDialog = () => {
    const handleOpenMapClick = () => {

    }

    return (
        <div>
            <dialog>
                <header></header>
                <div>
                    <div className={styles.menuclass}>
                        <Image 
                            src="https://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=google.com" 
                            alt="" 
                        />
                    </div>
                    <menu className={styles.menuclass}>
                        <Button onClick={handleOpenMapClick}>
                            <b>Google Mapsで開く</b>
                        </Button>
                    </menu>
                </div>
            </dialog>
        </div>
    )
}