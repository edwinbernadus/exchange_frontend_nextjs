import Head from 'next/head'
import {useEffect, useState} from "react";
import { useUser } from '@auth0/nextjs-auth0';
// import { golangServerName } from "../_app";
import color_param from "../../dict/color_param"
import global_param from "../../dict/global_param";


export default function ListTable({ data_output }) {


    let debugMode  = global_param.getIsDebug()
    let golangServerName = global_param.getServerUrl()

    const [data, setData] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const [orderItem, setOrderItem] = useState([])


    // const [totalRows, setTotalRows] = useState(false)
    // const [orderList, setOrderList] = useState([])
    const { user, isLoadingUser } = useUser();
    const [value, setValue] = useState('abc');
    const [info, setInfo] = useState('0');

    const [current_mode, setCurrentMode] = useState("buy");
    const [amount, setAmount] = useState(0.143);
    const [rate, setRate] = useState(9876);
    const [log, setLog] = useState("log-data-init");

    const submitClick = async () => {

        if (user == null){
            alert("please login first")
            return
        }

        setLoading(true)


        let bearer_token = ""
        {
            const response = await fetch('/api/shows',{
                // referrerPolicy: "unsafe_url"
            });
            const token_item = await response.json();
            bearer_token = token_item.token
        }


        let amount1 = parseFloat(amount)
        let rate1 = parseFloat(rate)
        let is_buy = current_mode == "buy"
        const data = {
            amount: amount1,
            requestRate: rate1,
            isBuy: is_buy
        }


        let bearer = 'Bearer ' + bearer_token;

        let url = golangServerName + "/order_submit2"
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': bearer,
            },
            body: JSON.stringify(data)
        })
        setLoading(false)
        let log1 = JSON.stringify(data)
        console.log("log1", log1)
        setLog(log1)
        let r = await res.json()
        console.log("result r", r)
        console.log("result r.status", r.status)

        loadingData()

    };
    const debugHandleClick = async () => {
        // alert("alert1" + " " + value)
        setInfo("")
        setLoading(true)
        const data = {
            amount: 1.123,
            requestRate: 4.5252135,
          }

          let url = golangServerName + "/order_submit"
          const res = await fetch(url, {
            method: 'POST',
            headers: {
            //   'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          setLoading(false)
          let r = await res.json()
          console.log("result", r)
          console.log("result2", r.status)
          setInfo(r.status)
          loadingData()

    };





    const changeBuySellMode = (mode)  => {
        setCurrentMode(mode)
    }

    const getBuyBackgroundColor = () => {
        if (current_mode == "buy") {
            return color_param.getRedColor()
        }
        else {
            return color_param.getDefaultGrey()
        }
    }

    const getSellBackgroundColor = () => {
        if (current_mode == "sell") {
            return color_param.getGreenColor()
        }
        else {
            return color_param.getDefaultGrey()
        }
    }

    const getButtonColor = () => {
        if (current_mode == "buy") {
            return color_param.getRedColor()
        }
        else {
            return color_param.getGreenColor()
        }
    }



    function loadingData() {
        {
            const url = "https://jsonplaceholder.typicode.com/albums"
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
        }


        {
            setLoading(true)
            const url2 = golangServerName + "/ping"
            fetch(url2)
                .then((res) => res.json())
                .then((data) => {
                    setMessage(data.message)
                    setLoading(false)
                })
        }

        {
            const url2 = golangServerName + "/order/getListLong"
            fetch(url2)
                .then((res) => res.json())
                .then((output) => {
                    setOrderItem(output.data)
                    console.log("orderItem", orderItem)
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        loadingData()
    }, [])




    // hint_show_loading_indicator
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    // console.log("user",user)

    return (
        <div>
            <Head>
                <title>List Table</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <a href={"/config-info"} style={{color : "grey"}}>Config Info</a>
                <br/>
                <div style={{display: debugMode?"block":"none"}}>
                    <div>
                        hostname: {golangServerName}
                    </div>
                    <div>
                        user info: {user?.nickname ?? "no_data"}
                    </div>
                    <div >
                        message: {message}
                    </div>
                    {/*<div>*/}
                    {/*    total_rows: {totalRows}*/}
                    {/*</div>*/}
                </div>

                <br/>
                <div>
                    <div className="container">
                        <div className="row" style={{backgroundColor:color_param.getBlueColor()}}>
                            <div className="col md-4">
                                {/*BNB/BUSD*/}
                                {orderItem.CurrencyPair}
                            </div>
                            <div className="col offset-md-4 text-right">
                                {/*Right2*/}
                            </div>

                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <div className="col text-center">
                                    {getListSell()}
                                </div>
                                <div className="col text-center">
                                    <br/>
                                    {/*Current Price*/}
                                    LastPrice: {orderItem.LastRate}
                                    <br/>
                                    <br/>
                                </div>
                                <div className="col text-center">
                                    {getListBuy()}
                                </div>
                            </div>
                            <div className="col" style={{backgroundColor:""}}>
                                <div className="row">
                                    <div className="col" onClick={() => changeBuySellMode("buy")}
                                         style={{textAlign:"center",backgroundColor:getBuyBackgroundColor()}}>
                                        Buy
                                    </div>
                                    <div className="col" onClick={() => changeBuySellMode("sell")}
                                         style={{textAlign:"center",backgroundColor:getSellBackgroundColor()}}>
                                        Sell
                                    </div>
                                </div>





                                <div className="col text-center"
                                     style={{display: debugMode?"block":"none"}}>
                                    Current Mode: {current_mode}
                                </div>



                                <div className="col text-center" style={{display: debugMode?"block":"none"}}>
                                    <br/>
                                    <div>
                                        Info: {value} - {info}
                                    </div>
                                    <input
                                        className="col text-center"
                                        type="text"
                                        value={value}
                                        onChange={e => { setValue(e.currentTarget.value); }}

                                    />
                                    <button onClick={debugHandleClick}>Click me</button>
                                </div>

                                <div className="col text-center">
                                    <br/>
                                    <div>
                                        Input Rate: {rate}
                                    </div>
                                    <input
                                        className="col text-center"
                                        type="text"
                                        value={rate}
                                        onChange={e => { setRate(e.currentTarget.value); }}
                                    />
                                </div>
                                <div className="col text-center">
                                    <br/>
                                    <div>
                                        Input Amount: {amount}
                                    </div>
                                    <input
                                        className="col text-center"
                                        type="text"
                                        value={amount}
                                        onChange={e => { setAmount(e.currentTarget.value); }}
                                    />
                                </div>
                                <div className="col text-center">
                                    <br/>
                                    <button style={{"padding": "6px 16px", backgroundColor: getButtonColor()}}  onClick={submitClick}>{current_mode.toUpperCase()}</button>
                                </div>
                                <div className="col text-center" style={{display: debugMode?"block":"none"}}>
                                    <br/>
                                    log data: {log}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </main>
        </div>
    )

    function getListBuy() {
        let input = []
        if (orderItem.length != 0) {
            input = orderItem.Buys
        }

        const items = input
            // .filter((item) => item.IsBuy === true)
            .map((item, index) =>
                <div key={index} style={{marginBottom: "3px", "color": color_param.getGreenColor()}}>
                    {/*{item.RequestRate} - {item.LeftAmount} - buy: {item.IsBuy.toString()}*/}
                    <span style={{display: debugMode?"block":"none"}}>
                        ID{item.ID} -
                    </span>
                    {item.RequestRate} - qty:{item.LeftAmount}
                    <span>
                        {/*- {item.UserName}*/}
                    </span>
                </div>
            )
        return items
    }

    function getListSell() {
        let input = []
        if (orderItem.length != 0) {
            input = orderItem.Sells
        }
        const items = input
            .sort((a, b) => b.RequestRate - a.RequestRate)
            // .filter((item) => item.IsBuy === false)
            .map((item, index) =>
                <div key={index} style={{marginBottom: "3px", "color": color_param.getRedColor()}}>
                    {/*{item.RequestRate} - {item.LeftAmount} - buy: {item.IsBuy.toString()}*/}
                    <span style={{display: debugMode?"block":"none"}}>
                        ID{item.ID} -
                    </span>
                    {item.RequestRate} - qty:{item.LeftAmount}
                    {/*- {item.UserName}*/}
                </div>
            )
        return items

    }




}
