'use client'

import {createContext, useState} from "react";

const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

}
