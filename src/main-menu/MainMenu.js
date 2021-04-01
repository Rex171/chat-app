import React from 'react';
import chat from '../img/Chat.svg';
import setting from '../img/Setting.svg';
import logo from '../img/LogoRadist.svg'
import './mainMenu.css';
import photo from '../img/59a2e07a212ecfeeb67435ed36fcee20.jpg';

function MainMenu() {
    return (
        <div className='mainMenu'>
            <div className='menu-items'>
                <div className='menu-photo'>
                    <img src={photo} alt=''></img>
                </div>
                <div className='menu-item'>
                    <img src={chat} alt='' width="30px"></img>
                    <p>Чат</p>
                </div>
                <div className='menu-item'>
                    <img src={setting} alt='' width="30px"></img>
                    <p>Настройки</p>
                </div>
            </div>
            <div className='menu-logo'>
                <img src={logo} alt='' width="70px"></img>
            </div>
        </div>
    )
}

export default MainMenu