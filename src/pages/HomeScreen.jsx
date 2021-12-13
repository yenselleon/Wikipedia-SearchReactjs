import React, { useEffect } from 'react'
import CardDayArticle from '../components/CardDayArticle'
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from '@mui/system';
import { responsiveCarouselHomeScreen } from '../helpers/carouselHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { startGetDataEventOfTheDay, startGetDataMostPopularArticleOfMonth } from '../actions/ui';
import CardMostPopularArticle from '../components/CardMostPopularArticle';
import CardEventOfTheDay from '../components/CardEventOfTheDay';

import {jsonDataCategory} from '../helpers/categoriesJSON/categorys'
import CardCategory from '../components/CardCategory';
import CardArticle from '../components/CardArticle';


const HomeScreen = () => {

    const dispatch = useDispatch();

    const {mostPopularArticlesMonth, eventOfTheDayPerYear} = useSelector(state => state.ui)
    const {lastview} = useSelector(state => state.localStoragedata)

    const getData =()=> {
        //Obtener los articulos mas populares del mes
        dispatch(startGetDataMostPopularArticleOfMonth());
        dispatch(startGetDataEventOfTheDay());
    }

    useEffect(() => {
        getData();

    }, [])

    
    return (
        <Container
            sx={{
                maxWidth: {xs: 'xs', md: 'md', lg: 'lg'}, 
                marginTop: '10px'
            }}
        >
            <Typography 
                gutterBottom 
                variant="h5" 
                component="div"
            >
                Most Popular Articles
            </Typography>
            
            {/*Carousel proyectos del dia */}
            <Carousel
                responsive={responsiveCarouselHomeScreen}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                centerMode={true}
            >
                {
                    mostPopularArticlesMonth.length > 0 
                    ?
                        mostPopularArticlesMonth.map((data, i) => (
                            <Box px="3px" py="5px" display="flex" justifyContent="center" key={data.pageId}>
                                <CardMostPopularArticle  data={data}/>
                            </Box>
                        ))
                    :   <h1>Cargando</h1>
                }
            </Carousel>

            {/*Carousel categorias */}
            <Typography gutterBottom variant="h5" component="div">
                Categories
            </Typography>
            <Carousel
                responsive={responsiveCarouselHomeScreen}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                centerMode={true}
            >
                {
                    jsonDataCategory.categorys.map((category, i) => (
                        <Box 
                            px="3px" 
                            py="5px" 
                            display="flex" 
                            justifyContent="center" 
                            key={category.id}
                        >
                            <CardCategory  
                                data={category}
                            />
                        </Box>
                    ))
                }
            </Carousel>

            <Typography 
                gutterBottom 
                variant="h5" 
                component="div"
            >
                Events of the day per year
            </Typography>
            <Carousel
                responsive={responsiveCarouselHomeScreen}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                centerMode={true}
            >
                {
                    eventOfTheDayPerYear.length > 0 
                    ?
                    eventOfTheDayPerYear.map((data, i) => (
                            <Box px="3px" py="5px" display="flex" justifyContent="center" key={ i + 'eventOfTheDayPerYear'}>
                                <CardEventOfTheDay  data={data}/>
                            </Box>
                        ))
                    :   <h1>Cargando</h1>
                }
            </Carousel>

            {/*Carousel ultimos vistos */}
            <Typography 
                gutterBottom 
                variant="h5" 
                component="div"
            >
                last seen
            </Typography>
            <Carousel
                responsive={responsiveCarouselHomeScreen}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                
            >
                {
                    lastview.length > 0 ?
                        lastview.map(articleData=> (
                            <CardArticle data={articleData} key={articleData.pageId}/>
                        ))
                    :
                        <h1>No data...</h1>
                }
            </Carousel>


        </Container>
    )
}

export default HomeScreen;