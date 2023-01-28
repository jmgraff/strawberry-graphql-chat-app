import { createClient, defaultExchanges, subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(
            `ws://${process.env.REACT_APP_HOSTNAME}:8000/graphql`, {
            reconnect: true,
            lazy: true
        });

export const urqlClient = createClient({
    url: `http://${process.env.REACT_APP_HOSTNAME}:8000/graphql`,
    exchanges: [
        subscriptionExchange({
            forwardSubscription: (operation) => subscriptionClient.request(operation)
        }),
        ...defaultExchanges
    ]
});
