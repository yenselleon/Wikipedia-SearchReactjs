import types from '../types/types'


const initialState = {
    lastview: [],
    bookmarks: [],
}

export const setLocalStorageReducer = (state = initialState, action)=> {
    const {payload} = action;

    switch (action.type) {
        case types.saveBookmarks:
            return {
                ...state,
                bookmarks: payload.data
            }
        case types.saveLastview:
            return {
                ...state,
                lastview: payload.data
            }
        case types.deleteBookmark:
            return {
                ...state,
                bookmarks: state.bookmarks.filter(article =>( 
                    article.pageId !== payload.article.pageId
                )) 
            }
        
    
        default:
            return state;
    }


}