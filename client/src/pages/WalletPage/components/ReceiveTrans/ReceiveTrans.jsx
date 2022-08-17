import React, {useEffect, useState} from 'react';
import './ReceiveTrans.css';
import {checkLightTheme} from "../../../../lightThemeCheck";

const ReceiveTrans = (props) => {

    const [adresses,setAdresses] = useState([])

    const handleCopy = (adress) =>{
        navigator.clipboard.writeText(adress)
    }

    useEffect(() =>{
        const getListAdress = async () =>{
            const seed = window.localStorage.getItem('seed')
            const data = JSON.parse(await window.walletAPI.listWalletAddress(`"${seed}"`,2))
            // console.log(data["data"]);
            let arrValues = []
            for (let item in data.data){
                const dataBal = JSON.parse(await window.walletAPI.balance(data.data[item]))
                let balLast = dataBal["data"][data.data[item]]/1000000000000000000;
                arrValues.push([data.data[item],balLast])
            }
            setAdresses(arrValues)
        }
        getListAdress()
    },[])
    console.log(adresses)

    return (
        <>
            {adresses.map((trans,idx) => (
                <div className={`rec-trans-container ${checkLightTheme()}`} key={idx}>
                    <span>
                        <p>{trans[0]}</p>
                        {checkLightTheme()?
                            <img onClick={() => handleCopy(trans[0])} className={'copy-address'} src="./images/receive/copy-bl.svg" alt="copy"/>:
                            <img onClick={() => handleCopy(trans[0])} className={'copy-address'} src="./images/receive/copy.svg" alt="copy"/>
                        }
                    </span>

                    <h3 className={'adk'}>{trans[1]} ADK</h3>
                </div>
            ))}
        </>
    );
};

export default ReceiveTrans;