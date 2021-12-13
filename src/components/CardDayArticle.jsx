import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CardDayArticle = () => {
    return (
    <Card sx={{maxWidth: '250px'}}>
      <CardMedia
        component="img"
        height="150"
        image="https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/Iguana.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          Lizard
        </Typography>
      </CardContent>
    </Card>
    )
}

export default CardDayArticle;
