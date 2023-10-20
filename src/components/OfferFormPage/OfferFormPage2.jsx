import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Typography } from "@mui/material";

function OfferFormPage2() {
    const itemName = useSelector((store) => store.offers.itemHeadline)
    const imgpath = useSelector((store) => store.offers.offerImage)
    const category = useSelector((store) => store.category)
    const dispatch = useDispatch();
    const history = useHistory();

    const [itemDescription, setItemDescription] = useState('')
    const [persihableItem, setPerishableItem] = useState(false)
    const [homemadeItem, setHomemadeItem] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [bestByDate, setBestByDate] = useState(null);
    const [offerExpiresDate, setOfferExpiresDate] = useState(null);

    const handleBestByDate = (date) => {
        setBestByDate(date);
    };

    const handleOfferExpiresDate = (date) => {
        setOfferExpiresDate(date);
    };

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = () => {
        dispatch({ type: 'FETCH_CATEGORY' })
    }

    const handleBackButton = () => {
        history.push(`/offerform1/${itemName}`)
    }

    const handleSubmitOffer = (event) => {
        event.preventDefault();

        let timestamp = new Date();
        let newOffer = {
            item_name: itemName,
            imgpath: imgpath,
            description: itemDescription,
            perishable: persihableItem,
            homemade: homemadeItem,
            category_type: selectedCategory,
            offered_on: timestamp,
            best_by: bestByDate,
            expires_on: offerExpiresDate
        }
        console.log('newoffer:', newOffer)
        // dispatch to offer saga
        dispatch({ type: 'ADD_OFFER', payload: newOffer })
        // navigate to activity feed
        history.push('/activity')
    }

    // prefill text for tomato offer during presentation
    const filloutOffer = () => {
        setItemDescription('The wife and I were given some fresh tomatoes as a house warming gift from my folks. They are delicious, but there is no way we can eat all of them! These tomatoes are grown pesticide free too')
        setPerishableItem(true)
    }

    return (
        <>
            <Typography variant='h4' align='center'>
                Offer Details
            </Typography>

            <form onSubmit={handleSubmitOffer} className='formPanel'>
                <div>
                    <Typography>
                        Description
                        <TextField
                            id="itemDescription"
                            type='text'
                            multiline rows={4}
                            placeholder="Provide some details about the item you'd like to share. 
                            You can add information about quantity, date of purchase, reason for sharing, etc."
                            value={itemDescription}
                            onChange={(event) => setItemDescription(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Typography>
                </div>
                <div>
                    <Typography >
                        Perishable
                        <Checkbox
                            checked={persihableItem}
                            onChange={(event) => setPerishableItem(event.target.checked)}
                        />
                    </Typography>
                    <Typography >
                        Homemade Item
                        <Checkbox
                            checked={homemadeItem}
                            onChange={(event) => setHomemadeItem(event.target.checked)}
                        />
                    </Typography>
                </div>
                <div>
                    <Typography>
                        Item Category
                        <FormControl fullWidth={true}>
                            <Select
                                required
                                id="itemCategory"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                input={<OutlinedInput label="Select from categories:" />}
                                sx={{ mb: 2 }}
                            >
                                {category.map((option1) =>
                                    <MenuItem key={option1.id} value={option1.id} onChange={(event) => setSelectedCategory(event.target.value)}>{option1.category_type}</MenuItem>
                                )}

                            </Select>
                        </FormControl>
                    </Typography>
                </div>
                <div>


                    <Typography>
                        Best if used by
                        <MobileDatePicker
                            required
                            value={bestByDate}
                            onChange={handleBestByDate}
                            sx={{ mb: 2, width: '100%' }}
                        />
                    </Typography>

                </div>
                <Typography>
                    <label htmlFor="calendar">
                        Claim by

                        <MobileDateTimePicker
                            required
                            value={offerExpiresDate}
                            onChange={handleOfferExpiresDate}
                            sx={{ mb: 2, width: '100%' }} />

                    </label>
                </Typography>

                <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    sx={{ mt: 2 }}>
                    <Button type="submit" onClick={() => handleBackButton()} variant="contained">Back</Button>
                    <Button type="submit" variant="contained">
                        Submit Offer
                    </Button>
                </div>
            </form>
        </>
    )
}

export default OfferFormPage2;