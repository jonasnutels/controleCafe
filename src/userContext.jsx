import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './authSupabase/__auth';
import { toast } from 'sonner';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState([]);

  const [autenticado, setAutenticado] = useState(false);
  const [lista, setLista] = useState([]);

  async function handleLogin(email, senha) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        toast.error('Usuário ou senha inválido :(');
      } else {
        toast.success('Logado com sucesso (:');
        setUsuario(data.user);
        setAutenticado(true);
        setTimeout(() => {
          navigate('/lista');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  }

  async function handleAutoLogin() {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error('Erro ao renovar sessão:', error.message);
      } else if (data) {
        setUsuario(data.user);
        toast.success('Você já está logado ! ');
        setAutenticado(true);
        setTimeout(() => {
          navigate('/lista');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao renovar sessão:', error.message);
    }
  }
  async function getLista() {
    const { data } = await supabase.from('controle_cafe').select();
    setLista(data);
  }
  async function fetchUserData() {
    try {
      const refresh_token = window.localStorage.getItem('refresh_token');

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token,
      });
      const { session, user } = data;
      if (user) {
        setUsuario(user);
        setAutenticado(true);
        navigate('/lista');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }
  function handleLogout() {
    toast.info('Saindo ... ');
    setTimeout(() => {
      supabase.auth.signOut();
      setUsuario(null);
      setAutenticado(false);
      navigate('/');
    }, 1500);
  }
  async function cadastrarComEmail(email, senha) {
    if (!email || !senha) {
      toast.warning('Preencha dos campos ');
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });
      if (error) toast.error(error.message);
      if (data.user) {
        console.log(data);
        toast.success('Confirme seu email para continuar !');
        // navigate('/');
      }
    }
  }

  async function handleRegistrarCompra(dadosCompra) {
    try {
      const { data, error } = await supabase.from('controle_cafe').upsert([
        {
          nome_comprador: dadosCompra.nomeComprador,
          data_compra: dadosCompra.dataDaCompra,
          tipo_cafe: dadosCompra.tipoCafe,
          quantidade_kg: parseFloat(dadosCompra.quantidadeKg),
          fornecedor: dadosCompra.fornecedor,
          valor_total: parseFloat(dadosCompra.valorTotal),
          metodo_pagamento: dadosCompra.metodoPagamento,
          observacoes: dadosCompra.observacoes,
          email_registros: dadosCompra.email_registros,
        },
      ]);

      if (error) {
        toast.warning('Preencha os campos obrigatórios');
      } else {
        toast.success('Salvo !');
        getLista();
        setTimeout(() => {
          navigate('/lista');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao registrar compra:', error);
    }
  }

  async function resetPassword() {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        'user@email.com',
      );

      if (error) {
        console.error('Erro ao redefinir a senha:', error.message);
      } else {
        console.log('Email de redefinição de senha enviado com sucesso:', data);
      }
    } catch (error) {
      console.error('Erro inesperado:', error.message);
    }
  }
  // useEffect(() => {
  //   resetPassword();

  //   const handlePasswordRecovery = async (event, session) => {
  //     if (event === 'PASSWORD_RECOVERY') {
  //       const newPassword = prompt('Qual será a sua nova senha?');

  //       try {
  //         const { data, error } = await supabase.auth.api.updateUser({
  //           password: newPassword,
  //         });

  //         if (data) {
  //           alert('Senha atualizada com sucesso!');
  //         }

  //         if (error) {
  //           alert('Houve um erro ao atualizar a senha.');
  //           console.error('Erro ao atualizar a senha:', error.message);
  //         }
  //       } catch (error) {
  //         console.error('Erro inesperado:', error.message);
  //       }
  //     }
  //   };

  //   supabase.auth.onAuthStateChange(handlePasswordRecovery);

  //   // Limpa o event listener quando o componente é desmontado
  //   return () => supabase.auth.removeAuthListener(handlePasswordRecovery);
  // }, []);
  return (
    <UserContext.Provider
      value={{
        handleLogin,
        usuario,
        autenticado,
        fetchUserData,
        handleLogout,
        getLista,
        lista,
        handleRegistrarCompra,
        handleAutoLogin,
        cadastrarComEmail,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
