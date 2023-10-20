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


import Button from '@mui/material/Button';

function OfferFormPage2() {
    const itemName = useSelector((store) => store.offers.itemHeadline)
    const imgpath = useSelector((store) => store.offers.offerImage)
    const category = useSelector((store) => store.category)
    // console.log('itemName:', itemName)

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

    console.log('testing category get', category)
    return (
        <>
            <form onSubmit={handleSubmitOffer} className='formPanel'>
                <div>
                    <label htmlFor="itemDescription">
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
                    </label>
                </div>
                <div>
                    <label>
                        Perishable
                        <Checkbox
                            checked={persihableItem}
                            onChange={(event) => setPerishableItem(event.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </label>
                    <label>
                        Homemade Item
                        <Checkbox
                            checked={homemadeItem}
                            onChange={(event) => setHomemadeItem(event.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="categoryDropdown">
                        Item Category
                        <FormControl fullWidth={true}>
                            <Select
                                id="itemCategory"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                input={<OutlinedInput label="Select from categories:" />}
                                sx={{ mb: 2 }}
                            >
                                {category.map((option1) =>
                            <MenuItem key= {option1.id} value={option1.id} onChange={(event) => setSelectedCategory(event.target.value)}>{option1.category_type}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </label>
                </div>
                <div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label htmlFor="calendar">
                            Best if used by
                            <MobileDatePicker
                                value={bestByDate}
                                onChange={handleBestByDate}
                                sx={{ mb: 2 }}
                            />
                        </label>
                    </LocalizationProvider>
                </div>
                <div >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label htmlFor="calendar">
                            Claim by
                            <DateTimeField
                                label='Date & Time'
                                value={offerExpiresDate}
                                onChange={handleOfferExpiresDate}
                                sx={{ mb: 2 }}
                            />
                        </label>
                    </LocalizationProvider>

                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button id="submit" onClick={() => handleBackButton()} variant="contained">Back</Button>
                    <Button type="submit" variant="contained">
                        Submit Offer
                    </Button>
                </div>
            </form>
        </>
    )
}

export default OfferFormPage2;