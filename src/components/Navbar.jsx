import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import { useNavigate, useLocation } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Divider from '@mui/material/Divider';

const Navbar = () => {

    const {pathname} = useLocation()

    const [isOpen, setIsOpen] = useState(false);

    
    const navigate = useNavigate();

    const toggleDrawer = (boolean)=> {
        setIsOpen(boolean)
    }

    const handleNavigateTo = (page)=> {
        navigate(page === 'home' ? `/` : `/bookmarks`)
        setIsOpen(false);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            {/* drawer section */}
            <SwipeableDrawer
                anchor='left'
                open={isOpen}
                onClose={()=> toggleDrawer(false)}
                onOpen={()=> toggleDrawer(true)}
                sx={{
                    zIndex: '99999'
                }}
            >
                <Box
                    sx={{
                        width: "250px"
                    }}
                >
                    <List>
                        <ListItemButton
                            sx={{
                                backgroundColor: ()=> (
                                    (pathname === '/')
                                        ?
                                            'rgba(0, 0, 0, 0.04)'
                                        :
                                            'none'
                                )
                            }}
                            onClick={()=> handleNavigateTo('home')}
                        >
                            <ListItemIcon 
                            >
                                <HomeIcon
                                    sx={{color: '#FF9100'}}
                                />
                            </ListItemIcon >
                            <ListItemText>
                                Home
                            </ListItemText>
                        </ListItemButton>

                        <Divider/>

                        <ListItemButton
                            
                            sx={{
                                backgroundColor: ()=> (
                                    (pathname === '/bookmarks')
                                        ?
                                            'rgba(0, 0, 0, 0.04)'
                                        :
                                            'none'
                                )
                            }}
                            onClick={()=> handleNavigateTo('bookmarks')}
                        >
                            <ListItemIcon 
                            >
                                <BookmarkIcon
                                    sx={{color: '#FF9100'}}
                                />
                            </ListItemIcon >
                            <ListItemText>
                                Bookmarks
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Box>
            </SwipeableDrawer>

            {/* navbar section */}
            <AppBar 
                position="fixed"
                sx={{
                    background: 'white',
                    zIndex: '9999'
                }}
            >
                <Toolbar sx={{display: 'flex'}}>
                <IconButton
                    size="large"
                    edge="start"
                    
                    aria-label="menu"
                    sx={{ mr: 2, color: '#FF9100'}}
                    onClick={()=> toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                
                <Typography 
                    variant="h6" 
                    component="div"
                    color="GrayText"
                    textAlign="center"
                    margin='auto'
                >
                    Wikipedia
                </Typography>
                </Toolbar>
                
                
            </AppBar>
      </Box>
    )
}

export default Navbar
