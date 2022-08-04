import React,{useState} from 'react';
import './Receive.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeOut} from "../../../../animations";
import TransData from "../LatestTransactions/TransData";
import ReceiveTrans from "../ReceiveTrans/ReceiveTrans";

const Receive = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    // const [fade1s,setFade1s] = useState(anFade1s)

    const handleCloseReceive = () =>{
        setFade(anFadeOut)
        setTimeout(() => navigateRoute('/wallet'),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    //copy onclick
    const [grayColor,setGrayColor] = useState('')
    const handleCopy = () =>{
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

            <button onClick={handleCloseReceive} className={`close-button`}>
                Cancel
            </button>

            <div className={`block-container`}>

                <div className="rec-container">
                    <img src="./images/wallet-page/logoKrug.svg" alt="logoAidos"/>

                    <div className={`rec-code-container`}>
                        <div className="code">
                            <p className={grayColor}>{window.localStorage.getItem('adress')}</p>
                        </div>
                        <div className="copy">
                            <img onClick={handleCopy} src="./images/receive/copy.svg" alt="copy"/>
                        </div>
                    </div>

                    <div className="rec-button-container">
                        <button>Open QR-code</button>
                        <button>View in Blockchain</button>
                    </div>
                </div>


                <div className="rec-transactions">
                    <header>
                        <h3>Adresses</h3>
                        <h2>+</h2>
                    </header>

                    <ReceiveTrans
                        transactionsOnePage={transactionsOnePage}
                    />

                    <footer>
                        <button className={`left`} disabled={currentPage===1} onClick={prevPage}>
                            <img src="./images/arrow-right.svg" alt=""/>
                        </button>
                        <p>{currentPage} / {pageAmount}</p>
                        <button className={`right`} disabled={currentPage===pageAmount} onClick={nextPage}>
                            <img src="./images/arrow-right.svg" alt=""/>
                        </button>
                    </footer>
                </div>
            </div>

        </div>
    );
};

export default Receive;