import React from 'react';
import Person from '../person/Person';
import Loader from '../loader/Loader';
import './PersonList.css';

function PersonList({ setSelectedChat, selectedChat, chats, isLoading }) {
    return (
        <div className='personList'>
            <div className='inputSearch'><input placeholder='Поиск' type="search" /></div>
            {isLoading ? <Loader /> : (<div className='person-container'>
                {chats.map(item => <Person key={item.chat_id} setSelectedChat={setSelectedChat} selectedChat={selectedChat} chat={item} />)}
            </div>)}
        </div>
    );
}

export default PersonList