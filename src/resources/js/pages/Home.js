import React from "react";
import {NavLink} from "react-router-dom";

export function Home() {
    return <div>
        <h3>
            Home
        </h3>
        <ul>
            <li>
                <NavLink to={"/admin"}>
                    Go to admin panel
                </NavLink>
            </li>
        </ul>
    </div>
}
