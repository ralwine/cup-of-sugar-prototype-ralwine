import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material';
import { Button, Typography, Stack } from "@mui/material";
import Box from '@mui/material/Box';

function OfferFormPage1() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [offerImage, setOfferImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [itemHeadline, setItemHeadline] = useState('')

    const handleOfferFormPage2 = () => {
        const itemNamePhoto = {
            itemHeadline,
            offerImage,
        }
        // dispatch to offer reducer to store item headline 
        dispatch({ type: 'CREATE_NEW_OFFER1', payload: itemNamePhoto })
        // navigate to page 2 of offer form for this item
        history.push(`/offerform2/${itemHeadline}`)
    }

    const offerImageUpload = (image) => {
        setOfferImage(image);
        setPreviewImage(URL.createObjectURL(image));
    }

    // prefill text for tomato offer during presentation
    const filloutOffer = () => {
        setItemHeadline('Fresh off the vine Tomatoes')
    }

    return (
        <>
            <Box
                component="form"
                justifyContent="center"
                align="center"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                    mt: 2
                }}
            >               
                <Typography variant='h4'  >
                    Make an offer
                </Typography>
                <Typography variant='h5'  >
                    I would like to share:
                </Typography>
                </Box>

                <Stack spacing={2} sx={{mt: 3, mx: '1rem'}}>
                <Typography align='left' >
                    Headline:
                    </Typography>
                    <TextField
                        required
                        type='text'
                        placeholder='What item are you offering?'
                        value={itemHeadline}
                        onChange={(event) => setItemHeadline(event.target.value)}
                        fullWidth                       
                    />
                <Typography align='left' >
                    Upload an image here:
                    {previewImage &&
                        <img src={previewImage} style={{ width: '300px', height: '225px' }} />
                    }
                </Typography>
                <TextField
                    required
                    onChange={e => offerImageUpload(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    variant='outlined'
                    sx={{ mx: '1rem', width: '90%'}}
                />
                </Stack>
                <Box display='flex' justifyContent='center' sx={{mt: 5}}>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={() => handleOfferFormPage2({ itemHeadline })}>Next</Button>
                </Box>               
        </>
    )
}

export default OfferFormPage1;