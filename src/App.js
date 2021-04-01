import React, { useEffect, useState } from 'react';
import MainMenu from './main-menu/MainMenu'
import PersonList from './person-list/PersonList'
import ChatMessenger from './chat-messenger/ChatMessenger'
import './App.css';

function App() {

  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const connection_id = 5361;

  React.useEffect(() => {

    const getChat = async (url) => {
      const res = await fetch(url);
      const body = await res.json();
      return body;
    }

    getChat(`http://localhost:7000/messaging/chats/?connection_id=${connection_id}&limit=100&offset=0`)
      .then((result) => {
        setChats(result);
        setIsLoading(false);
      });
  }, [])

  console.log(chats, 'пуст');

  const getFilteredChat = () => {
    return chats.find((selectedChats) => {
      console.log('filter', selectedChats.chat_id, selectedChats);
      return selectedChats.chat_id == selectedChat;
    });
  }

  const [filteredChat, setFilteredChat] = useState(getFilteredChat())

  useEffect(() => {
    setFilteredChat(getFilteredChat());
  },[selectedChat])


  console.log(getFilteredChat(),'getFilteredChat')

  console.log(filteredChat, 'filterChat')

  return (
    <div className='container'>
      <MainMenu />
      <PersonList setSelectedChat={setSelectedChat} selectedChat={selectedChat} chats={chats} isLoading={isLoading} setIsLoading={setIsLoading} />
      <ChatMessenger selectedChat={selectedChat} chat={filteredChat} connection_id={connection_id}/>
    </div>
  );
}
export default App