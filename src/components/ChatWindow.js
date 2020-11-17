import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

export default() => {

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  const handleEmojiClick = (e, emojiObject) => {
    setText( text + emojiObject.emoji );
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  }

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  }

  const handleSendClick = () => {

  }

  const handleMicClick = () => {
    if(recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      }
      recognition.onend = () => {
        setListening(false);
      }
      recognition.onresult = (e) => {
        setText( e.results[0][0].transcript );
      }

      recognition.start();
    }
  }

  return(
    <div className="chatWindow">
      <div className="chatWindow-header">

        <div className="chatWindow-headerInfo">
          <img className="chatWindow-avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3iIgI38-hHiJhKKNv2Hsr7L-3ex2CoOjrrw&usqp=CAU" alt=""/>
          <div className="chatWindow-name">Welinton Jose</div>
        </div>

        <div className="chatWindow-headerButtons">
          <div className="chatWindow-btn">
            <SearchIcon style={{color: '#919191'}}/>
          </div>
          <div className="chatWindow-btn">
            <AttachFileIcon style={{color: '#919191'}}/>
          </div>
          <div className="chatWindow-btn">
            <MoreVertIcon style={{color: '#919191'}}/>
          </div>
        </div>

      </div>

      <div className="chatWindow-body">
        ...
      </div>

      <div 
        className="chatWindow-emojiArea" 
        // Ação de clique para os emojis
        style={{height: emojiOpen ? '200px' : '0px'}}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow-footer">

        <div className="chatWindow-pre">

          <div 
            className="chatWindow-btn"
            onClick={handleCloseEmoji}
            style={{width: emojiOpen? 40:0}}
          >
            <CloseIcon style={{color: '#919191'}}/>
          </div>

          <div 
            className="chatWindow-btn"
            onClick={handleOpenEmoji}
          >
            <InsertEmoticonIcon style={{color: emojiOpen? '#009688' : '#919191'}}/>
          </div>

        </div>

        <div className="chatWindow-inputArea">
          <input 
            className="chatWindow-input" 
            type="text" 
            placeholder="Digite uma mensagem"
            value={text}
            onChange={e=>setText(e.target.value)}
          />
        </div>

        <div className="chatWindow-pos">

          {text ==='' &&
            <div onClick={handleMicClick} className="chatWindow-btn">
              <MicIcon style={{color: listening ? '#126ece' : '#919191'}}/>
            </div>
          }

          {text !== '' &&
            <div onClick={handleSendClick} className="chatWindow-btn">
              <SendIcon style={{color: '#919191'}}/>
            </div>
          }

        </div>

      </div>
    </div>
  );
}