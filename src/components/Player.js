import React, { useEffect, useRef } from 'react'
import '../sass/player.scss'



//UI
import shadow from '../assets/UI/Shadow.png'

//character
import redNinja_idle from '../assets/characters/redNinja/Action/Idle.png'
import redNinja_jump from '../assets/characters/redNinja/Action/Jump.png'
import redNinja_walk from '../assets/characters/redNinja/Action/Walk.png'
import redNinja_dead from '../assets/characters/redNinja/Action/Dead.png'
import redNinja_attack from '../assets/characters/redNinja/Action/Attack.png'
import redNinja_skill1 from '../assets/characters/redNinja/Skill/Skill1.png'
import redNinja_skill2 from '../assets/characters/redNinja/Skill/Skill2.png'
import redNinja_skill3 from '../assets/characters/redNinja/Skill/Skill3.png'
import redNinja_skill4 from '../assets/characters/redNinja/Skill/Skill4.png'

import yellowNinja_idle from '../assets/characters/yellowNinja/Action/Idle.png'
import yellowNinja_jump from '../assets/characters/yellowNinja/Action/Jump.png'
import yellowNinja_walk from '../assets/characters/yellowNinja/Action/Walk.png'
import yellowNinja_dead from '../assets/characters/yellowNinja/Action/Dead.png'
import yellowNinja_attack from '../assets/characters/yellowNinja/Action/Attack.png'
import yellowNinja_skill1 from '../assets/characters/yellowNinja/Skill/Skill1.png'
import yellowNinja_skill2 from '../assets/characters/yellowNinja/Skill/Skill2.png'
import yellowNinja_skill3 from '../assets/characters/yellowNinja/Skill/Skill3.png'
import yellowNinja_skill4 from '../assets/characters/yellowNinja/Skill/Skill4.png'

import blueNinja_idle from '../assets/characters/blueNinja/Action/Idle.png'
import blueNinja_jump from '../assets/characters/blueNinja/Action/Jump.png'
import blueNinja_walk from '../assets/characters/blueNinja/Action/Walk.png'
import blueNinja_dead from '../assets/characters/blueNinja/Action/Dead.png'
import blueNinja_attack from '../assets/characters/blueNinja/Action/Attack.png'
import blueNinja_skill1 from '../assets/characters/blueNinja/Skill/Skill1.png'
import blueNinja_skill2 from '../assets/characters/blueNinja/Skill/Skill2.png'
import blueNinja_skill3 from '../assets/characters/blueNinja/Skill/Skill3.png'
import blueNinja_skill4 from '../assets/characters/blueNinja/Skill/Skill4.png'

import greenNinja_idle from '../assets/characters/greenNinja/Action/Idle.png'
import greenNinja_jump from '../assets/characters/greenNinja/Action/Jump.png'
import greenNinja_walk from '../assets/characters/greenNinja/Action/Walk.png'
import greenNinja_dead from '../assets/characters/greenNinja/Action/Dead.png'
import greenNinja_attack from '../assets/characters/greenNinja/Action/Attack.png'
import greenNinja_skill1 from '../assets/characters/greenNinja/Skill/Skill1.png'
import greenNinja_skill2 from '../assets/characters/greenNinja/Skill/Skill2.png'
import greenNinja_skill3 from '../assets/characters/greenNinja/Skill/Skill3.png'
import greenNinja_skill4 from '../assets/characters/greenNinja/Skill/Skill4.png'
function Player({useItem,playerType,statusPlayer,positionPlayer,bullet1,bullet2,bullet4,checkBull3}) {
    return (
        <>
            <div className="player__container">
                    {
                        playerType === 'red' ?
                            <>
                            <div className={`player__main ${statusPlayer}`} >
                                    <img src={redNinja_idle} alt="" id="idle" className={positionPlayer}></img>
                                    <img src={redNinja_walk} alt="" id="walk" className={positionPlayer}></img>
                                    <img src={redNinja_attack} alt="" id="attack" className={positionPlayer}></img>
                                    <img src={redNinja_dead} alt="" id="dead" className={positionPlayer}></img>
                                    <img src={redNinja_jump} alt="" id="jump" className={positionPlayer}></img>
                                </div>
                                <div className={`player__skill ${positionPlayer}`}>
                                    <div className={`player__skill__s1 ${bullet1}`}>
                                        <img src={redNinja_skill1} alt=""></img>
                                    </div>
                                    <div className={`player__skill__s2 ${bullet2}`}>
                                        <img src={redNinja_skill2} alt=""></img>
                                    </div>
                                    <div className={`player__skill__s4 ${bullet4}`}>
                                        <img src={redNinja_skill4} alt=""></img>
                                    </div>
                                    <div className={`player__skill__s3 ${checkBull3}`}>
                                        <img src={redNinja_skill3} alt=""></img>
                                    </div>
                                </div>
                            </>
                        : playerType === 'yellow' ?
                            <>
                                <div className={`player__main ${statusPlayer}`} >
                                    <img src={yellowNinja_idle} alt="" id="idle" className={positionPlayer}></img>
                                    <img src={yellowNinja_walk} alt="" id="walk" className={positionPlayer}></img>
                                    <img src={yellowNinja_attack} alt="" id="attack" className={positionPlayer}></img>
                                    <img src={yellowNinja_dead} alt="" id="dead" className={positionPlayer}></img>
                                    <img src={yellowNinja_jump} alt="" id="jump" className={positionPlayer}></img>
                                </div>
                                <div className={`player__skill ${positionPlayer}`}>
                                    <div className={`player__skill__s1 ${bullet1}`}>
                                        <img src={yellowNinja_skill1} alt=""></img>
                                    </div>
                                    <div className={`player__skill__s2 ${bullet2}`}>
                                        <img src={yellowNinja_skill2} alt=""></img>
                                    </div>
                                    <div className={`player__skill__s4 ${bullet4}`}>
                                        <img src={yellowNinja_skill4} alt=""></img>
                                    </div>
                                    <div className={`player__skill__s3 ${checkBull3}`}>
                                        <img src={yellowNinja_skill3} alt=""></img>
                                    </div>
                                </div>
                            </>
                            : playerType === 'green' ?
                                <>
                                    <div className={`player__main ${statusPlayer}`} >
                                        <img src={greenNinja_idle} alt="" id="idle" className={positionPlayer}></img>
                                        <img src={greenNinja_walk} alt="" id="walk" className={positionPlayer}></img>
                                        <img src={greenNinja_attack} alt="" id="attack" className={positionPlayer}></img>
                                        <img src={greenNinja_dead} alt="" id="dead" className={positionPlayer}></img>
                                        <img src={greenNinja_jump} alt="" id="jump" className={positionPlayer}></img>
                                    </div>
                                    <div className={`player__skill ${positionPlayer}`}>
                                        <div className={`player__skill__s1 ${bullet1}`}>
                                            <img src={greenNinja_skill1} alt=""></img>
                                        </div>
                                        <div className={`player__skill__s2 ${bullet2}`}>
                                            <img src={greenNinja_skill2} alt=""></img>
                                        </div>
                                        <div className={`player__skill__s4 ${bullet4}`}>
                                            <img src={greenNinja_skill4} alt=""></img>
                                        </div>
                                        <div className={`player__skill__s3 ${checkBull3}`}>
                                            <img src={greenNinja_skill3} alt=""></img>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={`player__main ${statusPlayer}`} >
                                        <img src={blueNinja_idle} alt="" id="idle" className={positionPlayer}></img>
                                        <img src={blueNinja_walk} alt="" id="walk" className={positionPlayer}></img>
                                        <img src={blueNinja_attack} alt="" id="attack" className={positionPlayer}></img>
                                        <img src={blueNinja_dead} alt="" id="dead" className={positionPlayer}></img>
                                        <img src={blueNinja_jump} alt="" id="jump" className={positionPlayer}></img>
                                    </div>
                                    <div className={`player__skill ${positionPlayer}`}>
                                        <div className={`player__skill__s1 ${bullet1}`}>
                                            <img src={blueNinja_skill1} alt=""></img>
                                        </div>
                                        <div className={`player__skill__s2 ${bullet2}`}>
                                            <img src={blueNinja_skill2} alt=""></img>
                                        </div>
                                        <div className={`player__skill__s4 ${bullet4}`}>
                                            <img src={blueNinja_skill4} alt=""></img>
                                        </div>
                                        <div className={`player__skill__s3 ${checkBull3}`}>
                                            <img src={blueNinja_skill3} alt=""></img>
                                        </div>
                                    </div>
                                </>
                }
                <div className='player__name enemy'>
                    <span>Khoi</span>
                </div>
                {/* <div className='player__title'>
                    <span>ĐỘC CÔ CẦU BẠI</span>
                </div> */}
                <div className='player__team nam trung bac dao'>
                    <span>ĐẢO</span>
                </div>
                <img className="player__shadow" src={shadow} alt=""></img>
            </div>
        </>
    )
}

export default Player