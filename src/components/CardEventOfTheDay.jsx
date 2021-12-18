import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import not_image from '../images/not_image.jpg';
import {useNavigate} from 'react-router-dom'

const CardEventOfTheDay = ({data}) => {
    
    const navigate = useNavigate()

    const handlePushParamData = ()=> {
      
      navigate(`/eventOfTheDayPerYear/${data.year}`)
    }
  
    
    return (
    <Card sx={{width: '350px', height: '300px', cursor: "pointer"}} onClick={handlePushParamData}>
      <CardMedia
        component="img"
        height="150"
        image={data?.imageSource ? data.imageSource : not_image}
        alt="green iguana"
      />
      <CardContent>
        <Typography 
          gutterBottom  
          component="div" 
          textAlign="center" 
          sx={{
            fontFamily: 'var(--poppins)',
            fontWeight: '500'
          }}
        >
          Year: {data.year}
        </Typography>
        <Typography 
            gutterBottom
            variant="caption" 
            component="div" 
            textAlign="justify"
            sx={{
              width: "100%", 
              height: "80px", 
              overflow: "hidden",
              fontFamily: 'var(--poppins)',
              fontWeight: '400'
            }}
          >
          {data.description}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default CardEventOfTheDay;
