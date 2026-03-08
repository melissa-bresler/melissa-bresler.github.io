import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Container,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import controller from "../assets/navbar-controller.png";
import { useDarkMode } from "../hooks/UseDarkMode";
import { MenuItemType, ResponsiveMenuItem } from "./ResponsiveMenuItem";
import MenuIcon from "@mui/icons-material/Menu";

const menuItems: MenuItemType[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Games",
    subMenu: [
      { label: "Adventure.exe", path: "/adventureExe" },
      { label: "Memory Meltdown", path: "/memory-meltdown" },
      { label: "Kaax's Dawn", path: "/kaaxs-dawn" },
      { label: "Biosynth", path: "/biosynth" },
    ],
  },
  {
    label: "About",
    path: "/about",
  },
];

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const [gamesAnchorEl, setGamesAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenGamesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setGamesAnchorEl(event.currentTarget);
  };

  const handleCloseGamesMenu = () => {
    setGamesAnchorEl(null);
  };

  const isDarkMode = useDarkMode();
  const textColour = isDarkMode ? "var(--black)" : "var(--white)";

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: isDarkMode ? "var(--white)" : "var(--black)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop view */}
          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: textColour,
                textDecoration: "none",
              }}
            >
              MELISSA BRESLER
            </Typography>
            <img src={controller} alt="Logo" className={styles.imageDesktop} />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item) =>
              !item.subMenu ? (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path ?? ""}
                  sx={{ color: textColour }}
                >
                  {item.label}
                </Button>
              ) : (
                <React.Fragment key={item.label}>
                  <Button
                    sx={{ color: textColour }}
                    onClick={handleOpenGamesMenu}
                  >
                    {item.label}
                  </Button>

                  <Menu
                    anchorEl={gamesAnchorEl}
                    open={Boolean(gamesAnchorEl)}
                    onClose={handleCloseGamesMenu}
                  >
                    {item.subMenu.map((subItem) => (
                      <MenuItem
                        key={subItem.label}
                        component={Link}
                        to={subItem.path}
                        onClick={handleCloseGamesMenu}
                      >
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ),
            )}
          </Box>

          {/* Mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={isDarkMode ? "default" : "inherit"}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {menuItems.map((item) => (
                <ResponsiveMenuItem
                  key={item.label}
                  item={item}
                  handleClose={handleCloseNavMenu}
                />
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: textColour,
              textDecoration: "none",
            }}
          >
            MEL B
          </Typography>
          <img src={controller} alt="Logo" className={styles.imageMobile} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
