import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ActivityIcon from '../../../assets/cupOfSugarCircleArrow.png'
import OfferIcon from '../../../assets/cupOfSugarSquiggleArrow.png'
import RequestIcon from '../../../assets/cupOfSugarSquiggleArrowDL.png'
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
                    }}
                >
                    <BottomNavigationAction
                        label='Request'
                        icon={<img src={RequestIcon} width={50} />}
                        component={Link} to='/requestform'
                    />
                    <BottomNavigationAction
                        label='Activity'
                        icon={<img src={ActivityIcon} width={50} />}
                        component={Link} to='/activity'
                    />
                    <BottomNavigationAction
                        label='Offer'
                        icon={<img src={OfferIcon} width={50} />}
                        component={Link} to='/offerform1'
                    />
                </BottomNavigation>
            </Paper>
        </div>
    );
}
export default BottomNavBar;