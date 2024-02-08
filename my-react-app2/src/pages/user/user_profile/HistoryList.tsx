import { useContext } from 'react';
import { userContext, IUserContext } from './HistoryProvider';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


const HistoryList = () => {
    const {HistoryItems } =
        useContext<IUserContext>(userContext);

    return (
        <>
            <h2>History list</h2>

            <table className="table">
                <thead>
                <tr>
                    <th>post title</th>
                    <th>View Date</th>
                </tr>
                </thead>
                <tbody>
                {HistoryItems.map((HistoryItem, index) => (
                    <tr key={index}>
                        <td>
                            <li>
                                <Link to={`/post/${HistoryItem.postid}`}>{HistoryItem.posttitle}</Link>
                            </li>
                        </td>


                        <td>{HistoryItem.viewdate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default HistoryList;