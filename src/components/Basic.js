import './chatBot.css';
import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BiBot, BiUser } from 'react-icons/bi';

function Basic({ setData, setShowModal, setShowBasic, setLoading }) {
    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [botTyping, setbotTyping] = useState(false);


    useEffect(() => {

        // console.log("called");
        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;


    }, [chat])


    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = "shreyas";
        const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

        if (inputMessage !== "") {

            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            setLoading(true);
            rasaAPI(name, inputMessage);
        }
        else {
            window.alert("Please enter valid message");
        }

    }


    const rasaAPI = async function handleClick(name, msg) {

        //chatData.push({sender : "user", sender_id : name, msg : msg});


        await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
            },
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    console.log(response);
                    let temp = response[0];

                    if (temp['text'][0] === '{') {
                        console.log("here");
                        setData(JSON.parse(temp['text']));
                        console.log(JSON.parse(temp['text']));
                        setShowModal(true);
                        setShowBasic(false);
                        setLoading(false);
                        return;
                    }
                    const recipient_id = temp["recipient_id"];
                    const recipient_msg = temp["text"];
                    const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
                    setbotTyping(false);
                    setChat(chat => [...chat, response_temp]);
                    setLoading(false);
                }
            })
    }

    // console.log(chat);

    const stylecard = {
        maxWidth: '35rem',
        border: '1px solid black',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '30px',
        boxShadow: '0 16px 20px 0 rgba(0,0,0,0.4)'

    }
    const styleHeader = {
        height: '4.5rem',
        borderBottom: '1px solid black',
        borderRadius: '30px 30px 0px 0px',
        backgroundColor: 'rgb(18 86 196)',

    }
    const styleFooter = {
        borderTop: '1px solid black',
        borderRadius: '0px 0px 30px 30px',
        backgroundColor: 'rgb(18 86 196)',
    }
    const styleBody = {
        paddingTop: '10px',
        height: '28rem',
        overflowY: 'a',
        overflowX: 'hidden',

    }

    return (
        <div>
            <div className="container flex w-full items-center justify-center">
                <div className="row justify-content-center w-full flex items-center justify-center">

                    <div className="card w-full" style={stylecard}>
                        <div className="cardHeader text-white w-full" style={styleHeader}>
                            <h1 style={{ marginBottom: '0px' }} className="text-center pt-5 text-2xl font-bold">Travel Assistant</h1>
                            {botTyping ? <h6>Bot Typing....</h6> : null}



                        </div>
                        <div className="cardBody" id="messageArea" style={styleBody}>

                            <div className="row msgarea">
                                {chat.map((user, key) => (
                                    <div key={key}>
                                        {user.sender === 'bot' ?
                                            (

                                                <div className='msgalignstart'>
                                                    <BiBot className="botIcon" /><h5 className="botmsg">{user.msg}</h5>
                                                </div>

                                            )

                                            : (
                                                <div className='msgalignend'>
                                                    <h5 className="usermsg">{user.msg}</h5><BiUser className="userIcon" />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}

                            </div>

                        </div>
                        <div className="cardFooter text-white" style={styleFooter}>
                            <div className="row">
                                <form style={{ display: 'flex' }} className="items-center justify-center" onSubmit={handleSubmit}>
                                    <div className="col-10 text-black w-[70%]" style={{ paddingRight: '0px' }}>
                                        <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp p-3"></input>
                                    </div>
                                    {/* <div className="col-2 cola">
                                        <button type="submit" className="circleBtn" ><IoMdSend className="sendBtn" /></button>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {<div className='flex justify-center items-center mt-3'>

                <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#3C9C61] rounded-lg dark:bg-gray-700' onClick={() => setShowBasic(false)}>Home Page</button>
            </div>}
        </div>
    );
}

export default Basic;
