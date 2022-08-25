import React,{useState,useEffect} from 'react';
import './LatestTransactions.css';
import AllTrans from "../AllTrans/AllTrans";
import {anFadeUp} from "../../../../animations";
import {checkLightTheme} from "../../../../lightThemeCheck";
import sendTrans from "../../../../sendTrans";
import {useLocation} from "react-router-dom";

const LatestTransactions = (props) => {

    //path
    const path = useLocation().pathname;

    //for classes blue color
    const [blueClass,setBlueClass] = useState('')

    //states for show offcanvas
    const [showTrans, setShowTrans] = useState('hide');
    const handleShow = () => setShowTrans('show');
    const handleClose = () => setShowTrans('hide');

    //states for pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [transactionsAmount] = useState(10)

    const pageAmount = Math.ceil(sendTrans('stake').length / transactionsAmount);
    const lastTransactionIndex = currentPage * transactionsAmount;//высчитываем индекс последней страны
    const firstTransactionIndex = lastTransactionIndex - transactionsAmount;//высчитываем индекс страны стоящей первой на странице
    const transactionsOnePageStake = sendTrans('stake').slice(firstTransactionIndex,lastTransactionIndex)//отображение определенного кол-ва стран на странице

    const pageAmountSend = Math.ceil(sendTrans('send').length / transactionsAmount);

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const prevPage = () => setCurrentPage(prev => prev - 1)
    const nextPage = () => setCurrentPage(prev => prev + 1)

    useEffect(() => {
        if (props.path === '/wallet'){
            setBlueClass('')
        }else {
            setBlueClass('blue')
        }

        const getSendTrans = async () =>{
            const seed = window.localStorage.getItem('seed');
            const data = JSON.parse(await window.walletAPI.getLastTx(`"${seed}"`,1))
            console.log(data)
        }
        getSendTrans()
    },[])

    return (
        <>
            <div className={`latest-transactions ${showTrans} ${anFadeUp} ${checkLightTheme()}`}>
                <header>
                    <h3>Latest transactions</h3>
                    {
                        showTrans==='hide'?
                            <p className={blueClass} onClick={handleShow}>Show all</p>:
                            <p className={blueClass} onClick={handleClose}>Hide all</p>
                    }
                </header>

                {
                    path==='/wallet'?
                        <div className={`transactions send-tr ${checkLightTheme()}`}>
                            <h1 style={{width:"100%",padding:100}}>Hello</h1><br />
                            <h1 style={{width:"100%",padding:100}}>Hello</h1><br />
                            <h1 style={{width:"100%",padding:100}}>Hello</h1><br />
                            <h1 style={{width:"100%",padding:100}}>Hello</h1><br />
                            <h1 style={{width:"100%",padding:100}}>Hello</h1><br />
                        </div>:
                        <div className={`transactions ${checkLightTheme()}`}>
                            <AllTrans
                                stakeTr={transactionsOnePageStake}
                                blueClass={blueClass}
                                countriesAmount={transactionsAmount}
                                totalSend={sendTrans('send')}
                                paginate={paginate}
                            />
                        </div>
                }

                {
                    path==='/wallet'?'':
                        <footer>
                            {
                                pageAmount!==0?
                                    <>
                                        <button className={`left`} disabled={currentPage===1} onClick={prevPage}>
                                            {checkLightTheme()?
                                                <img src="./images/wallet-page/arrow-right.svg" alt=""/>:
                                                <img src="./images/arrow-right.svg" alt=""/>
                                            }
                                        </button>
                                        <p>{currentPage} / {blueClass?pageAmount:pageAmountSend}</p>
                                        <button className={`right`} disabled={blueClass?currentPage===pageAmount:currentPage===pageAmountSend} onClick={nextPage}>
                                            {checkLightTheme()?
                                                <img src="./images/wallet-page/arrow-right.svg" alt=""/>:
                                                <img src="./images/arrow-right.svg" alt=""/>
                                            }
                                        </button>
                                    </>:''
                            }
                        </footer>
                }
            </div>
        </>
    );
};

export default LatestTransactions;