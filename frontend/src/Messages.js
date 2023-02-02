import { useSubscription } from "urql";

import "./Messages.css";

const MESSAGES = `
    subscription {
        room {
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

export default function Messages() {
    const [{data, fetching}] = useSubscription({query: MESSAGES}, (_, data) => data);

    if (fetching) {
        return (
            <h1>Loading...</h1>
        );

    } else {
        return (
            <div>
                <div id="messages">
                    <div>
                        {data?.room.messages.map((message, index) => (
                            <Message
                                key={index}
                                sender={message.sender.name}
                                text={message.text}
                                className="message"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
