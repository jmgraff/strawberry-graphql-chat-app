import { Provider } from "urql";
import { urqlClient } from "./utils";
import { HashRouter, Route, Routes, Link } from "react-router-dom";

import MessagesPage from "./MessagesPage";
import UsersPage from "./UsersPage";

function App() {
    return (
        <Provider value={urqlClient}>
            <HashRouter>
                <div id="menu">
                    Menu:&nbsp;
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/users">Users</Link>
                </div>
                <Routes>
                    <Route path="/" element={<MessagesPage />} />
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </HashRouter>
        </Provider>
    );
}

export default App;
