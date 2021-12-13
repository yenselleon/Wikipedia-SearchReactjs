import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import CardArticle from '../components/CardArticle'
import { useDispatch, useSelector } from 'react-redux';
import { startGetDataEventOfTheDay } from '../actions/ui';
import { useParams } from 'react-router-dom';

import { Stack } from '@mui/material';
import notImage from '../images/not_image.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";



const EventsOfTheDayPerYearScreen = () => {

    const [articles, setArticles] = useState([])

    const {eventOfTheDayPerYear} = useSelector(state => state.ui)
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
    }, [])

    useEffect(() => {
        if(eventOfTheDayPerYear.length > 0){
            filterData()
        }
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
                maxWidth: {xs: 'xs', md: 'md', lg: 'lg'}, 
                marginTop: '0px',
                /* border:'1px solid red', */
                background: '#EAEEF3'
            }}
        >
            <Stack
                justifyContent="center"
                direction="row"
                marginBottom="30px"
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
                    : <h1>Cargando</h1>
                }

            </Stack>


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
                        <h1>notData</h1>
                }
            </Stack>
        </Container>
    )
}

export default EventsOfTheDayPerYearScreen
