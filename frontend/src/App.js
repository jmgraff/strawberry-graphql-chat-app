import { Provider } from "urql";
import { urqlClient } from "./utils";

import Room from "./Room";
import MessageForm from "./MessageForm";

function App() {
    return (
        <Provider value={urqlClient}>
            <Room />
            <MessageForm />
        </Provider>
    );
}

export default App;
