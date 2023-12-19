import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './authSupabase/__auth';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState([]);
  const [autenticado, setAutenticado] = useState(false);
  const [lista, setLista] = useState([]);

  async function getLista() {
    const { data } = await supabase.from('controle_cafe').select();
    setLista(data);
  }
  async function handleLogin(email, senha) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        console.error('Erro ao fazer login:', error.message);
      } else {
        setUsuario(data.user);
        window.localStorage.setItem(
          'refresh_token',
          data.session.refresh_token,
        );

        console.log('Usuário logado com sucesso user:', data);
        setAutenticado(true);
        // Adicione a lógica de redirecionamento ou manipulação de estado após o login bem-sucedido
        navigate('/lista');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
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
    window.localStorage.removeItem('refresh_token');
    setUsuario(null);
    setAutenticado(false);
    navigate('/');
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
        console.error('Erro ao registrar compra:', error);
      } else {
        console.log('Compra registrada com sucesso:', data);
        // Atualize a lista após o registro bem-sucedido
        getLista();
      }
    } catch (error) {
      console.error('Erro ao registrar compra:', error);
    }
  }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
