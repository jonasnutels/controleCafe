import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from './listaControle.module.css';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { UserContext } from '../../userContext';
import { format, parseISO } from 'date-fns';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    headerClassName: 'super-app-theme--header',
  },
  { field: 'nome_comprador', headerName: 'Nome', width: 250 },

  { field: 'tipo_cafe', headerName: 'Tipo do Café', width: 150 },
  { field: 'valor_total', headerName: 'Valor Total', width: 100 },
  {
    field: 'quantidade_kg',
    headerName: 'Kg',
    type: 'number',
    width: 90,
  },
  { field: 'fornecedor', headerName: 'Marca', width: 150 },
  { field: 'observacoes', headerName: 'Observações', width: 150 },
  { field: 'registrado_em', headerName: 'Data do Registro', width: 150 },
  { field: 'data_compra', headerName: 'Data da Compra', width: 150 },
  { field: 'email_registros', headerName: 'Quem Registrou', width: 150 },
];

export default function ListaControle() {
  const { lista, getLista } = React.useContext(UserContext);
  React.useEffect(() => {
    getLista();
  }, []);
  const compraMaisRecente =
    lista.length > 0
      ? [...lista].sort(
          (a, b) => new Date(b.data_compra) - new Date(a.data_compra),
        )[0]
      : null;

  return (
    <div className={styles.tableCafe}>
      <Card sx={{ width: { xs: 200, md: 400 }, height: 230, marginBottom: 5 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Último comprador:
          </Typography>
          <Typography variant="h7" gutterBottom>
            {compraMaisRecente && (
              <>
                <p>Nome: {compraMaisRecente.nome_comprador}</p>
                <p>
                  Data:{' '}
                  {format(
                    parseISO(compraMaisRecente.data_compra),
                    'dd/MM/yyyy',
                  )}
                </p>
                <p>Quantidade: {compraMaisRecente.quantidade_kg}</p>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h4" component="h4">
        Últimas compras
      </Typography>
      <DataGrid
        rows={lista}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}
