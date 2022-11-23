import React, { useEffect, useState } from 'react'
import '../sass/pet.scss'
import { ref, set, update} from 'firebase/database'
import db  from '../data/Firebase'
//Pets
import cat1 from '../assets/pets/cat1.png'
import cat2 from '../assets/pets/cat2.png'
import cat3 from '../assets/pets/cat3.png'
import cat4 from '../assets/pets/cat4.png'
import dog1 from '../assets/pets/dog1.png'
import dog3 from '../assets/pets/dog3.png'
import dog4 from '../assets/pets/dog4.png'
import dog2 from '../assets/pets/dog2.png'
function Pet({idAccount, petType, positionPlayer, statusPlayer, playerMove,dataPosition,dataStatus,dataLocal }) {
    const arr = [cat1,cat2,cat3,cat4,dog1,dog2,dog3,dog4]
    const [petMove, setPetMove] = useState(playerMove)
    const [petPositon, setPetPostion] = useState(positionPlayer)
    const [statusPet, setStatusPet] = useState(statusPlayer)
    const [checkTop,setCheckTop] = useState(false)
    useEffect(() => {
        if (statusPlayer === 'walk') {
            if (Math.abs(petMove.x - playerMove.x) > 50) {
                console.log(Math.abs(petMove.x - playerMove.x))
                if (positionPlayer === 'Right') {
                    // console.log(petMove)
                    setPetMove(pre => ({ ...pre, x: petMove.x += 4 }))
                    setCheckTop(true)
                    setStatusPet('walk')
                    setPetPostion('Right')
                }
                else if (positionPlayer === 'Left') {
                    setPetMove(pre => ({ ...pre, x: petMove.x -= 4 }))
                    setStatusPet('walk')
                    setPetPostion('Left')
                }
            }
            else {
                setCheckTop(false)
            }
            if (Math.abs(petMove.y - playerMove.y) > 50) {
                console.log(Math.abs(petMove.y - playerMove.y))

                if (positionPlayer === 'Bottom') {
                    setPetMove(pre => ({ ...pre, y: petMove.y += 4 }))
                    setStatusPet('walk')
                    setPetPostion('Bottom')
                }
                else if (positionPlayer === 'Top') {
                    setPetMove(pre => ({ ...pre, y: petMove.y -= 4 }))
                    setStatusPet('walk')
                    setPetPostion('Top')
                }
            }
        }
        else {
            setStatusPet('idle')
        }
    }, [playerMove, positionPlayer, statusPlayer,petMove])
    useEffect(() => {
        update(ref(db, `user/${idAccount}/pet/localPet`), {
            x:playerMove.x,
            y:playerMove.y
        })
        update(ref(db, `user/${idAccount}/pet/status`), {
            value:statusPet
        })
        update(ref(db, `user/${idAccount}/pet/directionPet`), {
            value:petPositon
        })
    }, [statusPet, petPositon, petMove])
  
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