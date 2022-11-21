import React, { useEffect, useState } from 'react'
import '../sass/pet.scss'

//Pets
import cat1 from '../assets/pets/cat1.png'
import cat2 from '../assets/pets/cat2.png'
import cat3 from '../assets/pets/cat3.png'
import cat4 from '../assets/pets/cat4.png'
import dog1 from '../assets/pets/dog1.png'
import dog3 from '../assets/pets/dog3.png'
import dog4 from '../assets/pets/dog4.png'
import dog2 from '../assets/pets/dog2.png'
function Pet({ petType, positionPlayer, statusPlayer, playerMove }) {
    const arr = [cat1,cat2,cat3,cat4,dog1,dog2,dog3,dog4]
    const [petMove, setPetMove] = useState({ x: 0, y: 0 })
    const [petPositon, setPetPostion] = useState('Bottom')
    const [statusPet,setStatusPet] = useState('idle')
    useEffect(() => {
        if (Math.abs(petMove.x - playerMove.x) > 50) {
            if (positionPlayer === 'Right') {
                setPetMove(pre => ({ ...pre, x: playerMove.x - 50 }))
                setStatusPet('walk')
                setPetPostion('Right')
            }
            else if (positionPlayer === 'Left') {
                setPetMove(pre => ({ ...pre, x: playerMove.x + 50 }))
                setStatusPet('walk')
                setPetPostion('Left')
            }
        }
        if (Math.abs(petMove.y - playerMove.y) > 50) {
            if (positionPlayer === 'Bottom') {
                setPetMove(pre => ({ ...pre, y: playerMove.y - 50 }))
                setStatusPet('walk')
                setPetPostion('Bottom')

            }
            else if (positionPlayer === 'Top') {
                setPetMove(pre => ({ ...pre, y: playerMove.y + 50 }))
                setStatusPet('walk')
                setPetPostion('Top')

            }
        }
        else if(statusPlayer==='idle') {
            setStatusPet('idle')
        }
    }, [playerMove, positionPlayer, statusPlayer])
    useEffect(() => {
        setPetMove(playerMove)
        setStatusPet('Idle')
    }, [])
    return (
        <div className={`pet ${petPositon} ${statusPet}`} style={{
            top: petMove.y, left: petMove.x
            // transform: `translate(${petMove.x}px,${petMove.y}px)`,

        }}>
            <img src={arr.filter((e,index) => (
                index===petType
            ))}
            alt=""></img>
        </div>
    )
}

export default Pet