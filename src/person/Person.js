import React, { useEffect, useState } from 'react';
import './person.css';
import _, { last, result } from 'lodash';
import man from '../img/59a2e07a212ecfeeb67435ed36fcee20.jpg'

function Person({ setSelectedChat, chat, selectedChat }) {
    const styles = {
        img: {
            width: '30px',
            height: '30px',
            borderRadius: '100%'
        }
    }

    const [isLoading, setIsLoading] = useState(true);
    const moment = require('moment');

    const [person, setPerson] = useState({
        name: chat.name,
        time: moment(chat.last_message_at).format("hh:mm"),
        chat_id: chat.chat_id,
        connection_id: chat.connection_id,
        message: null
    });

    const handleOnClick = () => {
        setSelectedChat(person.chat_id);
        console.log(person.chat_id,'person chat id');
    }

    React.useEffect(() => {
        const getMessage = async (url) => {
            const res = await fetch(url);
            const body = await res.json();
            return body;
        }

        getMessage(`http://localhost:7000/messaging/messages/?connection_id=${person.connection_id}&chat_id=${person.chat_id}&limit=1`)
            .then((result) => {
                console.log(result);

                const message = getMessageContent(result[0]);
                setPerson({ ...person, message })
            }).finally(() => setIsLoading(false));
    }, [])

    const getMessageContent = (result) => {
        switch (result.message_type) {
            case 'text': return _.truncate(result.text.text);
            case 'image': return _.truncate(result.image.caption);
            case 'waba_template': return _.truncate(result.waba_template.text);
            case 'file': return _.truncate(result.file.caption);
        }
    }

    if (isLoading) {
        return (
            <div> </div>
        )
    }
    return (
        <div className={`container-person ${selectedChat===person.chat_id && 'person-active'}`} onClick={handleOnClick}>
            <img src={man} style={styles.img} alt=''></img>
            <div className='center-person'>
                <span>{person.name}</span>
                <span className='person-message'>{isLoading ? "..." : person.message}</span>
            </div>
            <span className='person-time'>{person.time}</span>
            <div></div>
        </div>
    );
}

export default Person