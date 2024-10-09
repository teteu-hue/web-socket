import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, TextInput, Pressable } from "react-native-web";
import socket from './socket';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  receivedMessageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  receivedMessageBody: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center'
  },
  notReceivedMessageBody: {
    fontSize: 20,
    color: 'red',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center'
  },
  divider: {
    width: '100%',
    height: '2px',
    backgroundColor: 'black',
    marginBottom: '10rem',
    marginTop: '10rem'
  }
});

export default function App() {
  /** FORMULÁRIO 1 */
  const [message, setMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');

  /** FORMULÁRIO 2 */
  const [message2, setMessage2] = useState('');
  const [receiveMessage2, setReceiveMessage2] = useState('');
  
  const [history, setHistory] = useState([]);
  const [room, setRoom] = useState('default');

  const sendMessage1 = () => {
    const data = {
      room,
      message : {from: 'user1', message: message}
    };
    
    socket.emit('send_message', data);
    setMessage('');
  };

  const sendMessage2 = () => {
    const data = {
      room,
      message: {from: 'user2', message: message2}
    };

    socket.emit('send_message', data);
    setMessage2('');
  };

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (msg) => {
      if(msg.from === 'user1'){
        setReceiveMessage(msg.message);
      } else{
        setReceiveMessage2(msg.message);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  return (
    <View style={styles.container}>

                {/** FORMULÁRIO 1 */}
      <View>
        <Text style={styles.title}>Canal: {room}</Text>

        <TextInput
          placeholder="Digite sua mensagem"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <Pressable
          style={styles.button}
          onPress={sendMessage1}
        >
          <Text style={styles.buttonText}>
            Envia mensagem
          </Text>
        </Pressable>
        <Text style={styles.receivedMessageTitle}>Mensagem recebida:</Text>
        <Text style={styles.receivedMessageBody}>
          {receiveMessage2 ||
            <Text style={styles.notReceivedMessageBody}>
              Nenhuma mensagem recebida
            </Text>}
        </Text>
      </View>
      <View style={styles.divider}></View>
      
                {/** FORMULÁRIO 2 */}
      <View>
        <Text style={styles.title}>Canal: {room}</Text>

        <TextInput
          placeholder="Digite sua mensagem"
          value={message2}
          onChangeText={setMessage2}
          style={styles.input}
        />

        <Pressable
          style={styles.button}
          onPress={sendMessage2}
        >
          <Text style={styles.buttonText}>
            Envia mensagem
          </Text>
        </Pressable>
        <Text style={styles.receivedMessageTitle}>Mensagem recebida:</Text>
        <Text style={styles.receivedMessageBody}>
          {receiveMessage ||
            <Text style={styles.notReceivedMessageBody}>
              Nenhuma mensagem recebida
            </Text>}
        </Text>
      </View>
    </View>
  );
};
