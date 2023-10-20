import dayjs from "dayjs";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { DateFormatter } from "../../utils/DateTimeFormatter/DateTimeFormatter";
// material ui imports
import { styled } from '@mui/material/styles';
import { Paper, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';

function EditOfferItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const updateOffer = useSelector((store) => store.updateActivity)
    const category = useSelector((store) => store.category)
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = () => {
        dispatch({ type: 'FETCH_CATEGORY' })
    }

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // create an updatedClip object and dispatch it to a saga to put
    const handleHeadlineChange = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'item_name', value: e.target.value }
        });
    };
    
    const handleDescriptionChange = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'description', value: e.target.value }
        });
    };

    const handlePerishableChange = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'perishable', value: e.target.value }
        });
    }

    const handleHomemadeChange = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'homemade', value: e.target.value }
        });
    }

    const handleCategoryChange = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'category_id', value: e.target.value }
        });
    }

    const handleUpdateBestBy = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'best_by', value: DateFormatter(e.target.value) }
        });
    }

    const handleUpdateClaimBy = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'expires_on', value: e.target.value }
        });
    }

    const handleSaveUpdate = (e) => {
        dispatch({
            type: 'UPDATE_OFFER',
            payload: updateOffer
        });
        history.push('/activity')
    }

    const handleDeleteOffer = (props) => {
        let offerId = props.id;
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this offer?"
        );

        if (confirmDelete) {
            dispatch({
                type: 'DELETE_OFFER',
                payload: offerId
            });
            history.push('/activity')
        }
    }

    return (
        <Box >
            <Typography variant="h5" align='center'>Edit Offer</Typography>
            <br></br>
            <Typography sx={{ mx: '1rem'}}>Headline</Typography>
            <TextField
                type='text'
                placeholder='What item are you sharing?'
                value={updateOffer.item_name}
                onChange={(event) => handleHeadlineChange(event)}
                sx={{ mx: '1rem', width: '90%'}}
            />
            <div>
            <br></br>
                <Typography sx={{ mx: '1rem'}}>Description</Typography>
                <TextField
                    type='text'
                    multiline
                    placeholder="Provide some details about the item you'd like to share. 
                            You can add information about quantity, date of purchase, reason for sharing, etc."
                    value={updateOffer.description}
                    onChange={(event) => handleDescriptionChange(event)}
                    sx={{ mx: '1rem', width: '90%'}}
                />
            </div>
            <br></br>
            <Stack direction='row' sx={{ px: '1rem'}}>
                <Typography sx={{my: '10px'}}>Perishable</Typography>
                <Checkbox
                    checked={updateOffer.perishable}
                    onChange={(event) => handlePerishableChange(event)}
                />
                <Typography sx={{my: '10px'}}>Homemade Item</Typography>
                <Checkbox
                    checked={updateOffer.homemade}
                    onChange={(event) => handleHomemadeChange(event)}
                />
            </Stack>
            <br></br>
            <Typography sx={{ mx: '1rem'}}>Item Category</Typography>
            <FormControl fullWidth={true}>
                <Select
                    id="itemCategory"
                    value={updateOffer.category_id}
                    onChange={(event) => handleCategoryChange(event)}
                    input={<OutlinedInput label="Select from categories:" />}
                    sx={{ mx: '1rem', width: '90%'}}
                >
                    {category.map((option1) =>
                        <MenuItem key={option1.id} value={option1.id} onChange={(event) => setSelectedCategory(event.target.value)}>{option1.category_type}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <div>
            <br></br>
                <Typography sx={{ mx: '1rem'}}>Best if used by</Typography>
                <MobileDatePicker
                sx={{ mx: '1rem'}}
                    value={dayjs(updateOffer.best_by)}
                    onChange={(date) => handleUpdateBestBy(date)} />
            </div>
            <br></br>
            <div>
                <Typography sx={{ mx: '1rem'}}>Claim by</Typography>
                <MobileDateTimePicker
                sx={{ mx: '1rem'}}
                    value={dayjs(updateOffer.claim_by)}
                    onChange={(date) => handleUpdateClaimBy(date)} />
            </div>
            <br></br>
            <Stack spacing={14} direction="row" justifyContent={center}>
                <Button type="submit" variant="outlined" color="error" onClick={() => handleDeleteOffer(updateOffer)}>
                    Delete
                </Button>

                <Button type="submit" variant="contained" onClick={() => handleSaveUpdate()}>
                    Save Changes
                </Button>
            </Stack>
        </Box>
    )
}

export default EditOfferItemPage;