import { useSubscription } from "urql";

import "./Room.css";

const ROOM = `
    subscription {
        room {
            name
            messages {
                sender {
                    name
                }
                text
            }
        }
    }
`;

function Message({sender, text}) {
    return (
        <div className="message">
            <div className="sender">{sender}:</div>
            <div className="text">{text}</div>
        </div>
    );
}

export default function Room() {
    const [{data, fetching}] = useSubscription({query: ROOM}, (_, data) => data);

    if (fetching) {
        return (
            <h1>Loading...</h1>
        );

    } else {
        let messages = [];
        data?.room.messages.forEach((message, index) => {
            messages.push(
                <Message
                    key={index}
                    sender={message.sender.name}
                    text={message.text}
                    className="message"
                />
            );
        });

        return (
            <div>
                <h1>{data?.room.name}</h1>
                <div id="messages">
                    <div>{messages}</div>
                </div>
            </div>
        );
    }
}
