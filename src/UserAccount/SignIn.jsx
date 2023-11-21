import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignIn = () => {
  let auth = "";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsPending(false);
      })
  }

  return (
    <form className="signin">
      <div>
        <label htmlFor="email-address">Email Adress</label>
        <input id="email-address" name="email" type="email" required placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
 
export default SignIn;
