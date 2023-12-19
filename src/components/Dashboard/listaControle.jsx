import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../userContext';
import styles from './listaControle.module.css';
import ModalRegistroCompra from './ModalRegistroCompra';
import userIcon from '../../assets/user.svg';
import cartIcon from '../../assets/cart.svg';
import logoutIcon from '../../assets/logout.svg';
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
      {isModalOpen && (
        <ModalRegistroCompra
          onClose={closeModal}
          handleRegistrarCompra={handleRegistrarCompra}
        />
      )}
      <h1>Lista de controle de café</h1>
      <div className={styles.navbar}>
        <ul>
          <li>
            <img src={userIcon} alt="" width={40} />
            Olá, {usuario.email}
          </li>
        </ul>
        <ul>
          <li onClick={openModal}>
            {' '}
            <img src={cartIcon} alt="" width={40} />
            Registrar Compra
          </li>
        </ul>
        <ul>
          <li onClick={handleLogout}>
            {' '}
            <img src={logoutIcon} alt="" width={40} />
            Logout
          </li>
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
            {lista
              .sort((a, b) => new Date(b.data_compra) - new Date(a.data_compra))
              .map((item) => (
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
