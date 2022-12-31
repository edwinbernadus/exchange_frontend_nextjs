import Head from 'next/head'
import {useEffect, useState} from "react";
import { useUser } from '@auth0/nextjs-auth0';
// import { golangServerName } from "../_app";
// import color_param from "../../dict/color_param"
import global_param from "../../dict/global_param";


export default function ConfigInfo({ data_output }) {
    let golangServerName = global_param.getServerUrl()
    const { user, isLoadingUser } = useUser();
    let debugMode  = true
    let message = "help page"

    function getVercelInfo(){
    let message

    if (global_param.getVercelStatus()) {
        message = 'This app is running on Vercel.'
    } else {
        message = 'This app is not running on Vercel.'
    }
    return message
    }

    return (
        <div>
            <Head>
                <title>Config Page</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div style={{display: debugMode?"block":"none"}}>
                    <div>
                        hostname: {golangServerName}
                    </div>
                    <div>
                        ver: {global_param.getVer()}
                    </div>
                    <div>
                        user info: {user?.nickname ?? "no_data"}
                    </div>
                    <div >
                        vercel mode: {getVercelInfo()}
                    </div>
                    <div >
                        message: {message}
                    </div>

                    <div>
                        get env NEXT_PUBLIC_VERCEL_ENV: {process.env.NEXT_PUBLIC_VERCEL_ENV}
                    </div>
                    <div>
                        get env NEXT_PUBLIC_VERCEL_URL: {process.env.NEXT_PUBLIC_VERCEL_URL}
                    </div>
                    <div>
                        get env VERCEL_URL: {process.env.VERCEL_URL}
                    </div>
                    <div>
                        get env VERCEL: {process.env.VERCEL}
                    </div>

                </div>

                <br/>

            </main>
        </div>
    )




}
