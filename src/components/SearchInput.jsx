import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

    const [inputSearch, setInputSearch] = useState('');
    const navigate = useNavigate();

    const handleOnChangeInput = (e)=> {
        e.preventDefault();

        setInputSearch({
            [e.target.name]: e.target.value
        })
    }

    const handleInputSubmit = (e)=> {
        e.preventDefault();
        navigate(`/search/${inputSearch.inputSearch}`)
    }

    return (
        <Paper
            component="form"
            onSubmit={handleInputSubmit}
            sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: {xs: '250px', md: '400px'}, 
                margin: '10px 0px 0px 0px'
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search in Wikipedia"
                inputProps={{ 'aria-label': 'Search in Wikipedia' }}
                name="inputSearch"
                onChange={handleOnChangeInput}
            />
            <IconButton 
                type="submit" 
                sx={{ p: '10px'}} 
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchInput
