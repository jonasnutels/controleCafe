// ModalRegistroCompra.jsx
import React, { useState, useContext } from 'react';
import { UserContext } from '../../userContext';
import styles from './modalRegistroCompra.module.css';

const ModalRegistroCompra = ({ onClose, handleRegistrarCompra }) => {
  const { usuario } = useContext(UserContext);
  const [dadosCompra, setDadosCompra] = useState({
    // Defina os campos iniciais do formulário aqui
    nomeComprador: '',
    dataDaCompra: '',
    tipoCafe: '',
    quantidadeKg: '',
    fornecedor: '',
    valorTotal: '',
    metodoPagamento: '',
    observacoes: '',
    email_registros: usuario.email,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosCompra((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chame a função para registrar a compra no supabase com dadosCompra
    handleRegistrarCompra(dadosCompra);
    onClose();
  };
  const TipoCafeSelect = ({ value, onChange }) => {
    const tiposCafe = [
      '',
      'Arábica',
      'Robusta',
      'Liberica',
      'Excelsa',
      'Outro',
    ];
    console.log(value);
    return (
      <select
        value={value}
        onChange={(e) =>
          onChange({ target: { name: 'tipoCafe', value: e.target.value } })
        }
        className={styles.selectBox}
      >
        {tiposCafe.map((tipo, index) => (
          <option key={index} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
    );
  };

  const CompradorSelect = ({ value, onChange }) => {
    const nomeComprador = [
      '',
      'Anderson Bandeira',
      'Jonas Nutels',
      'Adriano Binário',
      'André Alécio',
      'Edvan Maia',
      'Manoel Vieira',
      'Mauro Pereira',
      'Maycon Souza',
    ];

    return (
      <select
        value={value}
        onChange={(e) =>
          onChange({ target: { name: 'nomeComprador', value: e.target.value } })
        }
        className={styles.selectBox}
      >
        {nomeComprador.map((nome, index) => (
          <option key={index} value={nome}>
            {nome}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          X
        </span>
        <h2>Registrar Compra</h2>
        {/* Formulário para registrar a compra */}
        <form onSubmit={handleSubmit}>
          {/* Adicione os campos do formulário aqui */}
          <label>
            <h3>Nome do Comprador:</h3>
            <CompradorSelect
              value={dadosCompra.nomeComprador}
              onChange={handleChange}
            />
          </label>
          <label>
            <h3>Data da Compra:</h3>
            <input
              type="date"
              name="dataDaCompra"
              value={dadosCompra.dataDaCompra}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <h3>Tipo do Café:</h3>
            <TipoCafeSelect
              value={dadosCompra.tipoCafe}
              onChange={handleChange}
            />
          </label>
          <label>
            <h3>Quantidade Kg:</h3>
            <input
              type="number"
              name="quantidadeKg"
              value={dadosCompra.quantidadeKg}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <h3>Fornecedor:</h3>
            <input
              type="text"
              name="fornecedor"
              value={dadosCompra.fornecedor}
              onChange={handleChange}
              // required
            />
          </label>
          <label>
            <h3>Valor Total:</h3>
            <input
              type="number"
              name="valorTotal"
              value={dadosCompra.valorTotal}
              onChange={handleChange}
              // required
            />
          </label>
          <label>
            <h3>Observações:</h3>
            <input
              type="text"
              name="observacoes"
              value={dadosCompra.observacoes}
              onChange={handleChange}
              // required
            />
          </label>
          {/* Adicione os demais campos do formulário aqui */}
          <button type="submit">Registrar Compra</button>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroCompra;
