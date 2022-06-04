import React, {useEffect, useState} from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000';

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');


    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get(SERVER_URL+'/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            console.log(e);
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async () => {
        if(value){
            await axios.post(SERVER_URL+'/new-messages', {
                message: value,
                id: Date.now() + value
            })
            setValue('');
        }

    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LongPolling;