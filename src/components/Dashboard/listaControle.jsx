import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../userContext';
import styles from './listaControle.module.css';
import ModalRegistroCompra from './ModalRegistroCompra';
function ListaControle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleLogout, usuario, lista, getLista, handleRegistrarCompra } =
    useContext(UserContext);
  useEffect(() => {
    getLista();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Lista de controle de café</h1>
      <div className={styles.navbar}>
        <ul>
          <li>Olá, {usuario.email}</li>
          <li onClick={openModal}>Registrar Compra</li>

          {/* Renderize o modal se estiver aberto */}
          {isModalOpen && (
            <ModalRegistroCompra
              onClose={closeModal}
              handleRegistrarCompra={handleRegistrarCompra}
            />
          )}
        </ul>
        <ul>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className={styles.tabela}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Comprador</th>
              <th>Data do Registro</th>
              <th>Data da Compra</th>
              <th>Tipo de Café</th>
              <th>Quantidade (kg)</th>
              <th>Fornecedor</th>
              <th>Valor Total</th>
              <th>Observações</th>
              <th>Email Registro</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome_comprador}</td>
                <td>{new Date(item.registrado_em).toLocaleDateString()}</td>
                <td>{new Date(item.data_compra).toLocaleDateString()}</td>
                <td>{item.tipo_cafe}</td>
                <td>{item.quantidade_kg}</td>
                <td>{item.fornecedor}</td>
                <td>{item.valor_total}</td>
                <td>{item.observacoes}</td>
                <td>{item.email_registros}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListaControle;
