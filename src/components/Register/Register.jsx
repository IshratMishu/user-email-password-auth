import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsAndCondition = e.target.checkbox.checked;
        console.log(name, email, password, termsAndCondition);

        // reset error
        setRegisterError('');
        setSuccess('');


        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should be at least one upper case characters');
            return;
        }
        else if(!termsAndCondition){
            setRegisterError('Please accept our terms & conditions');
            return;
        }


        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('Successfully Registered');

                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() => {
                    console.log(' Profile updated!');
                  })
                  .catch((error) => {
                    console.error(error , 'An error occurred');    
                  })

                //send verification email
                sendEmailVerification(auth.currentUser)
                .then( ()=>{
                    alert('Email verification sent!');
                })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }


    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl text-center font-semibold mb-10 mt-5">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name="name" className="grow" placeholder="Your Name" required />
                    </label>
                    <br />
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email" name="email" className="grow" placeholder="Email" required />
                    </label>
                    <br />
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="grow"
                            placeholder="Password" required />
                        <span onClick={() => { setShowPassword(!showPassword) }}>
                            {
                                showPassword ? <IoEye /> : <IoEyeOff />
                            }
                        </span>
                    </label>
                    <br />
                    <div className="form-control">
                        <label className="flex items-center gap-5">    
                            <input type="checkbox" name="checkbox" defaultChecked className="checkbox" />
                            <span className="label-text">Accept our <a>Terms & Conditions</a></span>
                        </label>
                    </div>
                    <br />
                    <div className="text-center border-2 bg-zinc-950 text-white p-2">
                        <input type="submit" value="Register" />
                    </div>
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
                <p>Already Have an Account? Please <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;