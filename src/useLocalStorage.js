import React, {useState} from 'react';

export default function useLocalStorage(val) {
    let [word, setWord] = useState(val);

    return [word, setWord];
}