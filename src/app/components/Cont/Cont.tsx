'use client'

import { useState, useEffect, useCallback } from "react";
import styles from "./Cont.module.css";

interface Parking {
    id: string
    pubname: string
    description: string
    status: string
    mapurl: string
    position: string
}

const PARKING_STATE = {
    CLOSE: 0,
    OPEN: 1,
    FULL: 2,
    CROWD: 3
}

interface StateText {
    STATE: string
    COLOR: string
}

export default function Cont() {
    const [parks, setParks] = useState<Parking[]>([]);
    const [texts, setTexts] = useState<StateText[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchParking = async () => {
        try{
            const res = await fetch('http://localhost:1323/api/park');
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            const state: Parking[] = await res.json();
            setParks(state);
        } catch(error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const getStateText = () => {       
        console.log(parks);     
        const newTexts = parks.map(park => {
            switch (Number(park.status)) {
                case PARKING_STATE.CLOSE:
                    return { STATE: "閉", COLOR: "#78909c" };
                case PARKING_STATE.OPEN:
                    return { STATE: "空", COLOR: "#1976d2" };
                case PARKING_STATE.CROWD:
                    return { STATE: "混", COLOR: "#cf5f3d" };
                case PARKING_STATE.FULL:
                    return { STATE: "満", COLOR: "#f44336" };
                default:
                    return { STATE: "?", COLOR: "#f44336" };
            }
        });

        setTexts(newTexts);
    };

    useEffect(() => {
        fetchParking();
    }, []);

    useEffect(() => {
        getStateText();
    }, [parks]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const combinedData = parks && parks.map((park, index) => ({
        ...park,
        ...texts[index], // textsの各項目をparkに統合
    }));

    return (
        combinedData?.map(data => {
            return (
            <div key={data.id}>
                <div className={styles.rootcont}>
                    <div className={`${styles.row} ${styles.cont}`}>
                        <div className={styles.menuclass}>
                            <h1 className={styles.statbox} style={{marginTop: "12px", backgroundColor: data.COLOR}}>{data.STATE}</h1>
                            <div>
                                <h3 style={{marginTop: "12px"}}>{data.pubname}</h3>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div>
                            <button type="button">経路</button>
                            <br />
                            <button type="button">編集</button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            )
        })
    )
}