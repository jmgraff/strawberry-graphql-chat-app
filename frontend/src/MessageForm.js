import { useState } from "react";
import { useMutation } from "urql";

const SET_MESSAGE = `
    mutation ($text: String!) {
        setMessage(text: $text) {
            text
        }
    }
`;

export default function Message() {
    const [{fetching}, setMessage] = useMutation(SET_MESSAGE);
    const [text, setText] = useState("");

    const handleSubmit = (ee) => {
        ee.preventDefault();
        setMessage({text});
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(ee) => setText(ee.target.value)}
                disabled={fetching}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
