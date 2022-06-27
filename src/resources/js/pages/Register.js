import {inject, observer} from "mobx-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const RegisterRaw = (
    {
        AuthStore: {
            register
        }
    }
) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setErrors([]);
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = fd.get('name');
        const email = fd.get('email');
        const password = fd.get('password');
        const password_confirmation = fd.get('password_confirmation');


        const data = {
            name,
            email,
            password,
            password_confirmation,
        }

        register(data).then(() => {
            navigate('/login')
        }).catch(e => {
            const errors = JSON.parse(e.response.data);
            setErrors(errors);
        });


    }

    return  <div>

        <form method="post" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name*" />
            <br/>
            <input type="text" name="email" placeholder="email*" />
            <br/>
            <input type="text" name="password" placeholder="password*" />
            <br/>
            <input type="text" name="password_confirmation" placeholder="password confirmation*" />
            <br/>
            <button type="submit">Register</button>
            {Object.keys(errors).length > 0 &&(
                <ul>
                    {Object.keys(errors).map((key) => (
                        <li key={key} style={{color: "red"}}>
                            {errors[key]}
                        </li>

                    ))}
                </ul>
            )}

        </form>
    </div>
}

export const Register = inject('AuthStore')(observer(RegisterRaw))
