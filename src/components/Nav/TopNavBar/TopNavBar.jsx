import React, { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';
// material ui imports
import { Typography, Stack, AppBar } from '@mui/material';
import { IconButton } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
// custom icon imports
import CupIcon from '../../../assets/cupOfSugarIcon.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MaterialTheme from '../../MaterialTheme/MaterialTheme';
import { useDispatch } from 'react-redux';

function TopNavBar() {

    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector((store) => store.profile);
    const [heading, setHeading] = useState('Functional Component');
    const [anchorEl, setAnchorEl] = useState(null);
    let theme = MaterialTheme();

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROFILE' });
    }, [dispatch]);
    
    // Open the dropdown menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the dropdown menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle navigation to different pages
    const navProfile = () => {
        history.push('/profile');
        handleMenuClose();
    };

    const navUserViewGroupPage = () =>{
        history.push('/usergroup')
        handleMenuClose();
    }

    const navHowItWorks = () => {
        history.push('/howitworks');
        handleMenuClose();
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        handleMenuClose();
    };

    return (
<ThemeProvider theme={theme}>
        <AppBar sx={{bgcolor: 'warning.main'}}>
            <Stack direction='row' justifyContent="space-around" alignItems="center" >
                <Typography>
                    Cup of <br></br> Sugar
                </Typography>
                <IconButton sx={{ width: 60 }}>
                    <img src={CupIcon} height={50} width={50} />
                </IconButton>
                {/* IconButton with Dropdown Menu */}
                <IconButton
                    id='active'
                    size='large'
                    onClick={handleMenuOpen}>
                    <AccountCircleTwoToneIcon fontSize="large" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem >Hi, {profile[0]?.name}!</MenuItem>
                    <MenuItem onClick={navProfile}>Profile</MenuItem>
                    <MenuItem onClick={navUserViewGroupPage}>Group Page</MenuItem>
                    <MenuItem onClick={navHowItWorks}>How It Works</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Stack>
        </AppBar>
        </ThemeProvider>
    );
}

export default TopNavBar;