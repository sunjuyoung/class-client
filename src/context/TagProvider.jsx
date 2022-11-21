import { createContext,useState,useEffect } from "react";

const TagContext = createContext();

export const TagProvider = ({ children }) => {
    const [topTag, setTopTag] = useState([]);

    useEffect(() => {

      }, []);

    return(
        <TagContext.Provider value={{ topTag, setTopTag}}>
            {children}
        </TagContext.Provider>
    )
}

export default TagContext;