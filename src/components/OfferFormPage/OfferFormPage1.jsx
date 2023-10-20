import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function OfferFormPage1(){

    const dispatch = useDispatch();
    const history = useHistory();

    const [offerImage, setOfferImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [itemHeadline, setItemHeadline] = useState('')

    const handleOfferFormPage2 = () => {
        console.log('itemHeadline:', itemHeadline)
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

    return(
        <>
        <div text align="center">
            <h1 onClick={filloutOffer}>What do you have to offer?</h1>
        </div>
        <form className='formPanel'>
            <div>
                <label htmlFor='itemHeadline'>
                    Headline 
                    <TextField
                    type='text'
                    placeholder='What item are you sharing?'
                    value={itemHeadline}
                    onChange={(event)=> setItemHeadline(event.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    />
                </label>
            
                <div>
                <h6>Upload an Image here:</h6>
                {previewImage &&
                <img src={previewImage}/>
                }
            </div>
                <TextField
                            onChange={e => offerImageUpload(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            variant='filled'

                        />
            </div>
        <div>

        <Button 
        id="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
        onClick={() => handleOfferFormPage2({itemHeadline})}>Next</Button>

        </div>
        </form>
        </>
    )
}

export default OfferFormPage1;