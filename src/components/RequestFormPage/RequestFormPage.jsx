// React and Redux imports 
import React from "react";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDateTimePicker } from '@mui/x-date-pickers';

function RequestFormPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const category = useSelector((store) => store.category)

    const [requestedItem, setRequestedItem] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = () => {
        dispatch({ type: 'FETCH_CATEGORY' })
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmitRequest = (event) => {
        event.preventDefault();

        let timestamp = new Date();

        let newRequest = {
            item_name: requestedItem,
            description: itemDescription,
            category_type: selectedCategory,
            requested_on: timestamp,
            expires_on: selectedDate,
        };
        // dispatch to request saga
        dispatch({
            type: 'ADD_REQUEST', payload: newRequest
        })
        // sends user to Activity Feed to confirm request post
        history.push('/activity')
    }

    // Code to generate prefilled text during presentation
    const fillOutRequest = () => {
        setRequestedItem('2 Tbsp Vanilla')
        setItemDescription(`Help! in need of some vanilla extract for a cookie recipe I'm making. Really trying to avoid running to the grocery store for what feels like the 3rd time this week. You'll be my personal hero!`)
    }

    return (
        <>
            <Typography variant="h4" align='center' >
                Make a request
            </Typography>
            <Typography variant="h5" align="center">
                I wish I had:
            </Typography>
            <form onSubmit={handleSubmitRequest} className='formPanel'>
                <div>
                    <Typography>
                        Headline
                        <TextField
                            required
                            type='text'
                            placeholder="What item do you need?"
                            value={requestedItem}
                            onChange={(event) => setRequestedItem(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
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
                        Description
                        <TextField
                            id="itemDescription"
                            type='text'
                            multiline rows={4}
                            placeholder="How much do you need? What do you need it for? Provide some details."
                            value={itemDescription}
                            onChange={(event) => setItemDescription(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Typography>
                </div>
                <div>
                    <Typography>
                        I need this by
                        <MobileDateTimePicker
                            required
                            value={selectedDate}
                            onChange={handleDateChange}
                            sx={{ mb: 2, width: '100%' }}
                        />
                    </Typography>
                </div>
                <div style={{ float: 'right' }}>
                <Button type="submit" variant="contained">
                    Request
                </Button>
                </div>
            </form>
        </>)
}

export default RequestFormPage