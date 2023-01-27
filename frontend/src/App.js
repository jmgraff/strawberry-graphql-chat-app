import { Provider } from "urql";
import { urqlClient } from "./utils";

import Message from "./Message";
import MessageForm from "./MessageForm";

function App() {
    return (
        <Provider value={urqlClient}>
            <Message />
            <MessageForm />
        </Provider>
    );
}

export default App;
