import React, { useState, useEffect } from "react";
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle.tsx';
import { closeSidebar } from '../utils';
import config from "../../config";
import CryptoJS from 'crypto-js';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const secretKey = config.secretKey;
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({});
  const location = window.location.pathname;
  
  const menuItems = [
    { label: 'Home', icon: <HomeRoundedIcon />, route: '/home' }, 
    { label: 'Dashboard', icon: <DashboardRoundedIcon /> },
    { label: 'Entradas e Saídas', icon: <ShoppingCartRoundedIcon />, route: '/home/entradas-saidas' },
    {
      label: 'Estoque',
      icon: <AssignmentRoundedIcon />,
      route: '/home/estoque',
      subItems: [
        { label: 'Todos componentes', route: '/home/estoque/todos-componentes' },
        { label: 'Adaptadores', route: '/home/estoque/adaptadores' },
        { label: 'Armazenamento', route: '/home/estoque/armazenamento' },
        { label: 'Cabos', route: '/home/estoque/cabos' },
        { label: 'Desktops', route: '/home/estoque/desktops' },
        // { label: 'Monitores', route: '/home/estoque/monitores' },
      ],
    },
  ];
  
  const [filteredItems, setFilteredItems] = useState(menuItems);
  
  useEffect(() => {
    const cachedData = getUserData();
    setFilteredItems(menuItems); // Initialize with all menu items
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const getUserData = () => {
    const cachedData = localStorage.getItem('userData');
    if (!cachedData) return null; // Retorna null se não houver dados no localStorage

    try {
      // Descriptografar o dado
      const bytes = CryptoJS.AES.decrypt(cachedData, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const nomeCompleto = decryptedData.nome_completo.split(' ');
      const nomeFormatado = `${nomeCompleto[0]} ${nomeCompleto[nomeCompleto.length - 1]}`;
      setNome(nomeFormatado);
      setUsuario(decryptedData.usuario);
      return decryptedData;
    } catch (error) {
      console.error('Erro ao descriptografar os dados:', error);
      return null; // Retorna null se ocorrer um erro na descriptografia
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = menuItems.filter(item => {
      if (item.label.toLowerCase().includes(query)) {
        return true;
      }
      if (item.subItems) {
        return item.subItems.some(subItem => subItem.label.toLowerCase().includes(query));
      }
      return false;
    });

    setFilteredItems(filtered);
  };

  const toggleSubmenu = (index: number) => {
    setOpenSubmenus(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },

        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Logo />
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Buscar"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {filteredItems.map((item, index) => (
            <ListItem key={index} nested={!!item.subItems}>
              <ListItemButton
                onClick={() => item.subItems ? toggleSubmenu(index) : item.route && navigate(item.route)}
                sx={{
                  backgroundColor: location === item.route ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                {item.icon}
                <ListItemContent>
                  <Typography level="title-sm">{item.label}</Typography>
                </ListItemContent>
                {item.subItems && (
                  <KeyboardArrowDownIcon
                    sx={[
                      openSubmenus[index]
                        ? {
                            transform: 'rotate(180deg)',
                          }
                        : {
                            transform: 'none',
                          },
                    ]}
                  />
                )}
              </ListItemButton>
              {item.subItems && openSubmenus[index] && (
                <List sx={{ gap: 0.5 }}>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem key={subIndex} sx={{ mt: 0.5 }}>
                      <ListItemButton
                        onClick={() => navigate(subItem.route)}
                        sx={{
                          backgroundColor: location === subItem.route ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        {subItem.label}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Fale Conosco
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Configuraçẽos
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://chat.lestetelecom.com.br/avatar/maria_zefiro"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{nome}</Typography>
          <Typography level="body-xs">{usuario}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
