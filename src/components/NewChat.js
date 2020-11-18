import React, { useState } from 'react';
import './NewChat.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({user, chatlist, show, setShow}) => {

  const [list, setList] = useState([
    {id: 123, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3iIgI38-hHiJhKKNv2Hsr7L-3ex2CoOjrrw&usqp=CAU', name: 'Welinton Jose'},
    {id: 123, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3iIgI38-hHiJhKKNv2Hsr7L-3ex2CoOjrrw&usqp=CAU', name: 'Welinton Jose'},
    {id: 123, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3iIgI38-hHiJhKKNv2Hsr7L-3ex2CoOjrrw&usqp=CAU', name: 'Welinton Jose'},
    {id: 123, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3iIgI38-hHiJhKKNv2Hsr7L-3ex2CoOjrrw&usqp=CAU', name: 'Welinton Jose'}
  ]);

  const handleClose = () => {
    setShow(false);
  }

  return(
    <div className="newChat" style={{left: show?0:-415}}>
      <div className="newChat-head">
        <div onClick={handleClose} className="newChat-backButton">
          <ArrowBackIcon style={{color: '#fff'}} />
        </div>
        <div className="newChat-headTitle">Nova Conversa</div>
      </div>
      <div className="newChat-list">
        {list.map((item, key) => (
          <div className="newChat-item" key={key}>
            <img className="newChat-itemAvatar" src={item.avatar} alt="" />
        <div className="newChat-itemName">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}