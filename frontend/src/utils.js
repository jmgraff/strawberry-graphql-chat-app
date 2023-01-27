import { createClient, defaultExchanges } from "urql";

export const urqlClient = createClient({
    url: `http://${process.env.REACT_APP_HOSTNAME}:8000/graphql`,
    exchanges: [...defaultExchanges]
});
