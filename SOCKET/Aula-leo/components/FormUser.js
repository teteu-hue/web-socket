import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, TextInput, Pressable } from "react-native-web";
import socket from '../socket';

const styles = StyleSheet.create({
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
        backgroundColor: 'black'
    } 
});

function FormUser() {
    const [room, setRoom] = useState('default');
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [receiveMessage, setReceiveMessage] = useState('');

    const sendMessage = () => {
        const data = {
            room,
            message
        }
        socket.emit('send_message', data);
        setMessage('');
    };

    useEffect(() => {
        socket.emit('join_room', room);

        socket.on('receive_message', (msg) => {
            setReceiveMessage(msg);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [room]);

    return (
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
                onPress={sendMessage}
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
    );
}

export { FormUser };
