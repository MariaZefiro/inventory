import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import config from '../../config';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import axios from 'axios';
import { useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Editar</MenuItem>
        <MenuItem>Renomear</MenuItem>
        <MenuItem>Mover</MenuItem>
        <Divider />
        <MenuItem color="danger">Deletar</MenuItem>
      </Menu>
    </Dropdown>
  );
}
export default function AtivosTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [adaptadores, setAdaptadores] = React.useState([]);
  const [armazenamento, setArmazenamento] = React.useState([]);
  const [cabos, setCabos] = React.useState([]);
  const [desktops, setDesktops] = React.useState([]);
  const location = window.location.pathname;
  const backendIp = config.backend_ip;

  useEffect(() => {
    if (location === '/home/estoque/adaptadores') {
      axios.get(`${backendIp}/api/list_adaptadores`)
        .then(response => {
          setAdaptadores(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar adaptadores:', error);
        });
    } else if (location === '/home/estoque/armazenamento') {
      axios.get(`${backendIp}/api/list_armazenamento`)
        .then(response => {
          setArmazenamento(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar armazenamento:', error);
        });
    } else if (location === '/home/estoque/cabos') {
      axios.get(`${backendIp}/api/list_cabos`)
        .then(response => {
          setCabos(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar cabos:', error);
        });
    } else if (location === '/home/estoque/desktops') {
      axios.get(`${backendIp}/api/list_desktops`)
        .then(response => {
          setDesktops(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar desktops:', error);
        });
    }
  }, [location]);

  const filteredRows = location === '/home/estoque/adaptadores'
    ? adaptadores.map(adaptador => ({
      id: adaptador[0],
      name: adaptador[1],
      category: adaptador[2],
      quantity: adaptador[3],
      description: adaptador[4],
      identification: adaptador[5],
      state: adaptador[6],
      type: adaptador[7],
      inputConnection: adaptador[8],
      outputConnection: adaptador[9],
    }))
    : location === '/home/estoque/armazenamento'
      ? armazenamento.map(item => ({
        id: item[0],
        name: item[1],
        category: item[2],
        quantity: item[3],
        description: item[4],
        identification: item[5],
        state: item[6],
        type: item[7],
        capacity: item[8],
        interface: item[9],
      }))
      : location === '/home/estoque/cabos'
        ? cabos.map(item => ({
          id: item[0],
          name: item[1],
          category: item[2],
          quantity: item[3],
          description: item[4],
          identification: item[5],
          state: item[6],
          type: item[7],
          comprimento: item[8],
          material: item[9],
        }))
        : location === '/home/estoque/desktops'
          ? desktops.map(item => ({
            id: item[0],
            name: item[1],
            category: item[2],
            quantity: item[3],
            description: item[4],
            identification: item[5],
            state: item[6],
            processador: item[7],
            memoria_ram: item[8],
            armazenamento: item[9],
            fonte_alimentacao: item[10],
          }))
          : rows;

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '80%' }}>
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
            flex: '1 1 auto',
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
              '--Table-headerUnderlineThickness': '1px',
              '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
              '--TableCell-paddingY': '4px',
              '--TableCell-paddingX': '8px',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                  <Checkbox
                    size="sm"
                    indeterminate={
                      selected.length > 0 && selected.length !== filteredRows.length
                    }
                    checked={selected.length === filteredRows.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked ? filteredRows.map((row) => row.id) : [],
                      );
                    }}
                    color={
                      selected.length > 0 || selected.length === filteredRows.length
                        ? 'primary'
                        : undefined
                    }
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </th>
                <th style={{ width: 120, padding: '12px 6px' }}>
                  <Link
                    underline="none"
                    color="primary"
                    component="button"
                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                    endDecorator={<ArrowDropDownIcon />}
                    sx={[
                      {
                        fontWeight: 'lg',
                        '& svg': {
                          transition: '0.2s',
                          transform:
                            order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                        },
                      },
                      order === 'desc'
                        ? { '& svg': { transform: 'rotate(0deg)' } }
                        : { '& svg': { transform: 'rotate(180deg)' } },
                    ]}
                  >
                    Número
                  </Link>
                </th>
                <th style={{ width: 100, padding: '12px 6px' }}>Nome</th>
                <th style={{ width: 100, padding: '12px 6px' }}>Quantidade</th>
                <th style={{ width: 120, padding: '12px 6px' }}>Descrição</th>
                <th style={{ width: 100, padding: '12px 6px' }}>Estado</th>
                {location === '/home/estoque/armazenamento' && (
                  <>
                    <th style={{ width: 100, padding: '12px 6px' }}>Tipo</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Capacidade</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Interface</th>
                  </>
                )}
                {location === '/home/estoque/adaptadores' && (
                  <>
                    <th style={{ width: 100, padding: '12px 6px' }}>Tipo</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Conexão de Entrada</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Conexão de Saída</th>
                  </>
                )}
                {location === '/home/estoque/cabos' && (
                  <>
                    <th style={{ width: 100, padding: '12px 6px' }}>Tipo</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Comprimento</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Material</th>
                  </>
                )}
                {location === '/home/estoque/desktops' && (
                  <>
                    <th style={{ width: 100, padding: '12px 6px' }}>Processador</th>
                    <th style={{ width: 120, padding: '12px 6px' }}>Memória RAM</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Armazenamento</th>
                    <th style={{ width: 160, padding: '12px 6px' }}>Fonte de Alimentação</th>
                  </>
                )}
                <th style={{ width: 140, padding: '12px 6px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredRows].sort(getComparator(order, 'id')).map((row) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row.id)}
                      color={selected.includes(row.id) ? 'primary' : undefined}
                      onChange={(event) => {
                        setSelected((ids) =>
                          event.target.checked
                            ? ids.concat(row.id)
                            : ids.filter((itemId) => itemId !== row.id),
                        );
                      }}
                      slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                      sx={{ verticalAlign: 'text-bottom' }}
                    />
                  </td>
                  <td>
                    <Typography level="body-xs">{row.identification}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.name}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.quantity}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.description}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.state}</Typography>
                  </td>
                  {location === '/home/estoque/armazenamento' && (
                    <>
                      <td>
                        <Typography level="body-xs">{row.type}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.capacity}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.interface}</Typography>
                      </td>
                    </>
                  )}
                  {location === '/home/estoque/adaptadores' && (
                    <>
                      <td>
                        <Typography level="body-xs">{row.type}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.inputConnection}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.outputConnection}</Typography>
                      </td>
                    </>
                  )}
                  {location === '/home/estoque/cabos' && (
                    <>
                      <td>
                        <Typography level="body-xs">{row.type}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.comprimento}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.material}</Typography>
                      </td>
                    </>
                  )}
                  {location === '/home/estoque/desktops' && (
                    <>
                      <td>
                        <Typography level="body-xs">{row.processador}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.memoria_ram}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.armazenamento}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.fonte_alimentacao}</Typography>
                      </td>
                    </>
                  )}
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Link level="body-xs" component="button">
                        Download
                      </Link>
                      <RowMenu />
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Anterior
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Próximo
        </Button>
      </Box>
    </React.Fragment>
  );
}
