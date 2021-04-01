import React, { useEffect, useState } from 'react';
import './chatMessenger.css'
import MessageBlock from '../message-block/MessageBlock';
import man from '../img/59a2e07a212ecfeeb67435ed36fcee20.jpg'
import email from '../img/Email.svg'
import search from '../img/Search.svg'
import ellipsis from '../img/Ellipsis.svg'
import clip from '../img/Clip.svg'
import list from '../img/List.svg'
import smiley from '../img/Smiley.svg'
import send from '../img/Send.svg'
import { constant, round } from 'lodash';
import _ from 'lodash';

const styles = {
    img: {
        width: '30px',
        height: '30px',
        borderRadius: '100%'
    }
}
const moment = require('moment');

function ChatMessenger({ selectedChat, chat, connection_id }) {
    const intializePerson = () => {
        if (!chat) {
            return { name: '', time: '' }
        }
        return {
            name: chat.name,
            time: moment(chat.last_message_at).format('hh:mm'),
            chat_id: selectedChat
        }
    }

    const [person, setPerson] = useState(intializePerson());

    const [messages, setMessages] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const getMessages = async (url) => {
            const res = await fetch(url);
            console.log(res, 'res')
            const body = await res.json();
            return body;
        }

        getMessages(`http://localhost:7000/messaging/messages/?connection_id=${connection_id}&chat_id=${selectedChat}&limit=50`)
            .then(async (result) => {
                console.log(result, 'result');
                const content = result.map(message => getMessageContent(message));
                setMessages(content)
            }).finally(() => setIsLoading(false));
    }, [selectedChat])

    const getMessageContent = (rawMessage) => {
        const message = {
            created_at: rawMessage.created_at,
            isDelivered: rawMessage.direction === 'outbound' && !!rawMessage.delivered_at,
            isRead: rawMessage.direction === 'outbound' && !!rawMessage.read_at,
            direction: rawMessage.direction,
            imageUrl: rawMessage.imageUrl,
            message_id: rawMessage.message_id,
            message_type: rawMessage.message_type
        }
        switch (rawMessage.message_type) {
            case 'text': {
                message.text = rawMessage.text.text
                break;
            };
            case 'image': {
                message.text = rawMessage.image.caption
                break;
            };
            case 'waba_template': {
                message.text = rawMessage.waba_template.text
                break;
            };
            case 'file': {
                message.text = rawMessage.file.caption
                break;
            }
        }

        return message;
    }
    console.log(messages, 'messages');
    const printMessages = () => messages.map(message => {
        return (
            <MessageBlock key={message.message_id} message={message} connection_id={connection_id} selectedChat={selectedChat} />
        )
    })

    useEffect(() => {
        setPerson(intializePerson());
    }, [chat])

    console.log(intializePerson(), 'массив chat')

    if (!selectedChat) {
        return (
            <div className='chat-container-not-selected'>
                <p>Выберите чат, чтобы прочитать полученные сообщения или отправить новые</p>
            </div>
        )
    }
    return (
        <div className='chat-container'>
            <div className='chat-header'>
                <div className='person'>
                    <img src={man} style={styles.img} alt=''></img>
                    <div>
                        <p>{person.name}</p>
                        <p>был(а) в сети {person.time}</p>
                    </div>
                </div>
                <div className='head-button'>
                    <img src={email} width='30px' alt=''></img>
                    <img src={search} width='24px' alt=''></img>
                    <img src={ellipsis} width='18px' height='18px' alt=''></img>
                </div>
            </div>
            <div className='chat-content'>
                {printMessages()}
            </div>
            <div className='chat-footer'>
                <div className='footer-chat'>
                    <div className='search-input'>
                        <input placeholder='Введите сообщение'></input>
                    </div>
                    <div className='footer'>
                        <div className='icon-footer'>
                            <img src={smiley} width='25px' alt=''></img>
                            <img src={list} width='25px' alt=''></img>
                            <img src={clip} width='30px' alt=''></img>
                        </div>
                        <div className='button-footer'>
                            {/* <button className='submit-button'>➤</button> */}
                            <button className='submit-button'><img src={send} alt=''></img></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatMessenger