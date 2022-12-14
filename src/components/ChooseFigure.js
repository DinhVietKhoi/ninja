import React, { useEffect, useState } from 'react'
import { ref, set} from 'firebase/database'
import db from '../data/Firebase'

import '../sass/chooseFigure.scss'
import yellow from'../assets/background/yellowNinja.png'
import green from'../assets/background/greenNinja.png'
import blue from'../assets/background/blueNinja.png'
import red from '../assets/background/redNinja.png'
import bgGreen from'../assets/background/bgGreen.jpg'
import bgYellow from'../assets/background/bgYellow.jpg'
import bgBlue from'../assets/background/bgBlue.jpg'
import bgRed from'../assets/background/bgRed.jpg' 
import mapBase from'../assets/background/mapbase.png'
import bac from'../assets/background/pheBac.png'
import trung from'../assets/background/pheTrung.png'
import nam from'../assets/background/pheNam.png'
import dao from'../assets/background/pheDao.png'
function ChooseFigure({ listCharacter, idAccount,handleGame,playerCurrent }) {
  //kiem tra da tao nhan vat chua
  const [checkPlayer, setCheckPlayer] = useState(null)
  //kiem tra khu vuc da chon
  const [team, setTeam] = useState('dao')
  const handleTeam = (a) => {
    setTeam(a)
  }
  //kiem tra class nhan vat da chon
  const [checkClass, setCheckClass] = useState('red')
  const handleClass = (a) => {
    setCheckClass(a)
  }

   //kiem tra tao nhan vat dien day du thong tin chua
  const [checkPlay, setCheckPlay] = useState(false)
  //check ten co ng dang ky chua
  const [notificationName, setNotificationName] = useState(true)
  //get du lieu nhap ten tu nguoi dung
  const [namePlayer, setNamePlayer] = useState('')
  const handleSetName = (e) => {
    if(e.target.value.match("^[a-zA-Z0-9]*$") != null){
      setNamePlayer(e.target.value);
    }
  }
  useEffect(() => {
    let temp = listCharacter.filter(e => e.name.value.toLowerCase() === namePlayer.toLowerCase())
    if (temp.length < 1) {
      setNotificationName(true)
    }
    else {
      setNotificationName(false)
    }
    notificationName&&namePlayer.length>4? setCheckPlay(true) : setCheckPlay(false)
  }, [namePlayer, notificationName])
  useEffect(() => {
    let temp;
    if (idAccount !== null) {
      temp = listCharacter.filter(e => e.idPlayer.value === idAccount && e.name.value!=="")
      if (temp.length < 1) {
        setCheckPlayer(false)
      }
      else {
        setCheckPlayer(true)
      }
      
    }
  }, [idAccount,listCharacter])
  const handlePlay = () => {
    set(ref(db, `user/${idAccount}/isOnline`), {
      isOnline: true,
    })
    handleGame();
  }
  const handleCreate = () => {
    set(ref(db, `user/${idAccount}/name`), {
      value: namePlayer 
    })
    set(ref(db, `user/${idAccount}/team`), {
      value: team 
    })
    set(ref(db, `user/${idAccount}/type`), {
      type: checkClass 
    })

    setCheckPlayer(true)
  }
  return (
    <div className='choose'>
      {
        checkPlayer&& <img className='choose__bg' src={
          playerCurrent !== null && playerCurrent.type.type === 'red' ?
            bgRed : playerCurrent.type.type === 'blue' ?
              bgBlue : playerCurrent.type.type === 'yellow' ?
                bgYellow : bgGreen
        }
          alt=""
        ></img>
      }
      {
        checkPlayer ?
          <div className='choose__player'>
            {
            
              playerCurrent !== null &&
              <div className='choose__player__container'>
                  <span>C???p { playerCurrent.level.level}</span>
                <span>{ playerCurrent.name.value}</span>
                  <img
                    src={
                      playerCurrent.type.type === 'yellow' ?
                      yellow : playerCurrent.type.type === 'red' ?
                        red : playerCurrent.type.type === 'green' ?
                          green : blue
                    }
                    alt="" ></img>
              </div>
            }
            
          </div>
          :
          <div className='choose__create'>
            <div className={`choose__create__class ${checkClass}`}>
              <span className='choose__create__header'>CH???N L???P NH??N V???T</span>
              <ul className={`choose__create__list ${checkClass}`}>
                <li onClick={() => handleClass('red')}>Red</li>
                <li onClick={() => handleClass('blue')}>Blue</li>
                <li onClick={() => handleClass('green')}>Green</li>
                <li onClick={() => handleClass('yellow')}>Yellow</li>
              </ul>
              <span className='choose__create__title'>{checkClass} NINJA</span>
              <div className='choose__create__box'>
                {
                  checkClass === 'green' ?
                    <img className={checkClass} src={green} alt=""></img> :
                    checkClass === 'red' ?
                      <img className={checkClass} src={red} alt=""></img> :
                      checkClass === 'blue' ?
                        <img className={checkClass} src={blue} alt=""></img> :
                        <img className={checkClass} src={yellow} alt=""></img>
                }
              </div>
            </div>
            <div className='choose__create__team'>
              <div className='choose__create__header1'>
                <span>CH???N KHU V???C</span>
                {
                  team === 'dao' ? <span>?????O</span> :
                    team === 'nam' ? <span>MI???N NAM</span> :
                      team === 'bac' ? <span>MI???N B???C</span> :
                        <span>MI???N TRUNG</span>
                
                }
              </div>
              <div className='choose__create__start'></div>
              <img src={mapBase} alt=""></img>
              <div className={`choose__create__zone ${team}`}>
                <img src={bac} alt="" onClick={() => handleTeam('bac')}></img>
                <img src={trung} alt="" onClick={() => handleTeam('trung')}></img>
                <img src={nam} alt="" onClick={() => handleTeam('nam')}></img>
                <img src={dao} alt="" onClick={() => handleTeam('dao')}></img>
              </div>
            </div>
            <div className='choose__create__name'>
              <input value={namePlayer} type='text' maxLength="10" onChange={(e) => { handleSetName(e) }}></input>
              {namePlayer.length<=4 ?<span className='fail1'>?????t t??n nh??n v???t</span>:checkPlay&&checkPlay?<span className='success'>T??n c?? th??? ?????t</span>:<span className='fail2'>T??n ???? ???????c ?????t</span>}
            </div>
          </div>
      }
      {
        checkPlayer?<div className={`choose__play`}>
        <button onClick={handlePlay}>Ch??i Game </button>
      </div>:
        <div className={`choose__play ${!checkPlay?'disable':''}`}>
          <button onClick={handleCreate}>T???O NH??N V???T</button>
        </div>
      }
      
    </div>
  )
}

export default ChooseFigure