import React, { useEffect, useRef, useState } from 'react'
import '../sass/gameUI.scss'
import { onValue, ref, onDisconnect, set } from 'firebase/database'
import db from '../data/Firebase'



//UI
import Skill3 from '../assets/UI/Skill3.png'
import bag from '../assets/UI/bag.png'
import close from '../assets/UI/close.png'
import money from '../assets/UI/money.png'
import btnNext from '../assets/UI/btnNext.png'
import btnPrev from '../assets/UI/btnPrev.png'

import Skill1 from '../assets/UI/Skill1.png'
import Skill2 from '../assets/UI/Skill2.png'
import Skill4 from '../assets/UI/Skill4.png'
import facesetbox from '../assets/UI/FacesetBox.png'
import hpsetbox from '../assets/UI/HpsetBox.png'
import mpsetbox from '../assets/UI/MpsetBox.png'
import namesetbox from '../assets/UI/NamesetBox.png'
import hp from '../assets/UI/hp.png'
import mp from '../assets/UI/mp.png'
import redNinja_faceset from '../assets/characters/redNinja/UI/Faceset.png'
import yellowNinja_faceset from '../assets/characters/yellowNinja/UI/Faceset.png'
import blueNinja_faceset from '../assets/characters/blueNinja/UI/Faceset.png'
import greenNinja_faceset from '../assets/characters/greenNinja/UI/Faceset.png'

//food
import meat from '../assets/food/Meat.png'
import fish from '../assets/food/Fish.png'

//Pets
import cat1 from '../assets/pets/catAvata1.png'
import cat2 from '../assets/pets/catAvata2.png'
import cat3 from '../assets/pets/catAvata3.png'
import cat4 from '../assets/pets/catAvata4.png'
import dog1 from '../assets/pets/dogAvata1.png'
import dog3 from '../assets/pets/dogAvata3.png'
import dog4 from '../assets/pets/dogAvata4.png'
import dog2 from '../assets/pets/dogAvata2.png'



function GameUI({playerCurrent, listCharacter, idAccount, playerType, handleEvent }) {
    const [arrIdSameArea, setArrIdSameArea] = useState([''])

    const [idChatCurrent, setIdChatCurrent] = useState(null)
    const [listChatCurrent, setListChatCurrent] = useState([''])

    const arr = [cat1, cat2, cat3, cat4, dog1, dog2, dog3, dog4]
    const [checkEvent, setCheckEvent] = useState(false)
    const [filter, setFilter] = useState('all')
    const [moneyCurrent, setMoneyCurrent] = useState(0)
    const moneyValue = 1011000000;
    
    const kFormatter = (num) => {
        return Math.abs(num) < 1000 ?
            Math.sign(num) * Math.abs(num) :
            Math.abs(num) >= 1000 && Math.abs(num) < 1000000 ?
                Math.sign(num) * ((Math.abs(num) / 1000).toFixed(2)) + 'Ngàn' :
                Math.abs(num) >= 1000000 && Math.abs(num) < 1000000000 ?
                    Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(2)) + 'Triệu' :
                    Math.sign(num) * ((Math.abs(num) / 1000000000).toFixed(2)) + 'Tỉ'
    }
    useEffect(() => {
        setMoneyCurrent(moneyValue)
        onValue((ref(db, `chat/all/idCurrent`)), (snapshot) => {
            const data = snapshot.val().value;
            setIdChatCurrent(data)
        })
        let list = {value:"key"}; 
        onValue((ref(db, `chat/all/content`)), (snapshot) => {
            try {
                const data = snapshot.val(); 
                list = Object.values(data)
                setListChatCurrent(list)
            } catch (error) {
                // ...do something with error
            }
        })
        if (playerCurrent !== null && listCharacter !== null) {
            
            let tmp = listCharacter.filter(e => (
                playerCurrent.team.value===e.team.value
            ))
            tmp.map(e => {
                setArrIdSameArea(pre=>[...pre,e.idPlayer.value])
            })
        }
    }, [])
    

    const handleShowEvent = () => {
        handleEvent();
        setCheckEvent(!checkEvent)
        setFilter('all')
    }
    const handleFood = () => {

        setFilter('food')
    }
    const handlePet = () => {

        setFilter('pet')
    }
    const handleAll = () => {

        setFilter('all')
    }
    
    const [itemCurrent, setItemCurrent] = useState(null)
    const [item, setItem] = useState([
        {
            type: 'pet',
            itemId: 1,
            itemAmount: 1,
        },
        {
            itemAmount: 10,
            type: 'food',
            itemId: 1
        }
        , {
            itemAmount: 10,
            type: 'food',
            itemId: 2
        }
    ])
    const [pageCurrent, setPageCurrent] = useState(1)
    const [bags, setbags] = useState(
        [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
            {
                id: 4,
            },
            {
                id: 5,
            },
            {
                id: 6,
            },
            {
                id: 7,
            },
            {
                id: 8,
            },
            {
                id: 9,
            },
            {
                id: 10,
            },
            {
                id: 11,
            },
            {
                id: 12,
            },
            {
                id: 13,
            },
            {
                id: 14,
            },
            {
                id: 15,
            },
            {
                id: 16,
            },
            {
                id: 17,
            },
            {
                id: 18,
            },
            {
                id: 19,
            },
            {
                id: 20,
            },
            {
                id: 21,
            },
            {
                id: 22,
            },
            {
                id: 23,
            },
            {
                id: 24,
            },
            {
                id: 25,
            },
            {
                id: 26,
            },
            {
                id: 27,
            },
            {
                id: 28,
            },
            {
                id: 29,
            },
            {
                id: 30,
            },
            {
                id: 31,
            },
            {
                id: 32,
            },
            {
                id: 33,
            },
            {
                id: 34,
            },
            {
                id: 35,
            },
            {
                id: 36,
            },
            {
                id: 37,
            },
            {
                id: 38,
            },
            {
                id: 39,
            },
            {
                id: 40,
            }
        ]
    )
    const handleNext = () => {
        if (pageCurrent * 20 === bags.length) {
            return
        }
        else setPageCurrent(pre => pre += 1)
    }
    const handlePrev = () => {

        if (pageCurrent === 1) {
            return
        }
        else setPageCurrent(pre => pre -= 1)
    }
    useEffect(() => {
        let current;
        if (filter === 'all') {
            setItemCurrent(item)
        }
        else if (filter === 'food') {
            current = item.filter(it => {
                return it.type === 'food'
            })
            setItemCurrent(current)
            
        }
        else if (filter === 'pet') {
            current = item.filter(it => {
                return it.type === 'pet'
            })
            setItemCurrent(current)
        }
    }, [filter, item])
    const [statusChatBox, setStatusChatBox] = useState('up')
    const handleResizeChat = () => {
        statusChatBox === 'down' ? setStatusChatBox('up') : setStatusChatBox('down');
    }
    const [channel, setChannel] = useState('public')
    const handleChannel = (a) => {
        a === 'public' ? setChannel('public') : setChannel('private');
    }
    const [showChannel, setShowChannel] = useState(false)
    const handleShowChannel = () => {
        !showChannel ? setShowChannel(true) : setShowChannel(false)
    }
    const scrollBottom = useRef(null)
    useEffect(() => {
        if (listChatCurrent !== null && arrIdSameArea !== null &&scrollBottom !== null) {
            let xH;
            xH = scrollBottom.current.scrollHeight;
            setTimeout(() => {
                scrollBottom.current.scrollTo(0, xH);
            }, 100)
            
            if (listChatCurrent.length > 100) {

                let id = idChatCurrent;
                
                set(ref(db, `chat/all/content/`), {
                })
                set(ref(db, `chat/all/content/${id}`), {
                    content: 'Clear tin nhắn xin lỗi vì sự bất tiện này!!',
                    idPlayer: 0,
                    type: 'all',
                })
                set(ref(db, `chat/all/idCurrent`), {
                    value: id += 1
                })
            }
        }
    }, [listChatCurrent,arrIdSameArea,channel,statusChatBox,idChatCurrent])
    const [inputCurrent, setInputCurrent] = useState('')
    let timer;
    const [checkChat,setCheckChat] = useState(true)
    const handleSubmit = (e) => {
        let id = idChatCurrent;
        if (e.key === 'Enter' && inputCurrent !== '') {
            if (channel === 'public' && checkChat) {
                setCheckChat(false)
                set(ref(db, `chat/all/content/${id}`), {
                    content: inputCurrent,
                    idPlayer: idAccount,
                    type: channel,
                })
                set(ref(db, `user/${idAccount}/message/`), {
                    content:inputCurrent
                })
                setTimeout(() => {
                    set(ref(db, `user/${idAccount}/message/`), {
                        content:''
                    })
                    setCheckChat(true)
                },3000)
            }
            else if(channel === 'private') {
                set(ref(db, `chat/all/content/${id}`), {
                    content: inputCurrent,
                    idPlayer: idAccount,
                    type: channel,
                })
                
            }
            set(ref(db, `chat/all/idCurrent`), {
                value: id += 1
            })
            setInputCurrent('')
        }
        if (e === 'click' && inputCurrent !== '') {
            if (channel === 'public' && checkChat) {
                setCheckChat(false)
                set(ref(db, `chat/all/content/${id}`), {
                    content: inputCurrent,
                    idPlayer: idAccount,
                    type: channel,
                })
                set(ref(db, `user/${idAccount}/message/`), {
                    content:inputCurrent
                })
                setTimeout(() => {
                    set(ref(db, `user/${idAccount}/message/`), {
                        content:''
                    })
                    setCheckChat(true)
                },3000)
            }
            else if(channel === 'private'){
                set(ref(db, `chat/all/content/${id}`), {
                    content: inputCurrent,
                    idPlayer: idAccount,
                    type: channel,
                })
            }
            set(ref(db, `chat/all/idCurrent`), {
                value: id += 1
            })
            setInputCurrent('')
            
        }
    }
    const handleGetNameWithId = (a) => {
        if (listCharacter !== null) {
            let tmp = listCharacter.filter(e => (
                e.idPlayer.value === a
            ))
            
            return tmp[0].name.value;
        }
        
    }
    const handleGetTeamWithId = (a) => {
        if (listCharacter !== null) {
            let tmp = listCharacter.filter(e => (
                e.idPlayer.value === a
            ))
            
            return tmp[0].team.value;
        }
        
    }
    return (
        <>
            <div className='game__skill'  >
                <ul>
                    <li>
                        <span className='game__skill__attack1'></span>
                        <div className='game__skill__overlay1'></div>
                        <img src={Skill1} alt=""></img>
                    </li>
                    <li>
                        <span className='game__skill__attack2'></span>
                        <div className='game__skill__overlay2'></div>
                        <img src={Skill2} alt=""></img>
                    </li>
                    <li>
                        <span className='game__skill__attack3'></span>
                        <div className='game__skill__overlay3'></div>
                        <img src={Skill3} alt=""></img>
                    </li>
                    <li>
                        <span className='game__skill__attack4'></span>
                        <div className='game__skill__overlay4'></div>
                        <img src={Skill4} alt=""></img>
                    </li>
                </ul>
            </div>
            <div className='game__info'>
                <div className='game__avatar'>
                    <div className='game__avatar__box' style={{ background: `url(${facesetbox}) no-repeat`, backgroundSize: 'cover'}}>
                        <img src={playerCurrent.type.type === "red"
                            ? redNinja_faceset : playerCurrent.type.type === "blue"
                            ? blueNinja_faceset : playerCurrent.type.type === "green"
                            ? greenNinja_faceset : yellowNinja_faceset} alt="">
                        </img>
                    </div>
                </div>
                <div className='game__health'>
                    <div className='game__name__box' style={{ background: `url(${namesetbox}) no-repeat`, backgroundSize: 'cover'}}>{playerCurrent.name.value}</div>
                    <div className='game__health__box'  style={{ background: `url(${hpsetbox}) no-repeat`, backgroundSize: 'cover'}}>
                        <div className='game__health__hp'>
                            <img src={hp} alt="" style={{right:'0'}}></img>
                        </div>
                    </div>
                    <div className='game__health__box'  style={{ background: `url(${mpsetbox}) no-repeat`, backgroundSize: 'cover'}}>
                        <div className='game__health__ki'>
                            <img src={mp} alt="" style={{right:'0'}}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className='game__menu'>
                <div className='game__bag'>
                    <div className='game__bag__icon' onClick={handleShowEvent}>
                        <img src={bag}  alt="" ></img>
                    </div>
                    {
                        checkEvent&&<div className='game__bag__container'>
                            <div className='game__bag__header'>
                                <div className='fake'></div>
                                <div className='game__bag__name'>TÚI</div>
                                <img src={close} alt="" className='game__bag__close' onClick={handleShowEvent}></img>
                            </div>
                            <div className='game__bag__box'>
                                {
                                    bags && bags.map((e, i) => (
                                        pageCurrent&&i+1<=pageCurrent*20&&i+1>(pageCurrent-1)*20&&
                                        <div className='game__bag__box__item' key={e.id}>
                                            {
                                                itemCurrent && itemCurrent.map((item, j) => (
                                                    i === j &&
                                                        (
                                                            item.type === 'pet'
                                                                ?
                                                                arr.map((array, index) => (
                                                                    item.itemId === index + 1
                                                                    && <div key={item} className="bags__group">
                                                                            <img className="bags__pet" src={array} alt=""></img>
                                                                            <div className='bags__amount'>x{item.itemAmount}</div>
                                                                            <div className={`bags__info bags__info__pet`}>
                                                                                <div className='bags__info__img'>
                                                                                    <img src={array} alt="pet"></img>
                                                                                    <span>Thú cưng</span>
                                                                                </div>
                                                                                <div className='bags__info__text'>
                                                                                    <h1>Chi tiết:</h1>
                                                                                    <span>Con pet vô dụng nhất phế vật thật sự.</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                ))
                                                                :
                                                            item.type === 'food' &&
                                                            <div key={item} className="bags__group">
                                                                <img className="bags__food" src={item.itemId === 1 ? meat : fish} alt=""></img>
                                                                    <div className='bags__amount'>x{item.itemAmount}</div>
                                                                    <div className={`bags__info bags__info__${item.itemId === 1 ? `meat` : `fish`}`}>
                                                                        <div className='bags__info__img'>
                                                                            <img src={item.itemId === 1 ? meat : fish} alt="food"></img>
                                                                            <span>Thức ăn</span>
                                                                        </div>
                                                                        <div className='bags__info__text'>
                                                                            <h1>Chi tiết:</h1>
                                                                            <span>{item.itemId === 1 ? `Miếng thịt bò ăn vào tăng 1000hp` : `Thịt con cá ăn vào tăng 1000MP`}</span>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                        )
                                                ))
                                                
                                            }
                                        </div>
                                    
                                    ))
                                }
                            </div>
                            <div className='game__bag__control'>
                                <div className='game__bag__info'>
                                    <div className='game__bag__paging'>
                                        <img src={btnPrev} onClick={handlePrev}></img>
                                        <span>{pageCurrent}/2</span>
                                        <img src={btnNext} onClick={handleNext}></img>
                                    </div>
                                    <div className='game__bag__gold'>
                                        <img src={money} alt=""></img>
                                        <span>{kFormatter(moneyCurrent)}</span>
                                    </div>
                                </div>
                                <div className={`game__bag__button game__bag__${filter}`}>
                                    <span onClick={handleFood}>Thức ăn</span>
                                    <span onClick={handlePet}>Thú cưng</span>
                                    <span onClick={handleAll}>Tất cả</span>
                                </div>
                            </div>
                    </div>
                    }
                    
                </div>
                <div className='game__chat'>
                    <div className={`game__chat__container ${statusChatBox}`}>
                        <i className={`fa-solid fa-angles-up ${statusChatBox}`} onClick={handleResizeChat}></i>
                            <div className='game__chat__box' ref={scrollBottom}>
                                {listChatCurrent !== null&&arrIdSameArea!==null&&(
                                    channel === 'public' ?
                                            listChatCurrent.map(e => [
                                                (e.type === 'public'||e.type==='all') && <div key={e} className='game__chat__item'>
                                                    {
                                                        e.idPlayer === 0 ? <>
                                                            <span className={`name noti`}>--THÔNG BÁO--:</span>
                                                            <span className='content noti'>{e.content}</span>
                                                        </>
                                                            :
                                                            <>
                                                                <div className={`name ${idAccount === e.idPlayer && 'main'}`}><span>{handleGetTeamWithId(e.idPlayer)}</span>-{handleGetNameWithId(e.idPlayer)}:</div>
                                                                <span className='content'>{e.content}</span>
                                                            </>
                                                    }
                                                </div>
                                            ])
                                        :
                                        listChatCurrent.map(e => [
                                            (e.type === 'private' || e.type === 'all') &&
                                            <div key={e} className='game__chat__item'>
                                                {
                                                        e.idPlayer === 0 ? <>
                                                            <span className={`name noti`}>--THÔNG BÁO--:</span>
                                                            <span className='content noti'>{e.content}</span>
                                                        </>
                                                            :arrIdSameArea.includes(e.idPlayer) === true&&
                                                            <>
                                                                <div className={`name ${idAccount === e.idPlayer && 'main'}`}><span>{handleGetTeamWithId(e.idPlayer)}</span>-{handleGetNameWithId(e.idPlayer)}:</div>
                                                                <span className='content'>{e.content}</span>
                                                            </>
                                                    }
                                            </div>
                                        ])
                                )
                            }
                            </div>
                        <div className='game__chat__control'>
                            <div className='game__chat__changeSv' onClick={handleShowChannel}>{ channel==='public'?'Cả nước':'Khu vực'}
                                {
                                    showChannel && (
                                        <div className='game__chat__changeSv__list'>
                                            <span onClick={()=>handleChannel('public')}>Cả nước</span>
                                            <span onClick={()=>handleChannel('private')}>Khu vực</span>
                                        </div>
                                    )
                                }
                                
                            </div>
                            <input
                                onKeyDown={handleSubmit}
                                className='game__chat__input'
                                value={inputCurrent}
                                onChange={(e) => { setInputCurrent(e.target.value) }}
                                maxLength="40"
                            ></input>
                            <span
                                onClick={() => handleSubmit('click')}
                                className={`game__chat__submit ${checkChat===false&&'disable'}`}
                            >gửi</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default GameUI