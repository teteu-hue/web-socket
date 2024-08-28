import React, {useState, useEffect} from 'react';
import { TextInput, Text, Pressable, View, FlatList} from 'react-native'
import socket from "../../../socket";

export default function Message() {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([]) //responsavel por carregar a lista de mensagens

    function sendMessage(){
        socket.emit("chat", message);

        socket.on("chat", (message) => {
            messageList.push(message);
        });

    }

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
            <TextInput
                onChangeText={setMessage}
                placeholder="Escreva uma mensagem"
                inputMode="text"
                value={message}
                
            />

            <Pressable
                style={{backgroundColor: 'red'}}
                title="Enviar"
                onPress={() => sendMessage()}
                >

                <Text
                    style={{
                        width: "15rem",
                        textAlign: 'center',
                        height: "3rem",
                        alignContent: 'center',
                        borderRadius: 60
                    }}
                >
                    Enviar
                </Text>

            </Pressable>

            <Text>Mensagens enviadas:</Text>
            <FlatList
                data={messageList.reverse()}
                renderItem={({item}) =>{
                    return (
                        <Text>{item}</Text>
                    )
                }}
                keyExtractor= {(item) =>{item}}
            />
        </View>
    );
}

