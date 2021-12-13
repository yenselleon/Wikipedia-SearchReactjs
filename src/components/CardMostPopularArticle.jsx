import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import not_image from '../images/not_image.jpg';
import {deleteBookmark, startSaveBookmark, startSaveLastView} from '../actions/setLocalStorageData';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const CardMostPopularArticle = ({data}) => {

  const {bookmarks} = useSelector(state => state.localStoragedata)

  const dataArticle = {
    description: data.description,
    title: data.title,
    imageSource: data.imageSource,
    linkToWikipedia: `https://en.wikipedia.org/w/index.php?curid=${data.pageId}`,
    pageId: data.pageId,
  }

  const dispatch = useDispatch()
  
  const handleNavigateToWikipidia = ()=> {
    dispatch(startSaveLastView(dataArticle));

    window.open(`https://en.wikipedia.org/w/index.php?curid=${data.pageId}`,'_blank')
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
      sx={
        { width: '270px', 
          height: '300px',
          cursor: 'pointer'
        }
      }
      onClick={handleNavigateToWikipidia}
    >
      <CardMedia
        component="img"
        height="200px"
        image={data?.imageSource ? data.imageSource : not_image}
        alt="green iguana"
        sx={{
          objectFit: "cover",
          objectPosition: "top"
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          {data.title}
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

export default CardMostPopularArticle;
