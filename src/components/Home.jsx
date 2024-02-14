import React, { useState, useContext, useEffect } from 'react';
import astro from '../assets/astronauta.png';
import styles from './Home.module.css';
import { UserContext } from '../userContext';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from 'sonner';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { Link } from 'react-router-dom';
import 'animate.css';

function Home() {
  const { handleLogin, handleAutoLogin } = useContext(UserContext);
  useEffect(() => {
    handleAutoLogin();
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    function validarEntrada(email, senha) {
      if (!email.length || !senha.length) {
        toast.warning(
          'Os campos de email e senha devem estar preenchidos para efetuar o login (;',
        );
        return false;
      }
      if (senha.length < 6) {
        toast.warning('A Senha tem no mínimo 6 caracteres');
        return false;
      }
      return true;
    }

    if (validarEntrada(email, senha)) {
      handleLogin(email, senha);
    }
  }

  function seePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div
      className={`${styles.App} ${styles.Home} animate__animated animate__fadeInLeft`}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <CoffeeIcon fontSize="large" />
          <h1>Entre</h1>
        </div>
        <Box
          component="form"
          autoComplete="on"
          onSubmit={handleSubmit}
          className={styles.boxForm}
        >
          <TextField
            value={email}
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'Password'}
            variant="outlined"
            onChange={(e) => setSenha(e.target.value)}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox onClick={seePassword} />}
              label="Ver senha ?"
            />
            <Link to={'cadastrar'} className={styles.cadastrarse}>
              Cadastrar-se
            </Link>
          </FormGroup>

          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Home;
