import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
// material ui imports
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2";

function OfferItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);
    const activity = useSelector((store) => store.activityItem)

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        alignContent: 'center',
        color: theme.palette.text.secondary,
    }));

    const claimOffer = () => {
        dispatch({
            type: 'CLAIM_OFFER',
            payload: activity.id
        })
        history.push('/activity')
    }

    console.log('testing', activity.id)
    return (
        <Box>
            <header>

            </header>
            <section className='request-item'>
                <Grid container spacing={0}>
                    <Item>
                    <Grid xs={12}>  
                            <Typography variant="h5">{activity.name}</Typography>
                    </Grid>
                    <Grid xs={12}>
                            <Typography variant="h7">Would like to share </Typography>
                    </Grid>
                    <Grid xs={12}>
                            <Typography variant="h6">{activity.item_name}</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <img src={activity.imgpath }/>
                    </Grid>
                    <Grid xs={12}>
                            <Typography variant="subtitle1">{activity.description}</Typography>
                    </Grid>
                    <Grid xs={12}>
                            <Typography variant="h6">This offer expires on: {activity.expires_on}</Typography>
                    </Grid>
                    
                    </Item>
                </Grid>

            </section>
            <footer>
                <Button variant="contained" onClick={() => claimOffer()}>Claim</Button>
            </footer>
        </Box>
    )
}

export default OfferItemPage;