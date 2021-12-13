import axios from 'axios'
import types from '../types/types'
import getFullDate from '../helpers/getDayAndMoth'

const {year, month, day} = getFullDate();

const urlArticleOfTheMonth = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month - 1}/all-days`
const urlWikipediaApi = `https://en.wikipedia.org/w/api.php?`;
const urlEventOfTheDay = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;

const params = {
    origin: '*',
    format: "json",
    action: "query",
    gsrsearch: '',
    prop: 'extracts|pageimages|pageterms',
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 20,
    pageimages: true,
    piprop: 'thumbnail',
    pithumbsize: 300
};

const startSearchInputParams = (inputParams = '')=> {

    return async(dispatch)=> {

        params.gsrsearch = inputParams;
        const data = await axios.get(urlWikipediaApi, { params });
        const resultObject = data.data.query.pages;
        const resultListArray = Object.values(resultObject)

        dispatch(setSearchInputParamsResults(resultListArray))
    }
}

const setSearchInputParamsResults = (data)=> ({
    type: types.getDataSearhParam,
    payload: {
        data,
    }
})

const startGetDataMostPopularArticleOfMonth = ()=> {

    return async(dispatch)=> {

        const dataArticles = await axios.get(urlArticleOfTheMonth).then(v=> v).then(d => d.data.items[0].articles);
        const dataArticlesSlice = dataArticles.slice(3,23).map( d => d.article)
       
        const promiseImageAndTitleArr = dataArticlesSlice.map( async(title) => {
            params.gsrsearch = title;
            const formatTitle = title.replace(/_/g, " ");

            const data = await axios.get(urlWikipediaApi, { params });
            const resultList = data.data.query.pages;
            const imageFound = Object.values(resultList)
                                    .find(data => data.hasOwnProperty('thumbnail') && data.title === formatTitle)?.thumbnail.source;
            const titleAndId = Object.values(resultList).find(data => data.title === formatTitle);

            const nestedData = {
                imageSource: imageFound,
                title: titleAndId.title,
                pageId: titleAndId.pageid,
                description: titleAndId.extract,
            }
            return nestedData
        })
        
        const dataImageAndTitle = await Promise.all(promiseImageAndTitleArr);

        dispatch(getDataMostPopularArticleOfMonth(dataImageAndTitle))

        /* console.log(dataImageAndTitle); */

    }


}

const getDataMostPopularArticleOfMonth = (data)=> ({
    type: types.getDataMostPopularArticleOfMonth,
    payload: {
        data,
    }
})


const startGetDataEventOfTheDay = ()=> {
    return async(dispatch)=> {

        /*
            Todo: 
            Se debe incluir una funcion que determine el mes y dia actual para anexarlo a la url y traer la data actual

        */
        const {events:dataEvents} = await axios.get(urlEventOfTheDay).then(v=> v).then(d => d.data);
        const promiseEventsPerYearAndEachArticles = dataEvents.map( async (eventYear )=> {

            
            const articles = eventYear.wikipedia.map(async(article) => {

                let title = article.title;
                let link = article.wikipedia;
                params.gsrsearch = title;

                /*REFACTORIZAR CODIGO REPETIDO */
                const data = await axios.get(urlWikipediaApi, { params });
                const resultList = data.data.query.pages;
                const imageFound = Object.values(resultList)
                                        .find(data => data.hasOwnProperty('thumbnail') && data?.title === title)?.thumbnail.source;
                const titleAndId = Object.values(resultList).find(data => data?.title === title);

                /*REFACTORIZAR CODIGO REPETIDO */ 
                
                
                if(!titleAndId?.pageid){
                    return {}
                }
                const nestedData = {
                    imageSource: imageFound,
                    title: titleAndId.title,
                    pageId: titleAndId.pageid,
                    
                }
                
                nestedData.linkToWikipedia = link;
                nestedData.description = titleAndId.extract;
                
                return nestedData

            })

            const allArticlePerYear = await Promise.all(articles);;

            eventYear.articles = allArticlePerYear;
            eventYear.imageSource = eventYear.articles.find(data => data?.hasOwnProperty('imageSource'))?.imageSource;
            
            return eventYear

        });

        await Promise.all(promiseEventsPerYearAndEachArticles);
        /* console.log(eventsPerYearAndEachArticles); */

        dispatch(getDataEventOfTheDay(dataEvents));
    }


}

const getDataEventOfTheDay = (data)=> ({
    type: types.getEventOfTheDayPerYear,
    payload: {
        data,
    }
})

const getDatacategory = (data)=> ({
    type: types.getDataCategory,
    payload: {
        data,
    }
})




export {
    startGetDataMostPopularArticleOfMonth,
    startGetDataEventOfTheDay,
    startSearchInputParams,
    getDatacategory,
}