import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function OfferFormPage1(){

    const dispatch = useDispatch();
    const history = useHistory();

    const [offerImage, setOfferImage] = useState('');
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

    return(
        <>
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
            </div>
                <TextField
                            onChange={e => setOfferImage(e.target.files[0])}
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