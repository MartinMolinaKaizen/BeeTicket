import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgress, Icon } from '@mui/material';
import { Link } from 'react-router-dom';

const options = [
  'Editar',
  'Eliminar',
  'Cerrar',
];

const opciones = {
  'Editar': 'edit',
  'Eliminar': 'delete',
  'Cerrar': 'check Circle'
}

const ITEM_HEIGHT = 48;

export default function LongMenu({ incidente_id, borrar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (op) => {
    switch (op) {

      case "Eliminar": {
        borrar();
        handleClose()
        return;
      }

      case "Cerrar": {
        console.log('codigo para Cerrar', incidente_id);
        handleClose()
        return;
      }

      default: {
        console.log('Accion no valida');
        handleClose()
        return;
      }
    }
  }

  // if (loadingDelete) return (<CircularProgress />)

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => {
          if (option === 'Editar') {
            return (
              <Link to="/incidentes/incidente" key={option} state={{ incidente_id }}>
                <MenuItem selected={option === 'Pyxis'} >
                  <Icon fontSize="small" color="primary" sx={{ cursor: "pointer", mx: 1 }}>
                    edit
                  </Icon>
                  {option}
                </MenuItem>
              </Link>
            )
          } else {
            return (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleAction(option)}>
                <Icon fontSize="small" color="primary" sx={{ cursor: "pointer", mx: 1 }}>
                  {opciones[option]}
                </Icon>
                {option}
              </MenuItem>
            )
          }
        })}
      </Menu>
    </div>
  );
}