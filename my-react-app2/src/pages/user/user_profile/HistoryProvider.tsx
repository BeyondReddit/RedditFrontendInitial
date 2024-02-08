import { createContext, useState } from 'react';
import { useEffect } from 'react';

interface HistoryItem {
    posttitle: string;
    viewdate: string;
    postid: string;
}

interface IProps {
    children: React.ReactNode;
}
export interface IUserContext {
    HistoryItems: HistoryItem[];
}

export const userContext = createContext<IUserContext>({
    HistoryItems:[]
});

const token = localStorage.getItem('Authorization');

const UserProvider = ({ children }: IProps) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {

        const loadedHistorys: HistoryItem[] = [];


        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        // console.log("token" + token);

        fetch('http://localhost:10010/history-service/all', {
            headers: headers
        })
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++){
                    loadedHistorys.push({
                        posttitle: data[i].posttitle,
                        viewdate: data[i].viewdate,
                        postid: data[i].postid
                    });
                    // console.log("Current data posttitle is" + data[i].posttitle);
                }
                setUsers(loadedHistorys);
            });

    }, []);




    const value: IUserContext = { HistoryItems: users };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export default UserProvider;