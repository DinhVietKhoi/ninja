import React, { useEffect, useState } from 'react'
import '../sass/loading.scss'
import loading from '../assets/background/backgroundLoad.png'
// import loading from '../assets/background/backgroundLoading.png'
function Loading({percentLoad,handlePercent}) {
    const [checkIncrease,setCheckIncrease] = useState(false)
    useEffect(() => {
        if (percentLoad === 130) {
            setCheckIncrease(true)
        }
        let timer;
        if (!checkIncrease) {
            timer = setTimeout(() => handlePercent(), 30)
        }
        return (() => {
            clearTimeout(timer)
        })
    },[percentLoad,checkIncrease])
    return (
        <div className='loading'>
            <img src={loading}></img>
            <div className='loading__progress'>
                <div className='loading__progress__container'>
                    <div className='loading__progress__task' style={percentLoad<100?{width:percentLoad+"%"}:{width:"100%"}}>
                    </div>
                    <span className='loading__progress__percent'>
                        {
                            percentLoad<100?percentLoad+"%":'100%'
                        }
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Loading