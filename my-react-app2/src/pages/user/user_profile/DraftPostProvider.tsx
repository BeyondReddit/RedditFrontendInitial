import { createContext, useState } from 'react';
import { useEffect } from 'react';

interface DraftPostItem {
    postid: string;
    title: string;
    status: string;
}
interface IProps {
    children: React.ReactNode;
}
export interface IUserContext {
    DraftPostItems: DraftPostItem[];

}

export const userContext = createContext<IUserContext>({
    DraftPostItems:[]

});

const token = localStorage.getItem('Authorization');

const DraftPostProvider = ({ children }: IProps) => {
    const [users, setUsers] = useState([{postid:"65c198ba70823d3e2fea0bfb",title:"Nancy", status:"PUBLISHED"},
        {postid:"65c198ba70823d3e2fea0bfb",title:"Dorland", status:"PUBLISHED"},
        {postid:"65c198ba70823d3e2fea0bfb",title:"Star", status:"PUBLISHED"}]);

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);


    useEffect(() => {
        fetch('http://localhost:10010/posts/unpublished', {
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
                    const loadedDraftPost: DraftPostItem[] = data.data.map((item: any) => ({
                        postid: item.postId,
                        title: item.title,
                        status: item.status
                    }));
                    setUsers(loadedDraftPost);
                } else {
                    console.error('Unexpected data structure:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching top 3 posts:', error);
            });
    }, []);



    const value: IUserContext = { DraftPostItems: users};
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export default DraftPostProvider;