import React,{useState,useEffect} from 'react';
import './LatestTransactions.css';
import TransData from "./TransData";
import AllTrans from "../AllTrans/AllTrans";
import {anFade2s} from "../../../../animations";

const LatestTransactions = (props) => {

    //for classes blue color
    const [blueClass,setBlueClass] = useState('')

    const [fade2s,setFade2s] = useState(anFade2s)

    //states for show offcanvas
    const [showTrans, setShowTrans] = useState('hide');
    const handleShow = () => setShowTrans('show');
    const handleClose = () => setShowTrans('hide');

    //state with all transactions
    const [transactions,setTransactions] = useState(TransData)

    //states for pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [transactionsAmount] = useState(9)

    const pageAmount = Math.ceil(transactions.length / transactionsAmount);
    const lastTransactionIndex = currentPage * transactionsAmount;//высчитываем индекс последней страны
    const firstTransactionIndex = lastTransactionIndex - transactionsAmount;//высчитываем индекс страны стоящей первой на странице
    const transactionsOnePage = transactions.slice(firstTransactionIndex,lastTransactionIndex)//отображение определенного кол-ва стран на странице

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const prevPage = () => setCurrentPage(prev => prev - 1)
    const nextPage = () => setCurrentPage(prev => prev + 1)

    useEffect(() => {
        if (props.path === '/wallet'){
            setBlueClass('')
        }else {
            setBlueClass('blue')
        }
    })

    return (
        <>
            <div className={`latest-transactions ${showTrans} ${fade2s}`}>
                <header>
                    <h3>Latest transactions</h3>
                    {
                        showTrans==='hide'?
                            <p className={blueClass} onClick={handleShow}>Show all</p>:
                            <p className={blueClass} onClick={handleClose}>Hide all</p>
                    }
                </header>

                {
                    showTrans==='hide'?'':
                        props.path !== '/wallet'?'':
                        <div className="set-page">
                            <p className={`active`}>All</p>
                            <p>Sent</p>
                            <p>Receive</p>
                            <p className={`last`}></p>
                        </div>
                }

                <div className="transactions">
                    <AllTrans
                        blueClass={blueClass}
                        transactionsOnePage={transactionsOnePage}
                        countriesAmount={transactionsAmount}
                        totalCountries={transactions.length}
                        paginate={paginate}
                    />
                </div>

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
        </>
    );
};

export default LatestTransactions;