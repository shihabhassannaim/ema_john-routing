import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework , handleGoogleSignIn , handleSignOut, createUserWithEmailAndPasswordfun, signInWithEmailAndPasswordfun } from './loginManager';

initializeLoginFramework();

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });
  
  const [loggedInUser , setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/"}};

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res , true);
    })
  }
  const googleSignedOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res , false);
    })
    
  }
  
  
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPasswordfun(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res , true);
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPasswordfun(user.email, user.password)
      .then(res => {
        handleResponse(res , true);
      })
    }
    e.preventDefault();
  }
  const handleResponse = (res , redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /^\S+@\S+\.\S+$/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      // const passHasNum = /\d(1)/.test(e.target.value);
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  

  return (
    <div style={{textAlign:"center"}}>
      {
        user.isSignedIn ? <button onClick={googleSignedOut}>Sign Out</button>
          :
          <button onClick={googleSignIn}>Sign In</button>
      }
      <button>Sign In With Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id='' />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input name='name' type='text' onBlur={handleBlur} placeholder='Write Your Name' />
        }
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='Write Your E-mail' required />
        <br />
        <br />
        <input type="password" name='password' onBlur={handleBlur} placeholder='password' required /><br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In '} Successfully. </p>
      }
    </div>
  );
}

export default Login;
