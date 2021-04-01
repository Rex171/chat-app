import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import './messageBlock.css'

function MessageBlock({ message, connection_id, selectedChat }) {

    const moment = require('moment');
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (message.message_type === 'image') {
            fetchImage();
        }
        else setIsLoading(false)
    }, [])
    useEffect(() => {
        if (imageUrl) {
            setIsLoading(false)
        }
    }, [imageUrl])

    const fetchImage = async () => {
        if (message.message_type === 'image') {
            const fetchImage = await fetch(`http://localhost:7000/messaging/files/?connection_id=${connection_id}&chat_id=${selectedChat}&message_id=${message.message_id}`)
                .then(response => response.json())
                .then((response) => {
                    console.log(response, 'response url')
                    setImageUrl(response.url);
                });
        }
    }

    const printImage = () => {
        if (message.message_type === 'image') {
            return message.message_type === 'image' && !imageUrl ? <Loader /> : <div className='chat-message-image-container'><img src={imageUrl}/></div>
        }
    }

    return (
        <div className={`chat-message chat-message-${message.direction}`} key={message.message_id}>
            {printImage()}
            <div className='chat-message-content'>
                <div className='chat-message-text'>{message.text}</div>
                <div className='chat-message-time'>{moment(message.created_at).format('hh:mm')}</div>
                {message.direction === 'outbound' && <div className={`chat-message-status ${message.isRead && 'chat-message-read'}`} >✓{message.isDelivered && '✓'}</div>}
            </div>
        </div >
    )
}

export default MessageBlock;