import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import styles from './listaControle.module.css';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { UserContext } from '../../userContext';
import { format, parseISO } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
const columns = [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 70,
  //   headerClassName: 'super-app-theme--header',
  // },
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
  {
    field: 'registrado_em',
    headerName: 'Data do Registro',
    width: 162,
    renderCell: (params) => {
      const dataFormatada = format(new Date(params.value), 'dd/MM/yyyy');
      return <span>{dataFormatada}</span>;
    },
  },
  {
    field: 'data_compra',
    headerName: 'Data da Compra',
    width: 162,
    renderCell: (params) => {
      const dataFormatada = format(new Date(params.value), 'dd/MM/yyyy');
      return <span>{dataFormatada}</span>;
    },
  },
  {
    field: 'email_registros',
    headerName: 'Quem Registrou',
    width: 200,
    renderCell: (params) => {
      // Separando o e-mail pelo caractere '@' e pegando a parte antes do '@'
      const emailUsuario = params.value.split('@')[0];
      return <span>{emailUsuario}</span>;
    },
  },
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

  const datasRepetidas = lista.reduce((acc, compra) => {
    acc[compra.data_compra] = (acc[compra.data_compra] || 0) + 1;
    return acc;
  }, {});

  // Filtra apenas as compras que têm datas repetidas
  const comprasComDatasRepetidas = lista.filter(
    (lista) => datasRepetidas[lista.data_compra] > 1,
  );
  const compraMaisAntiga =
    lista.length > 0
      ? [...lista].sort(
          (a, b) => new Date(a.data_compra) - new Date(b.data_compra),
        )[0]
      : null;
  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeader: {
            backgroundColor: 'rgb(129 140 248)', // Cor do cabeçalho
            color: 'white',
            fontSize: '18px',
          },
        },
      },
    },
  });
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const CompraCard = ({
    compraMaisRecente,
    adicionarCompraNova,
    removerProximoDaFila,
    filaCompras,
  }) => {
    return (
      <Card
        sx={{
          width: { xs: '100%', md: 400 },
          height: 'auto',
          marginBottom: 5,
        }}
      >
        <CardContent>
          {compraMaisRecente
            ? formatDistanceToNow(compraMaisRecente.data_compra, {
                locale: ptBR,
                addSuffix: true,
              })
            : null}
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

          {/* Lista de compradores na fila */}
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Fila de Compradores:
          </Typography>
          <ul>
            {filaCompras.map((comprador, index) => (
              <li key={index}>{comprador}</li>
            ))}
          </ul>

          {/* Botões para adicionar e remover da fila */}
          <Button
            variant="contained"
            onClick={() => adicionarCompraNova(compraMaisRecente)}
          >
            Adicionar à Fila
          </Button>
          <Button variant="contained" onClick={() => removerProximoDaFila()}>
            Remover Próximo da Fila
          </Button>
        </CardContent>
      </Card>
    );
  };
  return (
    <div className={styles.tableCafe}>
      <div className={styles.cardsContainer}>
        <Card
          sx={{
            width: { xs: '100%', md: 400 },
            height: 'auto',
            marginBottom: 5,
          }}
        >
          <CardContent>
            {compraMaisRecente
              ? formatDistanceToNow(compraMaisRecente.data_compra, {
                  locale: ptBR,
                  addSuffix: true,
                })
              : null}
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
        {/* <Card
          sx={{
            width: { xs: '100%', md: 400 },
            height: 'auto',
            marginBottom: 5,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Ordem de compra
            </Typography>
            <Typography variant="h7" gutterBottom>
              {lista.map((item) => (
                <>
                  <ul>
                    <li>{item.nome_comprador}</li>
                  </ul>
                </>
              ))}
            </Typography>
          </CardContent>
        </Card> */}

        <Card
          sx={{
            width: { xs: '100%', md: 400 },
            height: 'auto',
            marginBottom: 5,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Pessoas que não constam no sistema
            </Typography>
            <Typography variant="h7" gutterBottom color={'red'}>
              <ul className={styles.list}>
              

                <li>
                  <span>Manoel</span>
                  <RemoveShoppingCartIcon />
                </li>
                <li>
                  Mauro
                  <RemoveShoppingCartIcon />
                </li>
                <li>
                  Wendel
                  <RemoveShoppingCartIcon />
                </li>
                <li>
                  Silvestre
                  <RemoveShoppingCartIcon />
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Typography variant="h4" component="h4">
        Últimas compras
      </Typography>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={lista}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </ThemeProvider>
    </div>
  );
}
