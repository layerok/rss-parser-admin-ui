import React from "react";
import {Link} from "react-router-dom";

export const Dashboard = () => {
    return <div>
        Dashboard
        <ul>
            <li>
                <Link to="/admin/posts">Posts</Link>
            </li>
        </ul>

    </div>
}
