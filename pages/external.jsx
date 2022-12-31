import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';
import { getAccessToken, withApiAuthRequired, GetAccessTokenResult, getSession } from '@auth0/nextjs-auth0';
import global_param from "../dict/global_param";
// import { golangServerName } from "./_app";

function External() {
  let golangServerName = global_param.getServerUrl()

  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined ,data1 : ""});


  const callApi = async () => {
    setState(previous => ({ ...previous, isLoading: true }))

    let bearer_token  = ""

    try {

      // var token = getAccessToken()
      // console.log("token",token)

      const response = await fetch('/api/shows',{
            // referrerPolicy: "unsafe_url"
          });
      const data = await response.json();
      bearer_token = data.token

      setState(previous => ({ ...previous, response: data, error: undefined }))
    } catch (error) {
      setState(previous => ({ ...previous, response: undefined, error }))
    } finally {
      setState(previous => ({ ...previous, isLoading: false }))
    }

    try {

      const url = golangServerName + "/hello"
      // const url = golangServerName + ""
      var bearer = 'Bearer ' + bearer_token;

      console.log("send token",bearer,url)

      // const response = await fetch(url );
      const response = await fetch(url, {
        method: 'GET',
        // withCredentials: true,
        // credentials: 'include',
        headers: {
          'Authorization': bearer,
          // 'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
          // 'Content-Type': 'application/json'
        }})

      const data = await response.json();
      console.log("data",data)
      setState(previous => ({ ...previous, data1: data.hello }))

    } catch (error) {
      console.log("data error",error)
    }
  };

  const handle = (event, fn) => {
    event.preventDefault();
    fn();
  };

  const { isLoading, response, error , data1 } = state;

  return (
    <>
      <div className="mb-5" data-testid="external">
        <h1 data-testid="external-title">External API</h1>
        <div data-testid="external-text">
          <p className="lead">
            Ping an external API by clicking the button below
          </p>
          <p>
          This will call a local API on port 3000 that would have been started if you run <code>npm run dev</code>.
          </p>
          <p>
          An access token is sent as part of the requests <code>Authorization</code> header and the API will validate
          it using the APIs audience value. The audience is the identifier of the API that you want to call (see{" "}
          <a href="https://auth0.com/docs/get-started/dashboard/tenant-settings#api-authorization-settings">
            API Authorization Settings
          </a>{" "}
          for more info).
          </p>
        </div>
        <Button color="primary" className="mt-5" onClick={e => handle(e, callApi)} data-testid="external-action">
          Ping API
        </Button>
      </div>
      <div className="result-block-container">
        {isLoading && <Loading />}
        {(error || response) && (
          <div className="result-block" data-testid="external-result">
            <h6 className="muted">Result</h6>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <Highlight>{JSON.stringify(response, null, 2)}</Highlight>}
          </div>
        )}
      </div>

      <div className="result-block-container">
            <div className="result-block" data-testid="external-result">
              <h6 className="muted">Result</h6>
              <Highlight>{data1}</Highlight>
            </div>
      </div>
    </>
  );
}

export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
