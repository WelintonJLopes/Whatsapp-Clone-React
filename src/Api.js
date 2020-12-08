import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import FirebaseConfig from './FirebaseConfig';

const firebaseApp = firebase.initializeApp(FirebaseConfig);
const db = firebase.firestore();

export default {
  fbPopup:async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  },
  addUser:async (u) => {
    await db.collection('users').doc(u.id).set({
      name: u.name,
      avatar: u.avatar
    },{ merge:true });
  },
  getContactList:async (userID) => {
    let list = [];

    let results = await db.collection('users').get();

    results.forEach(result => {
      let data = result.data();

      if(result.id !== userID) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar
        });
      }
    })

    return list;
  },
  addNewChat:async (user, user2) => {
    let newChat = await db.collection('chats').add({
      messages:[],
      users:[user.id, user2.id]
    });

    db.collection('users').doc(user.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user2.name,
        image: user2.avatar,
        with: user2.id
      })
    });

    db.collection('users').doc(user2.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user.name,
        image: user.avatar,
        with: user.id
      })
    });
  },
  onChatList: (userId, setChatList) => {
    return db.collection('users').doc(userId).onSnapshot((doc)=>{
      if(doc.exists) {
        let data = doc.data();
        if(data.chats) {
          setChatList(data.chats);
        }
      }
    });
  },
  onChatContent: (chatId, setList, setUsers) => {
    return db.collection('chats').doc(chatId).onSnapshot((doc)=>{
      if(doc.exists) {
        let data = doc.data();
        setList(data.messages);
        setUsers(data.users);
      }
    });
  },
  sendMessage:async (chatData, userId, type, body, users) => {
    let now = new Date();

    db.collection('chats').doc(chatData.chatId).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        type,
        author: userId,
        body,
        date: now
      })
    });

    for(let i in users) {
      let u = await db.collection('users').doc(users[i]).get();
      let uData = u.data();
      if(uData.chats) {
        let chats = [...uData.chats];

        for(let e in chats) {
          if(chats[e].chatId == chatData.chatId) {
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
          }
        }

        await db.collection('users').doc(users[i]).update({
          chats
        })
      }
    }
  }
};