import {useAuth} from "../auth/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";


export const Login = observer(() => {
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(auth.user) {
            navigate('/');
        }
    })

    const handleSubmit = (e) => {
        setErrors([]);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const pass = formData.get('password');
        if(email && pass) {
            auth.login(email, pass).then(() => {
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                navigate(from);
            }).catch(e => {
                console.log(e);
                setErrors(["Login failed"])
            });
        }

    }

    console.log('loading', auth.loading);


    return <div>
        <p>You must log in to view the page at {from}</p>
        <form method="post" onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="email" required/>
            <input type="text" name="password" placeholder="password" required/>
            <button type="submit">Login</button>
        </form>
        {auth.loading && (
            "...loading"
            )}
        <br/>
        {errors.map((err, i) => (
            <span style={{color: "red"}} key={i}>{err}</span>
        ))}
    </div>
})
