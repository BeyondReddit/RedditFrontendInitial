import { useState, useContext } from 'react';
import { userContext, IUserContext } from './DraftPostProvider';
import { Link } from 'react-router-dom';

interface DraftPostItem {
    postid: string;
    title: string;
    status: string;
}

const DraftPostsTable: React.FC<{ DraftPostItems: DraftPostItem[] }> = ({ DraftPostItems }) => {
    const [hiddenRows, setHiddenRows] = useState<number[]>([]);
    const { DraftPostItems: contextDraftPostItems } = useContext<IUserContext>(userContext);

    const handleHideRow = (index: number) => {
        setHiddenRows([...hiddenRows, index]);
    };
    const token = localStorage.getItem('Authorization');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const publishPost = (postId: string) => {
        return fetch(`http://localhost:8080/posts/publish?postId=${postId}`, {
            method: 'PATCH',
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

    const handlePublishButtonClick = (index: number) => {
        const postId = DraftPostItems[index].postid;
        console.log("Current postid is "+ postId);
        publishPost(postId)
            .then(() => {
                handleHideRow(index);
            })
            .catch(error => {
                // Handle error
            });
    };

    return (
        <>
            <h2>All my draft posts</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>post title</th>
                    <th>status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {DraftPostItems.map((DraftPostItem, index) => {
                    if (hiddenRows.indexOf(index) === -1) {
                        return (
                            <tr key={index}>
                                <td>
                                    <li>
                                        <Link to={`/post/${DraftPostItem.postid}`}>{DraftPostItem.title}</Link>
                                    </li>
                                </td>
                                <td>
                                    {DraftPostItem.status}
                                </td>
                                <td>
                                    <button onClick={() => handlePublishButtonClick(index)}>Publish</button>
                                </td>
                            </tr>
                        );
                    } else {
                        return null; // Hide the row if it's in the hiddenRows array
                    }
                })}
                </tbody>
            </table>
        </>
    );
};

const DraftPostList = () => {
    const { DraftPostItems } = useContext<IUserContext>(userContext);

    return <DraftPostsTable DraftPostItems={DraftPostItems} />;
};

export default DraftPostList;

// import { useState, useContext } from 'react';
// import { userContext, IUserContext } from './DraftPostProvider';
// import { Link } from 'react-router-dom';
//
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// const DraftPostList = () => {
//     // const {DraftPostItems: DraftPostItems} =
//     //     useContext<IUserContext>(userContext);
//     const { DraftPostItems} = useContext<IUserContext>(userContext);
//
//
//
//
//     return (
//         <>
//             <h2>All my draft posts</h2>
//
//             <table className="table">
//                 <thead>
//                 <tr>
//                     <th>post title</th>
//                     <th>status</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {DraftPostItems.map((DraftPostItem, index) => (
//                     <tr key={index}>
//                         <td>
//                             <li>
//                                 <Link to={`/post/${DraftPostItem.postid}`}>{DraftPostItem.title}</Link>
//                             </li>
//                         </td>
//                         <td>
//                             {DraftPostItem.status}
//                         </td>
//
//
//
//
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </>
//     );
// };
//
// export default DraftPostList;
