import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, {  } from 'react'
import { useNavigate } from 'react-router-dom'

const CardCategory = ({data}) => {

    const navigate = useNavigate();
    

    const handleNavigateToCategoryScreen =()=> {
        navigate(`/category/${data.category}`);
    }


    return (
    <Card 
        sx={{
            width: '260px',
            cursor: 'pointer',
            height: '240px',
            
        }}
        onClick={handleNavigateToCategoryScreen}
    >
      <CardMedia
        component="img"
        height="180px"
        image={data.imageCategory}
        alt=""
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px'
        }}
      >
        <Typography 
          gutterBottom 
          component="div"
          sx={{
            textAlign: 'center',
            fontFamily: 'var(--poppins)',
          }}
        >
          {data.category}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default CardCategory;
