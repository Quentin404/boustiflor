import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () => {
  let auth = "";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
    setError(null);

    auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        //const user = userCredential.user;
        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Error code: " + errorCode + ". Firebase says: " + errorMessage)
        if (errorCode === "auth/invalid-email"){
          setError("This email adress is not valid.")
        }
        else if (errorCode === "auth/invalid-login-credentials") {
          setError("The credentials you provided are incorrect");
        } 
        setIsPending(false);
      })
  }

  return (
    <form className="login">
      <div>
        <label htmlFor="email-address">Email Adress</label>
        <input id="email-address" name="email" type="email" required placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div className="error">{error}</div>}
      <div>
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </form>
  );
}
 
export default Login;
