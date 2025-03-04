import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
    const { getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // // make the AJAX request
        // const response = await fetch('/register', {
        //     method: 'POST',
        //     body: JSON.stringify(values),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-type': 'application/json',
        //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        //     }
        // });

        // // parse the response as JSON
        // const response_data = await response.json();

        // // if the response code is not 2xx (success)
        // if (Math.floor(response.status / 100) !== 2) {
        //     switch (response.status) {
        //         case 422:
        //             // handle validation errors here
        //             console.log('VALIDATION FAILED:', response_data.errors);
        //             break;
        //         default:
        //             console.log('UNKNOWN ERROR', response_data);
        //             break;
        //     }
        // }

        // with axios
        try {
            // make the AJAX request
            const response = await axios.post("/register", values);
            // get the (already JSON-parsed) response data
            const response_data = response.data;

            getUser();
            navigate("/");
        } catch (error) {
            // if the response code is not 2xx (success)
            switch (error.response.status) {
                case 422:
                    // handle validation errors here
                    console.log(
                        "VALIDATION FAILED:",
                        error.response.data.errors
                    );
                    break;
                case 500:
                    console.log("UNKNOWN ERROR", error.response.data);
                    break;
            }
        }
    };

    const handleChange = (event) => {
        setValues((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <form action="/register" method="post" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
            />

            <button>Register</button>
        </form>
    );
}
