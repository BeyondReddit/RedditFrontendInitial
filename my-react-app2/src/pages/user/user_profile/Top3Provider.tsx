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
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('http://localhost:10010/posts/top')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch top 3 posts');
                }
                return response.json();
            })
            .then((data) => {

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