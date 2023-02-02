import { useQuery } from "urql";

const USERS = `
    query {
        getRoom {
            users {
                name
            }
        }
    }
`;

export default function MessagesPage() {
    const [{data, fetching}] = useQuery({query: USERS});

    if (fetching) {
        return <h1>Loading...</h1>;
    } else {
        return (
            <>
                <h1>{data?.getRoom.users.length} Users Online</h1>
                <ul>
                    {data?.getRoom.users.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))}
                </ul>
            </>
        );
    }
}
