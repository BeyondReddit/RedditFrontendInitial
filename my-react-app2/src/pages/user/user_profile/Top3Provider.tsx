import { createContext, useState } from 'react';
import { useEffect } from 'react';

interface Top3Item {
    postid: string;
    title: string;
}

interface IProps {
    children: React.ReactNode;
}

export interface IUserContext {
    Top3Items: Top3Item[];
}

export const userContext = createContext<IUserContext>({
    Top3Items:[]
});

const Top3Provider = ({ children }: IProps) => {
    const [users, setUsers] = useState([{postid:"65c198ba70823d3e2fea0bfb",title:"Nancy"},
        {postid:"65c198ba70823d3e2fea0bfb",title:"Dorland"},
        {postid:"65c198ba70823d3e2fea0bfb",title:"Star"}]);

    useEffect(() => {

        const loadedTop3: Top3Item[] = [];
        fetch('http://localhost:10010/posts/top')
            .then((response) => response.json())
            .then((data) => {
                console.log("Current data i is"+data);

                    for (let i =0; i < data.length; i++){

                        loadedTop3.push({postid:data[i].postid,title:data[i].title});
                        console.log("Current data posttitle is"+data[i].title);
                        setUsers(loadedTop3);

                    }

                }
            );

    }, []);





    const value: IUserContext = { Top3Items: users };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export default Top3Provider;