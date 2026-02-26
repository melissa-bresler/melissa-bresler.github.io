import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  MenuItem,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

interface SubMenuItem {
  label: string;
  path: string;
}

export interface MenuItemType {
  label: string;
  path?: string;
  subMenu?: SubMenuItem[];
}

interface ResponsiveMenuItemProps {
  item: MenuItemType;
  handleClose: () => void;
}

// https://codesandbox.io/p/sandbox/mui-menu-with-sub-menu-wrwne0?file=%2Fdemo.js%3A4%2C47
export const ResponsiveMenuItem: React.FC<ResponsiveMenuItemProps> = ({
  item,
  handleClose,
}) => {
  const { label, path, subMenu } = item;

  if (!subMenu) {
    return (
      <MenuItem component={Link} to={path!} onClick={handleClose}>
        <Typography textAlign="center">{label}</Typography>
      </MenuItem>
    );
  }

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{ backgroundColor: "transparent" }}
    >
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography>{label}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0 }}>
        {subMenu.map((subItem: SubMenuItem) => (
          <MenuItem
            key={subItem.label}
            component={Link}
            to={subItem.path}
            onClick={handleClose}
            sx={{ pl: 4 }}
          >
            {subItem.label}
          </MenuItem>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
