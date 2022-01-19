import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import CardArticle from '../components/CardArticle'
import { useDispatch, useSelector } from 'react-redux';
import { startGetDataEventOfTheDay } from '../actions/getData';
import { useParams } from 'react-router-dom';

import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import notImage from '../images/not_image.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import SearchInput from '../components/SearchInput';


const EventsOfTheDayPerYearScreen = () => {

    const [articles, setArticles] = useState([])

    const {eventOfTheDayPerYear} = useSelector(state => state.getData)
    const dispatch = useDispatch()
    
    const {year} = useParams();


    const getData = ()=> {

        dispatch(startGetDataEventOfTheDay());
    }

    const filterData = ()=> {
        
        const filterArticlesPerYearOfDataResponse = eventOfTheDayPerYear.filter( data => data.year === String(year)).map((data)=> data.articles);
        const flatArrayResponse = filterArticlesPerYearOfDataResponse.flat(2)
        setArticles(flatArrayResponse)

        
    }

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(eventOfTheDayPerYear.length > 0){
            filterData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventOfTheDayPerYear])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "linear"
    };

    return (
        <Container
            sx={{
                paddingBottom: "30px",
                maxWidth: {xs: 'xs', md: 'md', lg: 'lg'}, 
                marginTop: '0px',
                /* border:'1px solid red', */
                background: '#EAEEF3'
            }}
        >

            {/* header Section */}
            <Box 
                px="3px" 
                py="5px" 
                display="flex" 
                justifyContent="center"
                alignItems="start"
                sx={{
                    background: '#20232B',
                    height: '330px',
                    width: '100%',
                    marginBottom: '100px',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        marginTop: '20px'
                    }}
                >
                    <SearchInput/>
                    <Typography 
                        gutterBottom 
                        
                        component="div"
                        sx={{
                            textAlign: 'center',
                            color: '#FF9100',
                            marginTop: '10px',
                            fontFamily: 'var(--barlow)',
                            fontSize: {sx: '1.2rem', md: '1.3rem'}
                        }}
                    >
                        Search everything you want on Wikipedia
                    </Typography>
                    <Typography 
                        gutterBottom 
                        variant="overline" 
                        component="div"
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                            marginTop: '5px',
                            fontFamily: 'var(--poppins)',
                            fontW: '400'
                        }}
                    >
                        Designed By Yensel Leon
                    </Typography>
                </Box>

                {/* Slider Images */}
                <Card
                    raised={true}
                    direction="row"
                    sx={{
                        position: 'absolute',
                        bottom: '-80px',
                        zIndex: '9',
                        width: {xs: '250px' , md: '450px'},
                        height: '250px',
                        borderRadius: '10px',
                        background: '#FFFF',
                        display: 'flex',
                        justifyContent: "center"
                    }}
                >
                    {
                        articles.length > 0
                        ?
                            <Slider {...settings} className="carouselWrapper">
                                {
                                    articles.map(( articles, i) => (
                                        articles.hasOwnProperty('pageId') &&
                                            <img src={ articles?.imageSource ? articles.imageSource : notImage} alt="not_image" key={i} className="imageCarousel"/>
                                    ))
                                
                                }
                            </Slider>
                        : 
                            <Skeleton  
                                variant="rectangular" 
                                sx={{
                                    width: '100%',
                                    height: '250px'
                                }} 
                            />
                    }

                </Card>
            </Box>

            <Typography 
                gutterBottom 
                component="div"
                sx={{
                    textAlign: 'center',
                    marginTop: '10px',
                    fontFamily: 'var(--barlow)',
                    fontSize: {sx: '1.2rem', md: '1.3rem'}
                }}
            >
                Relevants Events Of The Year: {year}
            </Typography>

            {/* seccion de articulos */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                alignItems={{xs: 'center', md: 'normal'}}
                sx={{
                    flexWrap: 'wrap',
                    /* border:'1px solid red' */
                }}
            >
                {
                    articles.length > 0 ?
                        articles.map((data)=> (

                            (data.hasOwnProperty('pageId')) &&
                                <CardArticle data={data} key={data.pageId}/>
                            
                        ))
                    :
                        <Skeleton  
                            variant="rectangular" 
                            sx={{
                                width: '100%',
                                height: '350px'
                            }} 
                        />
                }
            </Stack>
        </Container>
    )
}

export default EventsOfTheDayPerYearScreen
