import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar className={styles.footerContainer}>
          <Typography variant="h6" component="h6">
            &copy; 2024 Created by{' '}
            <Link
              to={'https://www.linkedin.com/in/jonas-nutels-dev/'}
              target="_blank"
            >
              <span className={styles.nomeDev}>Jonas Nutels</span>
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Footer;