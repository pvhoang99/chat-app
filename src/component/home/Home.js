import React, {useEffect, useState} from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';
import './Home.css'
import {BASE_URL, SOCKET_URI} from '../../config';
import axios from 'axios';

const Home = () => {

    var stompClient = null;
    var socket = null;
    const token = window.localStorage.getItem("token")

        const [state, _setState] = useState({});

    const setState = (data = {}) => {
        _setState((preState) => ({...preState, ...data}))
    }

    useEffect(() => {
        axios.get(BASE_URL + '/auth-server/api/v1/user/search', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setState({users: res.data?.content || []})
        }).catch((err) => {
            console.log(err)
        })
        axios.get(BASE_URL + '/auth-server/api/v1/user/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setState({me: res?.data})
        }).catch((err) => {
            console.log(err)
        })
        connect();

    }, [])


    const connect = () => {
        socket = new SockJS(SOCKET_URI);
        stompClient = Stomp.over(socket);
        stompClient.connect({Authorization: token}, onConnected, onError);
    }

    const onConnected = () => {
        console.log("oke");
        // debugger
        setState({stompClient: stompClient})
        stompClient.subscribe('/user/queue/reply', (e) => {
            console.log(e)
        });
    }

    const oldMessages = (e) => {
        setState({oldMessages: JSON.parse(e.body)?.body})
    }

    const onError = (err) => {
        console.log(err);

    }

    const onInput = (e) => {
        const message = e.target.value
        setState({message: message});
    }

    const onchoose = (e) => () => {
        setState({userId: e.userId})
        const stompClient = state.stompClient;
        stompClient.subscribe(`/app/old.message/${e.userId}`, oldMessages)
    }

    const onSend = () => {
        if (state.stompClient) {
            const data = {
                text: state.message,
                toUser: state.userId,
                chatType: 'PRIVATE'
            }
            console.log(data)
            state.stompClient.send("/app/send.message", {}, JSON.stringify(data))
        }
    }

    return (
        <div className="container">

            <div className="left-container">
                <div className='left-container-header'>Chat</div>
                <div className="left-container-member-list">
                    <ul>
                        {
                            state?.users?.map((user, index) => {
                                return <li key={index} onClick={onchoose(user)}>{user.fullName}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='middle-container'>
                <div className='middle-container-header'>header</div>
                <div className='middle-container-body'>
                    {state.oldMessages?.map((message, key) => {
                        return <div
                            className={`chat-content ${message.createdBy === state.me.username ? 'my-chat' : 'friend-chat'}`}
                            key={key}>{message.text}</div>
                    })}
                </div>
                <div className='middle-container-insert'>
                    <input className='input' onChange={onInput}/>
                    <button className='send' onClick={onSend}>send</button>
                </div>
            </div>
            <div className='right-container'>right</div>

        </div>
    )
}

export default Home