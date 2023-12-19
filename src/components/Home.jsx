import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
function Home() {
  const { fetchUserData } = useContext(UserContext);
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <h1> Controle de Café - TCE-AL</h1>
      <ul>
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>
    </>
  );
}

export default Home;
