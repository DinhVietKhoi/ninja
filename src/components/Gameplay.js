import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../sass/gamePlay.scss'
import colise from '../data/Colise'

//Background
import map1 from '../assets/background/map.png'
import map2 from '../assets/background/mapForge.png'
import water from '../assets/background/water.gif'
//UI
import background from '../assets/background/background.png'
//npc
import GameUI from './GameUI'
import Player from './Player'
import Pet from './Pet'

function Gameplay() {
    let Event = false;
    const [positionPlayer, setPositionPlayer] = useState("Bottom");
    const [statusPlayer, setStatusPlayer] = useState("idle")
    const [mapMove, setMapMove] = useState({ x:0, y:0})
    const [playerMove, setPlayerMove] = useState({ x: 448, y: 224 })
    const [playerType,setPlayerType] = useState('yellow')
    const [petType,setPetType] = useState(1)
    let coliseMap = []
    let boundary = []
    const [boundaryState,setBoundaryState] = useState([])
    //check key move
    const [keyState, setKeyState] = useState(
        {
            KeyA: false,
            KeyD: false,
            KeyW: false,
            KeyS: false,
            Space: false
        }
    )
    const keyMove = {
        KeyA: false,
        KeyD: false,
        KeyW: false,
        KeyS: false,
        Space: false
    }
    //check skill
    const checkSkill = {
        Skill1: false,
        Skill2: false,
        Skill3: false,
        Skill4: false,
    }
    //check bullet
    const [bullet1,setBullet1] = useState('')
    const [bullet2,setBullet2] = useState('')
    const [bullet4, setBullet4] = useState('')
    const [checkBull1,setCheckBull1] = useState('')
    const [checkBull2,setCheckBull2] = useState('')
    const [checkBull3,setCheckBull3] = useState('')
    const [checkBull4,setCheckBull4] = useState('')
    //check animation skill
    const checkSkillAni = {
        Skill1: false,
        Skill2: false,
        Skill3: false,
        Skill4: false,
    }
    let MapPosition = { x: 0, y: 0 }
    let playerPositon = { x: 448, y: 224 }
    let speed = 1;
    let jumTime;

    const handleKeyup = (e) => {

        if (e.target.nodeName.toLowerCase() === 'input') {
            return;
        }
        if (e.code === 'KeyW' || e.code === 'ArrowUp') {
            keyMove.KeyW = false
            setKeyState(pre=>({...pre,KeyW:false}))
        }
        else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
            keyMove.KeyS = false
            setKeyState(pre=>({...pre,KeyS:false}))
        }
        else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            keyMove.KeyA = false
            setKeyState(pre=>({...pre,KeyA:false}))
        }
        else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            keyMove.KeyD = false
            setKeyState(pre=>({...pre,KeyD:false}))
        }
        else if (e.code === "Space" && keyMove.Space !== true) {
            clearTimeout(jumTime)
            setStatusPlayer('jump')
            keyMove.Space = true;
            setKeyState(pre=>({...pre,Space:true}))
            // eslint-disable-next-line react-hooks/exhaustive-deps
            jumTime = setTimeout(() => {
                        setStatusPlayer("idle")
                    keyMove.Space = false;
                    setKeyState(pre=>({...pre,Space:false}))
                    }, 500);
        }
    }
    const handleKeydown = (e) => {
        if (e.target.nodeName.toLowerCase() === 'input') {
            return;
        }
        if (e.code === 'KeyW' || e.code === 'ArrowUp') {
            keyMove.Space = false;
            keyMove.KeyW = true
            setKeyState(pre=>({...pre,KeyW:true,Space:false}))
        }
        else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
            keyMove.Space = false;
            keyMove.KeyS = true
            setKeyState(pre=>({...pre,KeyS:true,Space:false}))
        }
        else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            keyMove.Space = false;
            keyMove.KeyA = true
            setKeyState(pre=>({...pre,KeyA:true,Space:false}))

        }
        else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            keyMove.Space = false;
            keyMove.KeyD = true
            setKeyState(pre=>({...pre,KeyD:true,Space:false}))

        }
        else if ((e.code === 'Digit1' || e.code === 'Numpad1') && !checkSkill.Skill1) {
            checkSkillAni.Skill1 = true;
            checkSkill.Skill1 = true;
        }
        else if ((e.code === 'Digit2' || e.code === 'Numpad2') && !checkSkill.Skill2) {
            checkSkillAni.Skill2 = true;
            checkSkill.Skill2 = true;
        }
        else if ((e.code === 'Digit3' || e.code === 'Numpad3') && !checkSkill.Skill3) {
            checkSkillAni.Skill3 = true;
            checkSkill.Skill3 = true;
        }
        else if ((e.code === 'Digit4' || e.code === 'Numpad4') && !checkSkill.Skill4) {
            checkSkillAni.Skill4 = true;
            checkSkill.Skill4 = true;
        }
    }
    //Set keydown
    useEffect(() => {
        window.onresize = function () {
            window.location.reload();
        }
        
        document.addEventListener('keyup',handleKeyup)
        
        document.addEventListener('keydown', handleKeydown)
        const handleClick = (e) => {
            return false;
        }
        document.addEventListener('click',handleClick)
        return (() => {
            document.removeEventListener('keydown',handleKeydown)
            document.removeEventListener('keyup',handleKeyup)
        })
    }, [])
    //handle check stop move of player (max of map)
    const handleStop = (a, b) => {
        return (
            a.x + 60 >= b.x &&
            a.x <= b.x + 24 &&
            a.y <= b.y + 24 &&
            a.y + 48 >= b.y
        )
    }
    //handle move of player
    const movePlayer = (Event) => {
        if (Event) {
            setStatusPlayer('idle')
            return;
        }
        if (
            (
                keyMove.KeyW
                || keyMove.KeyS
                || keyMove.KeyA
                || keyMove.KeyD
            )
            && !keyMove.Space
            && !checkSkillAni.Skill1
            && !checkSkillAni.Skill2
            && !checkSkillAni.Skill3
            && !checkSkillAni.Skill4
        ) {
            setStatusPlayer('walk')
        }
        if (keyMove.KeyW) {
            let checkMove = true;
            // setTopMap(pre=>pre+=speed)
            for (let e of boundary) {
                let bou = e;
                bou = { ...bou,y: bou.y + 1};
                if (handleStop(playerPositon, bou)) {
                    checkMove = false;
                    break;
                }
            }
            if (checkMove === true) {
                MapPosition.y += speed;
                setMapMove(pre => ({ ...pre, y: pre.y += speed }))
                playerPositon = { ...playerPositon, y: Math.abs(MapPosition.y - 224) }
                setPlayerMove(pre=>({...pre, y: Math.abs(MapPosition.y - 224)}))
            }
            setPositionPlayer('Top')
        }
        else if (keyMove.KeyS) {
            let checkMove = true;
            // setTopMap(pre => pre -= speed)
            for (let e of boundary) {
                let bou = e;
                bou = { ...bou,y: bou.y - 1};
                if (handleStop(playerPositon, bou)) {
                    checkMove = false;
                    break;
                }
            }
            if (checkMove === true) {
                MapPosition.y -= speed
                setMapMove(pre => ({...pre,y:pre.y-=speed}))
                playerPositon = { ...playerPositon, y: 224 - MapPosition.y }
                setPlayerMove(pre=>({...pre, y: 224 - MapPosition.y}))
            }
            setPositionPlayer('Bottom')
        }
        else if (keyMove.KeyA) {
            let checkMove = true;
            // setLeftMap(pre => pre += speed)
            for (let e of boundary) {
                let bou = e;
                bou = { ...bou, x: bou.x + 1};
                if (handleStop(playerPositon, bou)) {
                    checkMove = false;
                    break;
                }
            }
            if (checkMove === true) {
                MapPosition.x += speed;
                setMapMove(pre => ({...pre,x:pre.x+=speed}))
                playerPositon = { ...playerPositon, x: Math.abs(MapPosition.x - 448) }
                setPlayerMove(pre=>({...pre, x: Math.abs(MapPosition.x - 448)}))
            }
            setPositionPlayer('Left')
        }
        else if (keyMove.KeyD) {
            let checkMove = true;
            // setLeftMap(pre => pre -= speed)
            for (let e of boundary) {
                let bou = e;
                bou = { ...bou, x: bou.x - 1};
                if (handleStop(playerPositon, bou)) {
                    checkMove = false;
                    break;
                }
            }
            if (checkMove === true) {
                MapPosition.x -= speed;
                setMapMove(pre => ({...pre,x:pre.x-=speed}))
                playerPositon = { ...playerPositon, x: 448 - MapPosition.x }
                setPlayerMove(pre=>({...pre, x: 448 - MapPosition.x}))
            }
            setPositionPlayer('Right')
        }
        else if (keyMove.Space && keyMove.KeyD) {
            setStatusPlayer('jump')
        }
        if (
            !keyMove.KeyW
            && !keyMove.KeyA
            && !keyMove.KeyD
            && !keyMove.KeyS
            && !keyMove.Space
            && !checkSkillAni.Skill1
            && !checkSkillAni.Skill2
            && !checkSkillAni.Skill3
            && !checkSkillAni.Skill4
        ) {
            setStatusPlayer('idle')
        }
    }
    //handle skill player
    const skillPlayer = () => {
        if (checkSkill.Skill1
            && !document.querySelector('.game__skill__overlay1').classList.contains('use')) {
            document.querySelector('.game__skill__overlay1').classList.add('use');
            setStatusPlayer('attack')
            setCheckBull1('use')
            setTimeout(() => {
                document.querySelector('.game__skill__overlay1').classList.remove('use');
                checkSkill.Skill1 = false;
                setCheckBull1('')
            }, 300)
            setTimeout(() => {
                checkSkillAni.Skill1=false
            },100)
        }
        if (checkSkill.Skill2
            && !document.querySelector('.game__skill__overlay2').classList.contains('use')) {
            document.querySelector('.game__skill__overlay2').classList.add('use');
            setStatusPlayer('attack')
            setCheckBull2(`use`)
            setTimeout(() => {
                document.querySelector('.game__skill__overlay2').classList.remove('use');
                checkSkill.Skill2 = false;
            }, 2000)
            setTimeout(() => {
                checkSkillAni.Skill2=false
            }, 100)
            setTimeout(() => {
                setCheckBull2('')
            },300)
        }
        if (checkSkill.Skill3
            && !document.querySelector('.game__skill__overlay3').classList.contains('use')) {
            document.querySelector('.game__skill__overlay3').classList.add('use');
            setStatusPlayer('attack')
            setCheckBull3(`use`)
            setTimeout(() => {
                checkSkillAni.Skill3=false
            },100)
            setTimeout(() => {
                document.querySelector('.game__skill__overlay3').classList.remove('use');
                checkSkill.Skill3 = false;
            }, 10000)
            setTimeout(() => {
                setCheckBull3('')
            },5000)
        }
        if (checkSkill.Skill4
            && !document.querySelector('.game__skill__overlay4').classList.contains('use')) {
            document.querySelector('.game__skill__overlay4').classList.add('use');
            setStatusPlayer('attack')
            setCheckBull4(`use`)
            setTimeout(() => {
                checkSkillAni.Skill4=false
            },100)
            setTimeout(() => {
                document.querySelector('.game__skill__overlay4').classList.remove('use');
                checkSkill.Skill4 = false;
            }, 15000)
            setTimeout(() => {
                setCheckBull4('')
            },300)
        }
    }
    useEffect(() => {
        if (checkBull1 === 'use' && bullet1 === '') {
            setBullet1(`${positionPlayer} use`)
        }
        if (checkBull2 === 'use' && bullet2 === '') {
            setBullet2(`${positionPlayer} use`)
        }
        
        if (checkBull4 === 'use' && bullet4 === '') {
            setBullet4(`${positionPlayer} use`)
        }
        
        if (checkBull1 === '') {
            setBullet1(``)

        }
        if (checkBull2 === '') {
            setBullet2(``)

        }
        if (checkBull4 === '') {
            setBullet4(``)

        }
        // setBullet1('')
    }, [bullet1, bullet2, bullet4, checkBull1, checkBull2, checkBull3, checkBull4, positionPlayer])
    const handleEvent = useCallback(() => {
        Event = !Event;
    }, [])
    useEffect(() => {
        requestAnimationFrame(animation)
        for (let i = 0; i < colise.length; i += 70){
            coliseMap.push(colise.slice(i,70+i))
        }
        
        coliseMap.forEach((coli,i) => {
            coli.forEach((e, j) => {
                if (e === 2182) {
                    boundary = [...boundary, {
                        x: j * 48,
                        y: i * 48
                    }]
                    setBoundaryState(pre=>[...pre,{x:j*48,y:i*48}])
                }
            })
        })
    }, [])
    const loopRef = useRef();
    const animation = useCallback((e) => {
            movePlayer(Event);
            skillPlayer();
            loopRef.current = requestAnimationFrame(animation)
        }, [])
    useEffect(() => {   
        loopRef.current = requestAnimationFrame(animation);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, animation]) 
    const handleGamePlay = {
        useItem: ()=> {
            //return item
        },
        changeHP: () => {
            //return hp
        },
        changeMP: () => {
            //return mp
            
        },
        positionPlayer: () => {
            //return x,y
            
        },
        directionPlayer: () => {
            //return left,right
        },
        statusPlayer: () => {
            //return idle,walk
        },
        positionPet: () => {
            //return x,y
        },
        directionPet: () => {
            //return left,right
        },
        statusPet: () => {
            //return idle,walk
        },
        register: () => {
            
        },
        login: () => {
            
        }
    }
    return (
        <div className='game'>
            <div className='map'>
                <div className="map__view">
                    <div className="map__full" style={{
                        background: `url(${map1}) no-repeat`,
                        top: `${mapMove.y}px`,
                        left: `${mapMove.x}px`,
                        backgroundSize:`3360px 1920px`
                    }}>
                        <div className='map__forge' style={{ background: `url(${map2}) no-repeat`, width: '100%', height: '100%', backgroundSize: '100% 100%', position: 'absolute', zIndex: '100'}} ></div>
                        <div className='map__pets'>
                            <Pet
                                petType={petType}
                                positionPlayer={positionPlayer}
                                statusPlayer={statusPlayer}
                                playerMove={playerMove}
                            />
                        </div>
                    </div>
                    <div className='map__fake'>
                        <div style={{ background: `url(${water})`, backgroundSize: '48px 48px' }}>
                        </div>
                    </div>
                    <Player
                        statusPlayer={statusPlayer}
                        playerType={playerType}
                        positionPlayer={positionPlayer}
                        bullet1={bullet1}
                        bullet2={bullet2}
                        bullet4={bullet4}
                        checkBull3={checkBull3}
                    />
                    <GameUI playerType={playerType} handleEvent={handleEvent} />
                </div>
            </div > 
        </div>
    )
}
export default Gameplay