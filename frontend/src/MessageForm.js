import { useState } from "react";
import { useMutation } from "urql";

const SEND_MESSAGE = `
    mutation ($uuid: String!, $text: String!) {
        sendMessage(uuid: $uuid, text: $text) {
            name
        }
    }
`;

const JOIN = `
    mutation ($name: String!) {
        join(name: $name)
    }
`;

export default function Message() {
    const [{fetching: sendMessageFetching}, sendMessage] = useMutation(SEND_MESSAGE);
    const [{fetching: useMutationFetching, data}, join] = useMutation(JOIN);
    const fetching = sendMessageFetching || useMutationFetching;
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const handleSendMessage = (ee) => {
        ee.preventDefault();
        sendMessage({uuid: data.join, text: message});
        setMessage("");
    };

    const handleJoin = (ee) => {
        ee.preventDefault();
        join({name});
        setName("");
    };

    if (!data?.join) {
        return (
            <form onSubmit={handleJoin}>
                <input
                    type="text"
                    value={name}
                    onChange={(ee) => setName(ee.target.value)}
                    disabled={fetching}
                />
                <button type="submit">Join</button>
            </form>
        );

    } else {
        return (
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(ee) => setMessage(ee.target.value)}
                    disabled={fetching}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
