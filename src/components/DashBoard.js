import React, { useEffect, useRef, useState } from 'react'

import '../sass/dashBoard.scss'
import logo1 from '../assets/background/IconLogo1.png'
import logo2 from '../assets/background/IconLogo2.png'
import text from '../assets/background/textLogo.jpg'
import Login from './Login'
import Register from './Register'
import { Toaster } from 'react-hot-toast'
function Dashboard({listAccount,idAccounrCurrent,handleChoose,handleIdAccount}) {
  const [formCurrent, setFormCurrent] = useState('login--active')
  const [checkLogo, setCheckLogo] = useState(true)
  const [checkNoti, setCheckNoti] = useState(true)
  const handleCheckNoti = (a) => {
    a==='ok'?setCheckNoti(true):setCheckNoti(false)
  }
  const handleChange = (a) => {
    if (a === 'l') {
      setFormCurrent('login--active')
    }
    else {
      setFormCurrent('register--active')
    }
    setCheckLogo(false)
  }
  useEffect(() => {
    let setTime;
    setTime=setTimeout(() => {
      setCheckLogo(true)
    }, 0);
      
    return (() => {
      clearTimeout(setTime)
    })
  },[formCurrent,checkLogo])
  
  return (
    <div className='dashBoard'>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
      </div>
      <div className='dashBoard__logo'>
        {
          checkLogo&&
          <img className="dashBoard__logo--img1" src={checkNoti?logo1:logo2} alt=""></img>
        }
        <img className="dashBoard__logo--img2" src={text} alt=""></img>
      </div>
      <div className='dashBoard__container'>
        <div className={`dashBoard__change ${formCurrent}`}>
          <span onClick={() => { handleChange('l')}}>Đăng Nhập</span>
          <span onClick={() => { handleChange('r')}}>Đăng Ký</span>
        </div>
        <div className='dashBoard__form'>
          {
          formCurrent==='login--active'?
              <Login
                listAccount={listAccount}
                handleCheckNoti={handleCheckNoti}
                handleChoose={handleChoose}
                handleIdAccount={handleIdAccount}
              /> :
              <Register
                listAccount={listAccount}
                handleCheckNoti={handleCheckNoti}
                idAccounrCurrent={idAccounrCurrent}
              />
          }
        </div>
      </div>
      {!checkNoti&&
        <div className='dashBoard__noti'>
          <div className='dashBoard__noti__container'></div>
          <div className='dashBoard__noti__content'>
            {
                formCurrent === 'login--active' ?
                  <>
                    <span>Đăng nhập thất bại!</span>
                    <span>Tài khoản hoặc mật khẩu không chính xác.</span>
                  </>
                  :
                  <>
                    <span>Đăng ký thất bại!</span>
                    <span>Tên đăng ký không hợp lệ hoặc bị trùng.</span>
                  </>
            }
          </div>
          <div className='dashBoard__noti__button' onClick={()=>{handleCheckNoti('ok')}}>
            <span >OK</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard