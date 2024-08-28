import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import socket from "./socket";
import Message from "./src/components/Message";

export default function App(){
  const [message, setMessage] = useState('');

  useEffect(() => { 
    socket.on("connect", () =>{
      console.log("Conectado ao servidor!")
    });
    
    socket.on("message", (msg) => {
      setMessage(msg)
    });

    return () => { //encerramento das conexoes, canal e socket
      socket.off("connect")
      socket.off("message")
    }
  }, []);

  return (
    <View style={{
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Message></Message>
    </View>
  );
};
