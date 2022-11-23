import DashBoard from "./components/DashBoard";
import Gameplay from "./components/Gameplay";
import { onValue, ref, onDisconnect, set } from 'firebase/database'
import db from './data/Firebase'
import ChooseFigure from "./components/ChooseFigure";

import './sass/base.scss'
import './sass/app.scss'
import { useEffect, useState } from "react";
import background from './assets/background/background.png'
import Loading from "./components/Loading";


function App() {
  const [getDB,setGetDB] = useState(true)
  const [checkOnline,setCheckOnline] = useState(false)
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
  const [checkChoose1,setCheckChoose1] = useState(false)
  const [checkGame1, setCheckGame1] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [percentLoad, setPercentLoad] = useState(0)

  const [checkSide,setCheckSide] = useState(0)
  const handlePercent = () => {
    setPercentLoad(pre => pre += 1)
    
}
  const handleChoose = () => {
    setCheckChoose1(true)
    setCheckLoading(true)
    setCheckSide(1)
  }
  const handleGame = () => {
    setCheckGame1(true)
    setCheckLoading(true)
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
      setPercentLoad(0)
    }
  },[checkLoading,percentLoad,checkSide])
  useEffect(()=>{
    // Get database 
      onValue((ref(db,'account/listAccount')),(snapshot)=>{
        const data = snapshot.val();
        const list = Object.values(data)
        setListAccount(list)
      })
      onValue((ref(db,'account/idAccount')),(snapshot)=>{
        const data = snapshot.val();
        // const list = Object.values(data)
        setIdAccounrCurrent(data)
      })
      onValue((ref(db,'user')),(snapshot)=>{
        const data = snapshot.val();
        const list = Object.values(data)
        setListCharacter(list)
      })
  }, [])
  useEffect(() => {
    let check;
    if (idAccount !== null) {
      onDisconnect(ref(db, `user/${idAccount}/isOnline`)).set({ isOnline: false });
      onValue((ref(db,`user/${idAccount}/isOnline`)),(snapshot)=>{
        const data = snapshot.val();
        check = data.isOnline;
        setCheckOnline(check)
      })
    }
    // if (!checkGame&&!checkChoose && check=== true) {
    //   window.location.reload();
    // }

  }, [idAccount, checkChoose, checkGame])
  useEffect(() => {
    if(checkGame && checkChoose && checkOnline=== false){
      window.location.reload();
    }
    else if (!checkGame && !checkChoose && checkOnline === true) {
      window.location.reload();
    }
    // else if (checkGame && !checkChoose && checkOnline === true) {
    //   window.location.reload();
    // }
  },[checkChoose1, checkGame1,checkOnline])
  const [playerCurrent,setPlayerCurrent] = useState(null)
  const [playerCurrent1, setPlayerCurrent1] = useState(null)
  useEffect(() => {
    if (listCharacter.length > 0 && idAccount!==null) {
      listCharacter.map(e => {
        if (e.idPlayer.value === idAccount) {
          setPlayerCurrent(e);
        }
      })
      if (getDB===true) {
        listCharacter.map(e => {
          if (e.idPlayer.value === idAccount) {
            setPlayerCurrent1(e);
          }
        })
        setGetDB(false);
      }
    }
  }, [listCharacter, idAccount,getDB])

  return (
    <div className="app">
      <div className="app__container">
        {
          
          !checkChoose&&!checkGame &&<DashBoard
              listAccount={listAccount}
              idAccounrCurrent={idAccounrCurrent}
              handleChoose={handleChoose}
              handleIdAccount={handleIdAccount}
            /> 
          
        }
        {
          checkChoose && !checkGame &&<ChooseFigure
                listCharacter={listCharacter}
                idAccount={idAccount}
                playerCurrent={playerCurrent}
                handleGame={handleGame}
        />
          }
        {
          checkOnline&&checkChoose && checkGame &&
          <Gameplay
            idAccount={idAccount}
            listCharacter={listCharacter}
            playerCurrent={playerCurrent}
            playerCurrent1={playerCurrent1}
          />
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
