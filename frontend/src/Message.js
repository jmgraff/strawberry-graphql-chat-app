import { useQuery } from "urql";

const GET_MESSAGE = `
    query {
        message {
            text
        }
    }
`;

export default function Message() {
    const [{data, fetching}] = useQuery({query: GET_MESSAGE});

    if (fetching) {
        return (
            <h1>Loading...</h1>
        );
    } else {
        return (
            <h1>{data?.message.text}</h1>
        );
    }
}
