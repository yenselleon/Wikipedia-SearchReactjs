import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDatacategory } from '../actions/ui'

const CardCategory = ({data}) => {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const handleNavigateToCategoryScreen =()=> {
        navigate(`/category/${data.category}`);
    }


    return (
    <Card 
        sx={{
            width: '260px',
            cursor: 'pointer',
            height: '240px'
        }}
        onClick={handleNavigateToCategoryScreen}
    >
      <CardMedia
        component="img"
        height="180px"
        image={data.imageCategory}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          {data.category}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default CardCategory;
