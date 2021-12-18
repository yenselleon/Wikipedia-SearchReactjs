import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import {  Skeleton, Typography } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from '@mui/system';
import { responsiveCarouselHomeScreen } from '../helpers/carouselHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { startGetDataEventOfTheDay, startGetDataMostPopularArticleOfMonth } from '../actions/getData';
import CardMostPopularArticle from '../components/CardMostPopularArticle';
import CardEventOfTheDay from '../components/CardEventOfTheDay';
import Divider from '@mui/material/Divider';

import {jsonDataCategory} from '../helpers/categoriesJSON/categorys'
import CardCategory from '../components/CardCategory';
import CardArticle from '../components/CardArticle';
import SearchInput from '../components/SearchInput';

import svgLogoWikipedia from '../images/wikipediaLogo.svg'


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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <Container
            sx={{
                maxWidth: {xs: 'xs', md: 'md', lg: 'lg'}, 
                marginTop: '10px',
                
            }}
        >
            {/* Header Section */}

            <Box 
                px="3px" 
                py="5px" 
                display="flex" 
                justifyContent="center"
                alignItems="center"
                sx={{
                    background: '#3F51B5',
                    height: '300px',
                    width: '100%',
                    marginBottom: '20px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img src={svgLogoWikipedia} alt="wikipedia logo"/>
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
            </Box>

            {/* Content Section */}
            <Typography 
                gutterBottom 
                
                component="div"
                sx={{
                    fontFamily: 'var(--barlow)',
                    fontSize: '1.2rem'
                }}
            >
                Most Popular Articles
            </Typography>
            
            {/*Carousel proyectos del dia */}
            <Carousel
                responsive={responsiveCarouselHomeScreen}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                centerMode={true}
                containerClass="container_carousel_wrapper"
            >
                {
                    mostPopularArticlesMonth.length > 0 
                    ?
                       ( mostPopularArticlesMonth.map((data, i) => (
                            <Box px="3px" py="5px" display="flex" justifyContent="center" key={data.pageId}>
                                <CardMostPopularArticle  data={data}/>
                            </Box>
                        )))
                    :   (
                        <Skeleton  
                            variant="rectangular" 
                            sx={{
                                width: '1500px',
                                height: '150px'
                            }} 
                        />
                    )
                }
            </Carousel>

            <Divider
                sx={{
                    margin: '20px 0px'
                }}
            />

            {/*Carousel categorias */}
            <Typography 
                gutterBottom 
                
                component="div"
                sx={{
                    fontFamily: 'var(--barlow)',
                    fontSize: '1.2rem'
                }}
            >
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

            <Divider
                sx={{
                    margin: '20px 0px'
                }}
            />

            <Typography 
                gutterBottom 
                
                component="div"
                sx={{
                    fontFamily: 'var(--barlow)',
                    fontSize: '1.2rem'
                }}
            >
                Most Relevants Events of the day by year
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
                    :   <Skeleton  
                            variant="rectangular" 
                            sx={{
                                width: '1500px',
                                height: '150px'
                            }} 
                        />
                }
            </Carousel>

            <Divider
                sx={{
                    margin: '20px 0px'
                }}
            />

            {/*Carousel ultimos vistos */}
            <Typography 
                gutterBottom 
                
                component="div"
                sx={{
                    fontFamily: 'var(--barlow)',
                    fontSize: '1.2rem'
                }}
            >
                Last Seen
            </Typography>
            <Carousel
                responsive={responsiveCarouselHomeScreen}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                
            >
                {
                    lastview.length > 0 &&
                        lastview.map(articleData=> (
                            <CardArticle data={articleData} key={articleData.pageId}/>
                        ))
                }
            </Carousel>
                {
                    lastview.length === 0 &&
                        <Box
                            sx={{
                                width: '100%',
                                height: '200px',
                                background: '#EAEEF3',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Typography 
                                gutterBottom 
                                
                                component="div"
                                sx={{
                                    fontFamily: 'var(--barlow)',
                                    fontSize: '1.2rem'
                                }}
                            >
                                You have not seen any article yet
                            </Typography>
                        </Box>
                        
                }


        </Container>
    )
}

export default HomeScreen;