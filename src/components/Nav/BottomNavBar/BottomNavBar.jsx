import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import { zIndex } from '@mui/material/styles/zIndex';
import './BottomNavBar.css';

function BottomNavBar({ value, setValue }) {

    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <Paper sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
            }}
                elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    sx={{
                        height: 80,
                        width: '100%',
                        position: 'fixed',
                        bottom: 0,
                        backgroundColor: 'secondary.light',
                        zIndex: 2,
                    }}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                    <BottomNavigationAction
                        label='Request'
                        icon={<TurnSlightLeftIcon />}
                        component={Link} to='/requestform'
                    />

                    <BottomNavigationAction
                        label='Activity'
                        icon={<ThreeSixtyIcon />}
                        component={Link} to='/activity'
                    />

                    <BottomNavigationAction
                        label='Offer'
                        icon={<TurnSlightRightIcon />}
                        component={Link} to='/offerform1'
                    />

                </BottomNavigation>
            </Paper>
        </div>
    );
}
export default BottomNavBar;