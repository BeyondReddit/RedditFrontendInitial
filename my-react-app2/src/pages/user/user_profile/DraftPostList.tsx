import { useContext } from 'react';
import { userContext, IUserContext } from './DraftPostProvider';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const DraftPostList = () => {
    const {DraftPostItems: DraftPostItems } =
        useContext<IUserContext>(userContext);

    return (
        <>
            <h2>All my draft posts</h2>

            <table className="table">
                <thead>
                <tr>
                    <th>post title</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody>
                {DraftPostItems.map((DraftPostItem, index) => (
                    <tr key={index}>
                        <td>
                            <li>
                                <Link to={`/post/${DraftPostItem.postid}`}>{DraftPostItem.title}</Link>
                            </li>
                        </td>
                        <td>
                            {DraftPostItem.status}
                        </td>



                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default DraftPostList;