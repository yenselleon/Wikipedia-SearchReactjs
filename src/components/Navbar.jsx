import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Divider from '@mui/material/Divider';

const Navbar = () => {

    const [inputSearch, setInputSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleDrawer = (boolean)=> {
        setIsOpen(boolean)
    }

    const handleNavigateTo = (page)=> {
        navigate(page === 'home' ? `/` : `/bookmarks`)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            {/* drawer section */}
            <SwipeableDrawer
                anchor='left'
                open={isOpen}
                onClose={()=> toggleDrawer(false)}
                onOpen={()=> toggleDrawer(true)}
            >
                <Box
                    sx={{
                        width: "250px"
                    }}
                >
                    <List>
                        <ListItemButton
                            /* sx={{
                                '&:hover':{
                                    opacity: [0.9, 0.8, 0.7],
                                    cursor: 'pointer'
                                }
                            }} */
                            onClick={()=> handleNavigateTo('home')}
                        >
                            <ListItemIcon 
                            >
                                <HomeIcon/>
                            </ListItemIcon >
                            <ListItemText>
                                Home
                            </ListItemText>
                        </ListItemButton>

                        <Divider/>

                        <ListItemButton
                            /* sx={{
                                '&:hover':{
                                    opacity: [0.9, 0.8, 0.7],
                                    cursor: 'pointer'
                                }
                            }} */
                            onClick={()=> handleNavigateTo('bookmarks')}
                        >
                            <ListItemIcon 
                            >
                                <BookmarkIcon/>
                            </ListItemIcon >
                            <ListItemText>
                                Bookmarks
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Box>
            </SwipeableDrawer>

            {/* navbar section */}
            <AppBar position="static" >
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={()=> toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" >
                    Wikipedia
                </Typography>
                <Paper
                    component="form"
                    onSubmit={handleInputSubmit}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 'auto'}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search in Wikipedia"
                        inputProps={{ 'aria-label': 'Search in Wikipedia' }}
                        name="inputSearch"
                        onChange={handleOnChangeInput}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
      </Box>
    )
}

export default Navbar
