import { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Menu, MenuItem, Avatar, Badge } from '@mui/material';
import {
  Menu as MenuIcon,
  TrendingUp,
  ShowChart,
  Person,
  AutoGraph,
  AccountBalance,
  Article,
  School,
  CardMembership,
  LocalOffer,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { logout } from '../../store/slices/authSlice';
import Dashboard from '../../pages/Dashboard';
import FundAnalysis from '../../pages/FundAnalysis';
import Portfolio from '../../pages/Portfolio';
import MarketTicker from '../MarketTicker';
import FundPurchase from '../../pages/FundPurchase';
import Login from '../../pages/Login';
import { useTheme } from '@mui/material/styles';
import NewsDialog from '../NewsDialog';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

const drawerWidth = 240;

const menuItems: MenuItem[] = [
  { text: 'Fon Analiz', icon: <ShowChart />, path: '/fund-analysis' },
  { text: 'Trend Fonlar', icon: <TrendingUp />, path: '/trending-funds' },
  { text: 'Fon Strateji', icon: <AutoGraph />, path: '/fund-strategy' },
  { text: 'Fon Uzman', icon: <Person />, path: '/fund-expert' },
  { text: 'Robo Portföy', icon: <AutoGraph />, path: '/robo-portfolio' },
  { text: 'Portföyüm', icon: <AccountBalance />, path: '/portfolio' },
  { text: 'Haberler', icon: <Article />, path: '/news' },
  { text: 'Yayınlar', icon: <Article />, path: '/publications' },
  { text: 'InvestWise Akademi', icon: <School />, path: '/academy' },
  { text: 'Abonelik İşlemleri', icon: <CardMembership />, path: '/subscription' },
  { text: 'Kampanyalarımız', icon: <LocalOffer />, path: '/campaigns' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);
  const { unreadCount } = useSelector((state: RootState) => state.news);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
    handleMenuClose();
  };

  const drawer = (
    <Box>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => {
              if (item.text === 'Haberler') {
                setNewsDialogOpen(true);
              } else {
                navigate(item.path);
              }
              setMobileOpen(false);
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.text === 'Haberler' ? (
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -3,
                      top: 3,
                      animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(1)',
                          opacity: 1,
                        },
                        '50%': {
                          transform: 'scale(1.1)',
                          opacity: 0.7,
                        },
                        '100%': {
                          transform: 'scale(1)',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                >
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'inherit' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          zIndex: theme.zIndex.drawer + 2,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': { 
                  opacity: 0.9,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
              onClick={() => {
                navigate('/');
                setMobileOpen(false);
              }}
            >
              <AccountBalance sx={{ fontSize: 28 }} />
              InvestWise
            </Typography>
          </Box>
          
          <Box>
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user?.name ? user.name[0].toUpperCase() : 'G'}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
        <MarketTicker />
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth }, 
          flexShrink: { sm: 0 },
          mt: '112px', // Height of AppBar + MarketTicker
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              mt: '112px', // Height of AppBar + MarketTicker
              backgroundColor: 'rgba(18, 24, 40, 0.95)',
              color: '#fff',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              mt: '112px', // Height of AppBar + MarketTicker
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(18, 24, 40, 0.95)',
              color: '#fff',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: 'linear-gradient(-45deg, #2a3f6f, #3f5a8a, #1e2533, #2a3550)',
          backgroundSize: '400% 400%',
          animation: 'gradient 45s ease infinite',
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
          minHeight: '100vh',
          color: '#ffffff',
          mt: '112px', // Height of AppBar + MarketTicker
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fund-analysis" element={<FundAnalysis />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/fund-purchase" element={<FundPurchase />} />
        </Routes>
      </Box>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            backgroundColor: 'rgba(18, 24, 40, 0.95)',
            color: '#fff',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '& .MuiListItemIcon-root': {
              color: 'inherit',
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'rgba(18, 24, 40, 0.95)',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? (
          [
            <MenuItem key="profile" onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Hesabım
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Çıkış Yap
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Giriş Yap
          </MenuItem>
        )}
      </Menu>

      <NewsDialog
        open={newsDialogOpen}
        onClose={() => setNewsDialogOpen(false)}
      />
    </Box>
  );
} 