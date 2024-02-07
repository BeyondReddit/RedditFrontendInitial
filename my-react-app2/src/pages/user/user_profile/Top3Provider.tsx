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

    // useEffect(() => {
    //
    //     const loadedTop3: Top3Item[] = [];
    //     fetch('http://localhost:10010/posts/top')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("Current data i is"+data);
    //
    //                 for (let i =0; i < data.length; i++){
    //
    //                     loadedTop3.push({postid:data[i].postid,title:data[i].title});
    //                     console.log("Current data posttitle is"+data[i].title);
    //                     setUsers(loadedTop3);
    //
    //                 }
    //
    //             }
    //         );
    //
    // }, []);

    useEffect(() => {
        fetch('http://localhost:8080/posts/top')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch top 3 posts');
                }
                return response.json();
            })
            .then((data) => {
                // Check if data is an object with 'data' property containing the array
                if (data && data.data && Array.isArray(data.data)) {
                    const loadedTop3: Top3Item[] = data.data.map((item: any) => ({
                        postid: item.postId,
                        title: item.title
                    }));
                    setUsers(loadedTop3);
                } else {
                    console.error('Unexpected data structure:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching top 3 posts:', error);
            });
    }, []);



    const value: IUserContext = { Top3Items: users };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export default Top3Provider;