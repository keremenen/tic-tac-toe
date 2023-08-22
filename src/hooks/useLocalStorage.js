import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {

    const [data, setData] = useState(() => {
        const variableFromLocalStorage = localStorage.getItem(key);
        if (!variableFromLocalStorage) {
            return defaultValue;
        } else {
            try {
                return JSON.parse(variableFromLocalStorage);
            } catch (error) {
                console.error(`Error parsing JSON for key ${key}:`, error);
                return defaultValue;
            }
        }
    });


    const updateData = (newData) => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    return { data, updateData };
};
