import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const rows = [
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Recusado',
    customer: {
      initial: 'G',
      name: 'Gabriel Reis',
      email: 'gabriel@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Concluído',
    customer: {
      initial: 'M',
      name: 'Maria Zefiro',
      email: 'maria@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Recusado',
    customer: {
      initial: 'G',
      name: 'Gabriel Simonassi',
      email: 'gabriel@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Recusado',
    customer: {
      initial: 'M',
      name: 'Maria Zefiro',
      email: 'maria@email.com',
    },
  },
  {
    id: '#1230',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Recusado',
    customer: {
      initial: 'G',
      name: 'Gabriel Reis',
      email: 'gabriel@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Concluído',
    customer: {
      initial: 'M',
      name: 'Maria Zefiro',
      email: 'maria@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Recusado',
    customer: {
      initial: 'G',
      name: 'Gabriel Simonassi',
      email: 'gabriel@email.com',
    },
  },
  {
    id: '#1234',
    date: '20 ed fev de 2025',
    status: 'Recusado',
    customer: {
      initial: 'M',
      name: 'Maria Zefiro',
      email: 'maria@email.com',
    },
  },
  {
    id: '#1230',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  {
    id: '#1229',
    date: '20 ed fev de 2025',
    status: 'Cancelado',
    customer: {
      initial: 'R',
      name: 'Ricardo Robson',
      email: 'ricardo@email.com',
    },
  },
  
];

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
                      selected.length > 0 && selected.length !== rows.length
                    }
                    checked={selected.length === rows.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked ? rows.map((row) => row.id) : [],
                      );
                    }}
                    color={
                      selected.length > 0 || selected.length === rows.length
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
                <th style={{ width: 140, padding: '12px 6px' }}>Data</th>
                <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
                <th style={{ width: 240, padding: '12px 6px' }}>Usuário</th>
                <th style={{ width: 140, padding: '12px 6px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {[...rows].sort(getComparator(order, 'id')).map((row) => (
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
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.date}</Typography>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          Concluído: <CheckRoundedIcon />,
                          Recusado: <AutorenewRoundedIcon />,
                          Cancelado: <BlockIcon />,
                        }[row.status]
                      }
                      color={
                        {
                          Concluído: 'success',
                          Recusado: 'neutral',
                          Cancelado: 'danger',
                        }[row.status] as ColorPaletteProp
                      }
                    >
                      {row.status}
                    </Chip>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar size="sm">{row.customer.initial}</Avatar>
                      <div>
                        <Typography level="body-xs">{row.customer.name}</Typography>
                        <Typography level="body-xs">{row.customer.email}</Typography>
                      </div>
                    </Box>
                  </td>
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
