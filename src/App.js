import DashBoard from "./components/DashBoard";
import Gameplay from "./components/Gameplay";
import { set, onValue, ref, onDisconnect } from 'firebase/database'
import db from './data/Firebase'
import ChooseFigure from "./components/ChooseFigure";

import './sass/base.scss'
import './sass/app.scss'
import { useEffect, useState } from "react";
import background from './assets/background/background.png'
import Loading from "./components/Loading";


function App() {
  const [idAccount,setIdAccount] = useState(null)
  const handleIdAccount = (a) => {
    setIdAccount(a)
  }
  //danh sach account nguoi choi 
  const [listAccount, setListAccount] = useState([])
  //id hien tai de dang ki nguoi moi
  const [idAccounrCurrent, setIdAccounrCurrent] = useState(null)
  //danh sach nhan vat da tao
  const [listCharacter, setListCharacter] = useState([])

  const [checkChoose,setCheckChoose] = useState(false)
  const [checkGame, setCheckGame] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [percentLoad, setPercentLoad] = useState(0)

  const [checkSide,setCheckSide] = useState(0)
  const handlePercent = () => {
    setPercentLoad(pre => pre += 1)
    
}
  const handleChoose = () => {
    setCheckLoading(true)
    setCheckSide(1)
  }
  const handleGame = () => {
    setCheckGame(!checkGame)
    setCheckSide(2)
  }
  useEffect(() => {
    if (percentLoad >= 60&&percentLoad<100) {
      if (checkSide === 1) {
        setCheckChoose(true)
      }
      else if (checkSide===2) {
        setCheckGame(true)
      }
    }
    else if (percentLoad >= 130) {
      setCheckLoading(false)
    }
  },[checkLoading,percentLoad])
  useEffect(()=>{
    // Get database 
      onValue((ref(db,'account/listAccount')),(snapshot)=>{
        const data = snapshot.val();
        const list = Object.values(data)
        setListAccount(list)
      })
      onValue((ref(db,'account/idAccount')),(snapshot)=>{
        const data = snapshot.val();
        const list = Object.values(data)
        setIdAccounrCurrent(data)
      })
      onValue((ref(db,'user')),(snapshot)=>{
        const data = snapshot.val();
        const list = Object.values(data)
        setListCharacter(list)
      })
    
  }, [])
  useEffect(() => {
    if (idAccount !== null) {
      onDisconnect(ref(db, `isOnline/${idAccount}`)).set({ isOnline: 'offline' });
    }
  },[idAccount])
  return (
    <div className="app">
      <div className="app__container">
        {
          !checkChoose&&!checkGame ?
            <DashBoard
              listAccount={listAccount}
              idAccounrCurrent={idAccounrCurrent}
              handleChoose={handleChoose}
              handleIdAccount={handleIdAccount}
            /> :
            checkChoose && !checkGame ?
              <ChooseFigure
                listCharacter={listCharacter}
                idAccount={idAccount}
              /> :
              <Gameplay />
        }
        {
          checkLoading && <Loading percentLoad={percentLoad} handlePercent={handlePercent} />
        }
      </div>
      
      <div className='app__banner' style={{background:`url(${background}) no-repeat`,backgroundSize: 'cover' }}></div>
    </div>
  );
}

export default App;
