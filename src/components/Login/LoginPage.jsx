import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../userContext';
function LoginPage() {
  const { handleLogin, fetchUserData } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  useEffect(() => {
    fetchUserData();
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, senha);
    handleLogin(email, senha);
  }
  return (
    <>
      <h1>Controle de Café - TCE AL</h1>

      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <label>
            <h3>E-Mail:</h3>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <h3>Senha: </h3>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
