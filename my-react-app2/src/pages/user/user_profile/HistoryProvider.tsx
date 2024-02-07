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
    const [users, setUsers] = useState([{posttitle:"gogo1",viewdate:"1998-10-12 22:31:34", postid:"65c198ba70823d3e2fea0bfb"},
        {posttitle:"gogo2",viewdate:"1998-10-13 22:31:34", postid:"65c198ba70823d3e2fea0bfb"},
        {posttitle:"gogo3",viewdate:"1998-10-14 22:31:34", postid:"65c198ba70823d3e2fea0bfb"}]);

    // useEffect(() => {
    //
    //     const loadedHistorys: HistoryItem[] = [];
    //     fetch('http://localhost:10010/history-service/all')
    //         .then((response) => response.json())
    //         .then((data) => {
    //
    //                 for (let i =0; i < data.length; i++){
    //                     loadedHistorys.push({posttitle:data[i].posttitle,viewdate:data[i].viewdate});
    //                     console.log("Current data posttitle is"+data[i].posttitle);
    //                     setUsers(loadedHistorys);
    //                 }
    //             }
    //         );
    //
    // }, []);

    useEffect(() => {

        const loadedHistorys: HistoryItem[] = [];


        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        fetch('http://localhost:8082/history-service/all', {
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