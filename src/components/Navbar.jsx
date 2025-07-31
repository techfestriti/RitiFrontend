import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const mainLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    // { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Register', path: '/register' }
  ];

  return (
    <>
      <AppBar position="sticky" className="navbar-glass" elevation={0}>
        <Toolbar className="toolbar">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" className="brand">
              {/* <img src="/path-to-logo.png" alt="Tech Fest Logo" /> */}
              <span className="logo-text">Riti</span>
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            {mainLinks.map((link) => (
              <Button
                key={link.label}
                className="nav-link"
                component={Link}
                to={link.path}
              >
                {link.label}
                <span className="link-underline"></span>
              </Button>
            ))}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ className: 'drawer-paper' }}
      >
        <Box
          sx={{ width: 280 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {mainLinks.map((link) => (
              <ListItem
                button
                key={link.label}
                component={Link}
                to={link.path}
                className="drawer-item"
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ className: 'drawer-text' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;













