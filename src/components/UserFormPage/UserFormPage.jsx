
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import WebcamPage from '../WebcamPage/WebcamPage'
// material ui imports
import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function UserFormPage({ setIsNavVisible }) {

    useEffect(() => {
        setIsNavVisible(false);

        return () => {
            setIsNavVisible(true);
        };
    }, []);

    const history = useHistory();
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);
    const allergy = useSelector((store) => store.allergy);
    const restriction = useSelector((store) => store.restriction);
    // State variables to store selected values for allergies and dietary restrictions
    const [name, setName] = useState('');
    const [profImage, setProfImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [userBio, setUserBio] = useState('');
    const [selectedAllergy, setSelectedAllergy] = useState([]);
    const [selectedDietaryRestriction, setSelectedDietaryRestriction] = useState([])
    const [acceptsHomemade, setAcceptsHomemade] = useState(true);

    useEffect(() => {
        getAllergyList();
    }, [])

    useEffect(() => {
        getRestrictionList();
    }, [])

    const successAlert = () => {
        return (
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
            </Alert>
        )
    }

    const getAllergyList = () => {
        dispatch({ type: 'FETCH_ALLERGY' })
    }

    const getRestrictionList = () => {
        dispatch({ type: 'FETCH_RESTRICTION' })
    }

    const newProfileHandleSubmit = (event) => {
        event.preventDefault();
        console.log("in newProfileHandleSubmit")

        let newProfile = {
            name: name,
            homemade_pref: acceptsHomemade,
            about: userBio,
            imgpath: profImage,
            allergy_type: selectedAllergy,
            restriction_type: selectedDietaryRestriction
        }

        dispatch({
            type: 'ADD_USER_PROFILE', payload: newProfile,
        })
        successAlert();
        history.push('/profile')
    }

    //funtion that will handle homemade pref selection
    const homemadePrefChange = (event) => {
        event.preventDefault();
        setAcceptsHomemade(event.target.value);
    }

    const handleBackButton = () => {
        history.push(`/howitworks`)

    }
    
    const profImageUpload = (image) => {
        setProfImage(image);
        setPreviewImage(URL.createObjectURL(image));
    }

    // prefill text for Ryan registration  during presentation
    const fillProfile = () => {
        setName('Ryan')
        setUserBio('Hey everyone, my wife Sonia and I just moved here to SugarLand Apartments. We enjoy gardening, the outdoors, and are big Twins fans.')
    }

    return (
        <>
        <div text align="center">
            <h1 onClick={fillProfile}>Tell us about yourself</h1>
        </div>
            <form className='formPanel' onSubmit={newProfileHandleSubmit}>
                <div>
                    <label htmlFor='name'>
                        Name
                        <TextField
                            type="text"
                            placeholder='Your name here'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                {/* webcam page to take and display picture for your profile */}
                {/* <WebcamPage
                // imageGallery={imageGallery}
                // fetchImages={fetchImages}
                /> */}

                <div>
                    <label htmlFor='image'>
                        Choose an image or photo of yourself:
                        {previewImage &&
                            <img src={previewImage} />
                        }
                        {/* lets user upload an image from their device */}
                        <TextField
                            onChange={e => profImageUpload(e.target.files[0])}
                            type="file"
                            placeholder='Upload URL here'
                            sx={{ mb: 2 }}
                            accept="image/*"
                            variant='filled'
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
                            placeholder='What do you want your neighbors to know about you?'
                            value={userBio}
                            onChange={(event) => setUserBio(event.target.value)}
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
                            value={selectedAllergy}
                            onChange={(event) => setSelectedAllergy(event.target.value)}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                            sx={{ mb: 2 }}
                        >
                            {allergy.map((option1, i) =>
                                <MenuItem key={i} value={option1.id}
                                >
                                    {option1.allergy_type}
                                </MenuItem>
                            )}
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
                            value={selectedDietaryRestriction}
                            onChange={(event) => setSelectedDietaryRestriction(event.target.value)}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                            sx={{ mb: 2 }}
                        >
                            {restriction.map((option2, i) =>
                                <MenuItem key={i} value={option2.id}>{option2.restriction_type}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Accept Homemade Items:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={acceptsHomemade}
                            onChange={homemadePrefChange}
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
                    <Button variant='contained' type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </>
    );
}

export default UserFormPage;
