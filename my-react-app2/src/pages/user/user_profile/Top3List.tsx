import { useContext } from 'react';
import { userContext, IUserContext } from './Top3Provider';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Top3List = () => {
    const {Top3Items } =
        useContext<IUserContext>(userContext);

    return (
        <>
            <h2>Top 3 posts</h2>

            <table className="table">
                <thead>
                <tr>
                    <th>post title</th>
                </tr>
                </thead>
                <tbody>
                {Top3Items.map((Top3Item, index) => (
                    <tr key={index}>
                        <td>
                            <li>
                                <Link to={`/post/${Top3Item.postid}`}>{Top3Item.title}</Link>
                            </li>
                        </td>



                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Top3List;