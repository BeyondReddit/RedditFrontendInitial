import { useState, useEffect, useContext } from 'react';
import { userContext, IUserContext } from './UserForumProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


interface AllPostItem {
    id: string;
    title: string;
    dateCreated: string;
}



const UserForumTable: React.FC<{ AllPostItems: AllPostItem[] }> = ({ AllPostItems }) => {

    const { AllPostItems: contextDraftPostItems } = useContext<IUserContext>(userContext);
    const navigate = useNavigate();

    const toNewPost= () => {
        navigate('/post/new');

    }


    const token = localStorage.getItem('Authorization');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const postHistory = (postId: string) => {
        return fetch(`http://localhost:10010/history-service/post/${postId}`, {
            method: 'POST',
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to publish post');
                }
            })
            .catch(error => {
                console.error('Error publishing post:', error);
                throw error;
            });
    };

    const fetchUserData = (id: string) => {
        return fetch(`http://localhost:10010/posts?postId=${encodeURIComponent(id.toString())}`, {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user ID');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data && data.data.userId) {
                    return data.data.userId;
                } else {
                    throw new Error('No user ID found');
                }
            })
            .catch(error => {
                console.error('Error fetching user ID:', error);
                throw error;
            });
    };

    const fetchUserDataArray = async (postItems: AllPostItem[]): Promise<number[]> => {

        const userIdPromises: Promise<number>[] = postItems.map(postItem => {
            console.log("I am using postid "+ postItem.id)
            return fetchUserData(postItem.id)
                .catch(error => {
                    console.error(`Error fetching user data for post item with ID ${postItem.id}:`, error);
                    return null; // or any value you want to represent an error
                });
        });

        const userIds: (number | null)[] = await Promise.all(userIdPromises);
        return userIds.filter(userId => userId !== null) as number[];
    };


    



    const handlePublishLinkClick = (index: number) => {
        const id = AllPostItems[index].id;
        // console.log("Current postid is "+ id);
        postHistory(id)
            .catch(error => {
                // Handle error
            })
        ;
       
    };

    const [userIds, setUserIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch user data array before rendering the table
        fetchUserDataArray(AllPostItems)
            .then(userIds => {
                setUserIds(userIds);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching user data array:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, [AllPostItems]);

    const [hiddenRows, setHiddenRows] = useState<number[]>([]);
    useEffect(() => {
        const hiddenRowsTemp: number[] = [];
        userIds.forEach((userId, index) => {
            if (userId !== 45) {
                hiddenRowsTemp.push(index);
            }
        });
        setHiddenRows(hiddenRowsTemp);
    }, [userIds]);


    const [filterActive, setFilterActive] = useState(false);

    const handleFilterClick = () => {
        setFilterActive(true); // Activate the filter
    };

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {

            const response = await fetch('http://localhost:10010/auth/getCurrentUser', {
                headers: headers
            });
            const userData = await response.json();
            setCurrentUser(userData); // Set current user data
            setLoading(false); // Set loading to false
        } catch (error) {
            console.error('Error fetching current user data:', error);
            setLoading(false); // Set loading to false in case of error
        }
    };






    return (
        // <div>
        //     <h2>Fancy Forum</h2>
        //     <button onClick={toNewPost}>Create new Post</button>
        //     <table className="table">
        //         <thead>
        //         <tr>
        //             <th>post title</th>
        //             <th>date created</th>
        //             <th>user id</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {AllPostItems.map((AllPostItem, index) => {
        //
        //                 return (
        //                     <tr key={index}>
        //                         <td>
        //                             <li>
        //                                 <Link to={`/post/${AllPostItem.id}`} onClick={(e) => { handlePublishLinkClick(index) }}>
        //                                     {AllPostItem.title}
        //                                 </Link>
        //                             </li>
        //                         </td>
        //                         <td>
        //                             {AllPostItem.dateCreated.substring(0, 10)}
        //
        //                         </td>
        //                         <td>
        //                             {userIds[index] !== null ? userIds[index] : 'Loading...'}
        //                         </td>
        //                     </tr>
        //                 );
        //
        //         })}
        //         </tbody>
        //     </table>
        //
        // </div>
        <div>
            <h2>Fancy Forum</h2>

            <button onClick={toNewPost}>Create new Post</button>

            <button onClick={handleFilterClick}>Check all your posts</button>
            <table className="table">

                <thead>
                <tr>
                    <th>post title</th>
                    <th>date created</th>
                    <th>user id</th>
                </tr>
                </thead>

                <tbody>
                {AllPostItems.map((AllPostItem, index) => {
                    
                    if (filterActive && userIds[index] !== currentUser.userId) {
                        return null; // Hide the row
                    } else {
                        return (
                            <tr key={index}>
                                
                                <td>
                                    <li>
                                        {/* Link to post */}
                                        <Link to={`/post/${AllPostItem.id}`} onClick={(e) => { handlePublishLinkClick(index) }}>
                                            {AllPostItem.title}
                                        </Link>
                                    </li>
                                </td>
                                <td>
                                    
                                    {AllPostItem.dateCreated.substring(0, 10)}
                                </td>
                                <td>
                                    
                                    {userIds[index] !== null ? userIds[index] : 'Loading...'}
                                </td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </table>
        </div>
    );
};

const UserForumList = () => {
    const { AllPostItems } = useContext<IUserContext>(userContext);


    return <UserForumTable AllPostItems={AllPostItems} />;
};

export default UserForumList;