import { createContext, useState } from 'react';
import { useEffect } from 'react';

interface AllPostItem {
    id: string;
    title: string;
    dateCreated: string;
}

interface IProps {
    children: React.ReactNode;
}

export interface IUserContext {
    AllPostItems: AllPostItem[];

}

export const userContext = createContext<IUserContext>({
    AllPostItems:[]

});

const token = localStorage.getItem('Authorization');

const UserForumProvider = ({ children }: IProps) => {
    const [users, setUsers] = useState([]);

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);


    useEffect(() => {
        fetch('http://localhost:10010/posts/all', {
            headers: headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch draft posts');
                }
                return response.json();
            })
            .then((data) => {
                // Check if data is an object with 'data' property containing the array
                if (data && data.data && Array.isArray(data.data)) {
                    const loadedAllPost: AllPostItem[] = data.data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        dateCreated: item.dateCreated
                    }));
                    setUsers(loadedAllPost);
                } else {
                    console.error('Unexpected data structure:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching top 3 posts:', error);
            });
    }, []);



    const value: IUserContext = { AllPostItems: users};
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export default UserForumProvider;