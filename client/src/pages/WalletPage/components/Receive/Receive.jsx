import React, {useEffect, useState} from 'react';
import './Receive.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFade1s, anFadeOut} from "../../../../animations";
import TransData from "../LatestTransactions/TransData";
import ReceiveTrans from "../ReceiveTrans/ReceiveTrans";
import QRCodeSVG from "qrcode.react";
import {checkLightTheme} from "../../../../lightThemeCheck";

const Receive = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    const handleCloseReceive = () =>{
        setFade(anFadeOut)
        setTimeout(() => navigateRoute('/wallet'),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    //copy onclick
    const [grayColor,setGrayColor] = useState('')
    const handleCopy = async (adress) =>{
        await navigator.clipboard.writeText(adress)
        setGrayColor('gray')
        setTimeout(handleChangeColor,1000)
    }
    const handleChangeColor = () =>{
        setGrayColor('')
    }

    //state with all transactions
    const recTrans = TransData.filter(trans => trans.adk.startsWith('+'))
    const [transactions,setTransactions] = useState(recTrans)

    //states for pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [transactionsAmount] = useState(7)

    const pageAmount = Math.ceil(transactions.length / transactionsAmount);
    const lastTransactionIndex = currentPage * transactionsAmount;//высчитываем индекс последней страны
    const firstTransactionIndex = lastTransactionIndex - transactionsAmount;//высчитываем индекс страны стоящей первой на странице
    const transactionsOnePage = transactions.slice(firstTransactionIndex,lastTransactionIndex)//отображение определенного кол-ва стран на странице

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const prevPage = () => setCurrentPage(prev => prev - 1)
    const nextPage = () => setCurrentPage(prev => prev + 1)

    return (
        <div className={`block-container menu receive ${fade}`}>

            <button onClick={handleCloseReceive} className={`close-button ${checkLightTheme()}`}>
                Cancel
            </button>

            <div className={`block-container ${checkLightTheme()}`}>

                <div className="rec-container">
                    <img className={'logoAidos'} src="./images/wallet-page/logoKrug.svg" alt="logoAidos"/>

                    <div className={`qr-container ${fade1s}`}>
                        <QRCodeSVG
                            size={90}
                            bgColor={"rgba(255, 255, 255, 0)"}
                            fgColor={checkLightTheme()?"rgba(24,24,24,0.8)":"rgba(255, 255, 255, 0.8)"}
                            className={'qr-code'}
                            value={window.localStorage.getItem('adress')}
                        />
                    </div>

                    <div className={`rec-code-container ${checkLightTheme()}`}>

                        <div className="code">
                            <p className={grayColor}>{window.localStorage.getItem('adress')}</p>
                        </div>
                        <div className="copy">
                            <img
                                onClick={() => handleCopy(window.localStorage.getItem('adress'))}
                                src={checkLightTheme()?"./images/receive/copy-bl.svg":"./images/receive/copy.svg"}
                                alt="copy"
                            />
                        </div>
                    </div>

                    <div className={`rec-button-container ${checkLightTheme()}`}>
                        <button>Create New Address</button>
                    </div>
                </div>


                <div className={`rec-transactions ${checkLightTheme()}`}>
                    <header>
                        <h3>Addresses</h3>
                    </header>

                    <ReceiveTrans
                        transactionsOnePage={transactionsOnePage}
                    />

                    <footer>
                        <button className={`left`} disabled={currentPage===1} onClick={prevPage}>
                            {checkLightTheme()?
                                <img src="./images/wallet-page/arrow-right.svg" alt=""/>:
                                <img src="./images/arrow-right.svg" alt=""/>
                            }
                        </button>
                        <p>{currentPage} / {pageAmount}</p>
                        <button className={`right`} disabled={currentPage===pageAmount} onClick={nextPage}>
                            {checkLightTheme()?
                                <img src="./images/wallet-page/arrow-right.svg" alt=""/>:
                                <img src="./images/arrow-right.svg" alt=""/>
                            }
                        </button>
                    </footer>
                </div>
            </div>

        </div>
    );
};

export default Receive;