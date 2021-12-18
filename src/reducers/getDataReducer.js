import types from '../types/types'


const initialState = {
    mostPopularArticlesMonth: [],
    eventOfTheDayPerYear: [],
    categorys: [],
    searchedResults: [],
}

export const getDataReducer = (state = initialState, action)=> {
    const {payload} = action;

    switch (action.type) {
        case types.getDataMostPopularArticleOfMonth:
            return {
                ...state,
                mostPopularArticlesMonth: [
                    ...payload.data
                ],
            }
        case types.getEventOfTheDayPerYear:
            return {
                ...state,
                eventOfTheDayPerYear: [
                    ...payload.data
                ],
            }
        case types.getDataCategory:
            return {
                ...state,
                categorys: payload.data
            }
        case types.getDataSearhParam:
            return {
                ...state,
                searchedResults: payload.data
            }
    
        default:
            return state;
    }


}