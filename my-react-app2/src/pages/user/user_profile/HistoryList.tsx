import { useContext } from 'react';
import { userContext, IUserContext } from './HistoryProvider';

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
                        <td>{HistoryItem.posttitle}</td>
                        <td>{HistoryItem.viewdate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default HistoryList;