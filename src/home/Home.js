import React from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';
import './Home.css'
import { SOCKET_URI, BASE_URL } from '../config';
import axios from 'axios';

const Home = () => {

  var stompClient = null;
  var socket = null;
  const token = window.localStorage.getItem("token")

  axios.get(BASE_URL + '/auth-server/api/v1/user/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })

  const connect = () => {
    socket = new SockJS(SOCKET_URI);
    stompClient = Stomp.over(socket);
    stompClient.connect({ Authorization: token }, onConnected, onError);
  }

  const onConnected = () => {
    console.log("oke");
  }

  const onError = (err) => {
    console.log(err);

  }

  connect();
  return (
    <div className='container'>

    </div>
  )
}

export default Home