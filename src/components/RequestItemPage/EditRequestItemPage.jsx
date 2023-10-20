import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
// material ui imports
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import dayjs from "dayjs";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";

function EditRequestItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const updateRequest = useSelector((store) => store.updateActivity);
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

    const handleCategoryChange = (e) => {
        dispatch({
            type: 'EDIT_ACTIVITY_ONCHANGE',
            payload: { property: 'category_id', value: e.target.value }
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
            type: 'UPDATE_REQUEST',
            payload: updateRequest
        });
        history.push('/activity')
    }

    const handleDeleteRequest = (props) => {
        let requestId = props.id;
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this request?"
        );

        if (confirmDelete) {
            dispatch({
                type: 'DELETE_REQUEST',
                payload: requestId
            });
            history.push('/activity')
        }
    }

    return (
        <Box >
             <Typography variant="h5" align='center'>Edit Request</Typography>
            <br></br>
            <Typography sx={{ mx: '1rem'}}>Headline</Typography>
                    <TextField
                        type='text'
                        placeholder='What item are you sharing?'
                        value={updateRequest.item_name}
                        onChange={(event) => handleHeadlineChange(event)}
                        sx={{ mx: '1rem', width: '90%'}}
                    />
                <div>
                    <br></br>
                    <Typography sx={{ mx: '1rem'}}>Description</Typography>
                        <TextField
                            multiline
                            type='text'
                            placeholder="Provide some details about the item you'd like to share. 
                            You can add information about quantity, date of purchase, reason for sharing, etc."
                            value={updateRequest.description}
                            onChange={(event) => handleDescriptionChange(event)}
                            sx={{ mx: '1rem', width: '90%'}}
                        />
                </div>
                <div>
                <br></br>
                <Typography sx={{ mx: '1rem'}}>Item Category</Typography>
                        <FormControl fullWidth={true}>
                            <Select
                                id="itemCategory"
                                value={updateRequest.category_id}
                                onChange={(event) => handleCategoryChange(event)}
                                input={<OutlinedInput label="Select from categories:" />}
                                sx={{ mx: '1rem', width: '90%'}}
                            >
                                {category.map((option1) =>
                                    <MenuItem key={option1.id} value={option1.id} onChange={(event) => setSelectedCategory(event.target.value)}>{option1.category_type}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                </div>
                <div>
                <br></br>
                <Typography sx={{ mx: '1rem'}}>Claim by</Typography>
                        <MobileDateTimePicker
                            value={dayjs(updateRequest.claim_by)}
                            onChange={(date) => handleUpdateClaimBy(date)}
                            sx={{ mx: '1rem'}}/>
                </div>
                <br></br>
                <Stack spacing={14} direction="row" justifyContent={center}>
                <Button type="submit" variant="outlined" color="error" onClick={() => handleDeleteRequest(updateRequest)}>
                        Delete
                    </Button>
                    <Button type="submit" variant="contained" onClick={() => handleSaveUpdate()}>
                        Save Changes
                    </Button>
                </Stack>
        </Box>
    )
}

export default EditRequestItemPage;