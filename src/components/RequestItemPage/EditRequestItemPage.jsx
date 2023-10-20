import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
import { useState } from "react";
// material ui imports
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2";
import {TextField} from "@mui/material";
import {Checkbox} from "@mui/material";
import {FormControl} from "@mui/material";
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import {OutlinedInput} from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

function EditRequestItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const updateRequest = useSelector((store) => store.updateActivity)

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
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
    // const handleImageChange = (e) => {
    //     dispatch({
    //         type: 'EDIT_ACTIVITY_ONCHANGE',
    //         payload: { property: 'imgpath', value: e.target.value }
    //     });
    // }
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

    return (
        <Box >
            <Item>
        <header>
        </header>
        
                <label htmlFor='itemHeadline'>
                    Headline 
                    <TextField
                    type='text'
                    placeholder='What item are you sharing?'
                    value={updateRequest.item_name}
                    onChange={(event)=> handleHeadlineChange(event)}
                    sx={{ width: '100%' }}
                    />
                </label>
                {/* <div>
                <h6>Upload an Image here:</h6>
                <TextField
                            onChange={e => handleImageChange(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            variant='filled'

                        /> */}
                <div>
                    <label htmlFor="itemDescription">
                        Description
                        <TextField

                            type='text'
                            placeholder="Provide some details about the item you'd like to share. 
                            You can add information about quantity, date of purchase, reason for sharing, etc."
                            value={updateRequest.description}
                            onChange={(event) => handleDescriptionChange(event)}
                            sx={{ width: '100%' }}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="categoryDropdown">
                        Item Category
                        <FormControl fullWidth={true}>
                            <Select
                                id="itemCategory"
                                value={updateRequest.category_id}
                                onChange={(event) => handleCategoryChange(event)}
                                input={<OutlinedInput label="Select from categories:" />}
                            >
                                <MenuItem value="produce">Produce</MenuItem>
                                <MenuItem value="meatSeafood">Fresh Meat & Seafood</MenuItem>
                                <MenuItem value="dairyEggs">Dairy & Eggs</MenuItem>
                                <MenuItem value="frozenFoods">Frozen Foods</MenuItem>
                                <MenuItem value="prepFood">Prepared Food</MenuItem>
                                <MenuItem value="dryGoods">Dry Goods</MenuItem>
                                <MenuItem value="nonPerishables">Non-perishables</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </label>
                </div>
                <div>
                    <label htmlFor="calendar">
                        Claim by
                        <MobileDateTimePicker
                            value={dayjs(updateRequest.claim_by)}
                            onChange={(date) => handleUpdateClaimBy(date)} />
                    </label>
                </div>

                <div>
                    <Button type="submit" variant="contained" onClick={() => handleSaveUpdate()}>
                        Save Changes
                    </Button>
                </div>
            {/* </div> */}
            </Item>
    </Box>
    )
}

export default EditRequestItemPage;