import { useQuery } from "urql";

import Messages from "./Messages";
import MessageForm from "./MessageForm";

const ROOM_NAME = `
    query {
        getRoom {
            name
        }
    }
`;

export default function MessagesPage() {
    const [{data, fetching}] = useQuery({query: ROOM_NAME});

    if (fetching) {
        return <h1>Loading...</h1>;

    } else {
        return (
            <>
                <h1>{data?.getRoom.name}</h1>
                <Messages />
                <MessageForm />
            </>
        );
    }
}
