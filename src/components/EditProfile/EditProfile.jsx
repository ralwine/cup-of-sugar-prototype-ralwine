import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Material UI imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditProfile() {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const dispatch = useDispatch();
    const editProfile = useSelector((store) => store.editProfile);
    const profile = useSelector((store) => store.profile);
    const allergy = useSelector((store) => store.allergy);
    const restriction = useSelector((store) => store.restriction);
    const [selectedAllergy, setSelectedAllergy] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROFILE' })
    }, []);

    useEffect(() => {
        getAllergyList();
    }, [])

    useEffect(() => {
        getRestrictionList();
    }, [])

    const getAllergyList = () => {
        dispatch({ type: 'FETCH_ALLERGY' })
    }

    const getRestrictionList = () => {
        dispatch({ type: 'FETCH_RESTRICTION' })
    }

    const submitEditProfile = () => {
        dispatch({ type: 'UPDATE_PROFILE', payload: editProfile })

    }

    const handleNameChange = (event) => {
        event.preventDefault();
        dispatch({
            type: 'PROFILE_EDIT_ONCHANGE',
            payload: { property: 'name', value: event.target.value }
        });
    }

    const handleAboutChange = (event) => {
        dispatch({
            type: 'PROFILE_EDIT_ONCHANGE',
            payload: { property: 'about', value: event.target.value }
        });
    }

    const handleHomemadeChange = (event) => {
        dispatch({
            type: 'PROFILE_EDIT_ONCHANGE',
            payload: { property: 'homemade_pref', value: event.target.value }
        });
    }

    const handleAllergyChange = (event) => {
        dispatch({
            type: 'PROFILE_EDIT_ONCHANGE',
            payload: { property: 'allergy_type', value: event.target.value }
        });
    }
    const handleRestrictionChange = (event) => {
        dispatch({
            type: 'PROFILE_EDIT_ONCHANGE',
            payload: { property: 'restriction_type', value: event.target.value }
        });
    }

    const handleBackButton = () => {
        history.push(`/profile`)

    }

    return (
        <>
            <form className='formPanel' onSubmit={submitEditProfile}>
                <div>
                    <label htmlFor='name'>
                        Name
                        <TextField
                            type="text"
                            placeholder={profile[0]?.name}
                            value={editProfile.name}
                            onChange={(event) => handleNameChange(event, 'name')}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="about">
                        Tell us a little about yourself:
                        <TextField
                            id="about"
                            type='text'
                            multiline rows={4}
                            placeholder={profile[0]?.about}
                            value={editProfile.about}
                            onChange={(event) => handleAboutChange(event, 'about')}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="allergy">Please select allergies:</InputLabel>
                        {/* Allergy Drop Down menu */}
                        <Select
                            id="allergies"
                            multiple
                            // value={editProfile}
                            onChange={(event) => handleAllergyChange(event, 'allergy_type')}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                            sx={{ mb: 2 }}
                        >
                            {/* {allergy.map((option1) =>
                                <MenuItem key={option1.id} value={option1.id}
                                >
                                    {option1.allergy_type}
                                </MenuItem>
                            )} */}
                            {/* Add more allergy options as needed */}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="dietaryRestriction">Please select dietary restrictions:</InputLabel>
                        {/* Dietary Restriction Drop Down menu */}
                        <Select
                            id="dietaryRestriction"
                            multiple
                            // value={editProfile}
                            onChange={(event) => handleRestrictionChange(event, 'restriction_type')}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                            sx={{ mb: 2 }}
                        >
                            {/* {restriction.map((option2, i) =>
                                <MenuItem key={i} value={option2.id}>{option2.restriction_type}</MenuItem>
                            )} */}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Accept Homemade Items:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={editProfile.homemade_pref}
                            onChange={(event) => handleHomemadeChange(event, 'homemade_pref')}
                            sx={{ mb: 2 }}
                        >
                            <FormControlLabel value='true' control={<Radio />} label="Yes" />
                            <FormControlLabel value='false' control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {/* <
                            checked={acceptsHomemade}
                            onChange={(event) => setAcceptsHomemade(event.target.value)}
                        /> */}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={() => handleBackButton()} variant="contained">Back</Button>
                    <Button id="submit" variant="contained" onClick={() => submitEditProfile()}>Save</Button>
                </div>
            </form>
        </>
    );

}

export default EditProfile;
