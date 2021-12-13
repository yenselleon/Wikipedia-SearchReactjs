import { CardActions, IconButton } from '@mui/material';
import React, { useState } from 'react'


import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import not_image from '../images/not_image.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookmark, startSaveBookmark, startSaveLastView } from '../actions/setLocalStorageData';

const CardArticle = ({data}) => {

    const dispatch = useDispatch()

    const {bookmarks} = useSelector(state => state.localStoragedata)

    const handleSendToWikipidiaArticle = ()=> {
        dispatch(startSaveLastView(data))
        window.open(data.linkToWikipedia,'_blank');
    }

    const handleSaveBookmark = (e)=> {
        e.stopPropagation();
        const findArticle = bookmarks.find(article=> (
            article.pageId === data.pageId
        )) 

        if (findArticle) {

            dispatch(deleteBookmark(data))
        }else{

            dispatch(startSaveBookmark(data))

        }
        
        
    }

    return (
        <Card 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 345,
                marginX: '10px',
                marginY: '10px',
                position: 'relative',
                zIndex: '1',
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                    cursor: 'pointer'
                }
            }} 
            variant="elevation"
            onClick={handleSendToWikipidiaArticle}
        >
            <CardMedia
                component="img"
                height="194"
                image={data?.imageSource ? data.imageSource : not_image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h7" color="Highlight" 
                    
                >
                    {data.title}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                        marginTop:"10px"
                    }} 
                >
                    {data.description}
                </Typography>
            </CardContent>
            <CardActions 
                disableSpacing
                sx={{
                    marginTop: 'auto',
                    zIndex: '99999'
                }}
                
            >
                <IconButton 
                    onClick={handleSaveBookmark}
                    aria-label="add to favorites"
                >
                    {
                       (bookmarks.find(article=> (
                           article.pageId === data.pageId
                       )) ) ?
                            <BookmarkIcon />
                       :
                            <BookmarkBorderIcon/>
                    }
                </IconButton>
            </CardActions>
    </Card>
    )
}

export default CardArticle;
