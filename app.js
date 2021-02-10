//USERS Reducer:
const users = (prevState = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
        {  return [
            ...prevState,
            { ...action.payload }];
        }
            break;
        case 'ADD_FAV':{
            const { userId, movieId } = action.payload;
            const movieToUpdate = store.getState().movies.find(movie => movie.id === movieId);
            if (!movieToUpdate) return `Invalid Movie Id`;
            const userToUpdate = prevState.filter(user => user.id === userId)[0];
            userToUpdate.fav = [...userToUpdate.fav, `${movieId}`];
            const newState = [...prevState].filter(user => user.id !== userId);
            return [...newState, { ...userToUpdate }];
            }
        case 'ADD_WATCH':{
            const { userId, movieId } = action.payload;
            const movieToUpdate = store.getState().movies.find(movie => movie.id === movieId);
            if (!movieToUpdate) return `Invalid Movie Id`;
            const userToUpdate = prevState.filter(user => user.id === userId)[0];
            userToUpdate.watchList = [...userToUpdate.watchList, `${movieId}`];
            const newState = [...prevState].filter(user => user.id !== userId);
            return [...newState, { ...userToUpdate }];
        }
        case 'TOGGLE_PLAY': {
            const { movieId, userId, clickDate } = action.payload;
            const movieToUpdate = store.getState().movies.find(movie => movie.id === movieId);
            if (!movieToUpdate) return `Invalid Movie Id`;
            const userToUpdate = prevState.filter(user => user.id === userId)[0];
            if (!userToUpdate) return `Invalid User Info, c'mon man!`;
            const filteredWatchingNow = userToUpdate.watchingNow.filter(movie => movie.movieId === movieId)[0];
            //movie already started before:
            if (filteredWatchingNow) {
                filteredWatchingNow.playing = !filteredWatchingNow.playing;
                filteredWatchingNow.dates = [...filteredWatchingNow.dates, `${clickDate}`]
                filteredWatchingNow.numberOfPauses = Math.trunc(filteredWatchingNow.dates.length / 2);
                filteredWatchingNow.watchTime += filteredWatchingNow.dates[filteredWatchingNow.dates.length - 1] - filteredWatchingNow.dates[filteredWatchingNow.dates.length - 2];
            } else {
                //handling new movie
                userToUpdate.watchingNow = [...userToUpdate.watchingNow, {
                    movieId, watchTime:0, playing: true, dates: [`${clickDate}`],
                }]
            }
            const newState = [...prevState].filter(user => user.id !== userId);
            return [...newState, { ...userToUpdate }];
        }
        default:
            return prevState;
    }
};
// admins reducer
const admins = (prevState = [], action) => {
    switch (action.type) {
        case 'ADD_ADMIN':
        return [
            ...prevState,
            {
            ...action.payload
            },
        ];
        default:
        return prevState;
    }
};
//MOVIES reducer:
const movies = (prevState = [], action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
        return [
            ...prevState,
            {
            ...action.payload
            },
        ];
        case 'ADD_DETAIL':
            {
                const { movieId, cast } = action.payload;
                const movieToUpdate = prevState.find(movie => movie.id === movieId);
                if (movieToUpdate) {
                    movieToUpdate.details = cast.map(member => member).concat(movieToUpdate.details);
                    const movieToUpdateIndex = prevState.findIndex(movie => movie.id === movieId);
                    const newState = [...prevState];
                    newState.splice(movieToUpdateIndex, 1, movieToUpdate);
                    return newState;
                } else {
                    return `Again, Invalid Movie Id (-_-;)`
                }
            }
        case 'DELETE_MOVIE':
            {
                return prevState.filter(m => m.id !== action.payload.movieId);
            }
        case 'RATE_MOVIE':
            {
                const newState = [...prevState];
                const { movieId, userId, score } = action.payload;
                newState.map(m => {
                    if (m.id === movieId) {
                        m.rating = [...m.rating, {
                            userId,
                            score,
                        }]}})
                return newState;
            }
        case 'ADD_FAV':
            {
                const { userId, movieId } = action.payload;
                const movieToUpdate = prevState.find(movie => movie.id === movieId);
                if (movieToUpdate) {
                    movieToUpdate.favedBy = [...movieToUpdate.favedBy,{userId}]
                    const movieToUpdateIndex = prevState.findIndex(movie => movie.id === movieId);
                    const newState = [...prevState];
                    newState.splice(movieToUpdateIndex, 1, movieToUpdate);
                    return newState;
                }
                else {
                    console.log(`Invalid movie Id! (-_-;)`)
                    return `Invalid movie Id! (-_-;)`
                }
            }
        case 'ADD_WATCH':
            {
                const { userId, movieId, watchTime } = action.payload;
                const movieToUpdate = prevState.find(movie => movie.id === movieId);
                if (movieToUpdate) {
                    movieToUpdate.watchedBy = [...movieToUpdate.watchedBy,{userId,watchTime, watched:watchTime >= movieToUpdate.duration ? true : false}]
                    const movieToUpdateIndex = prevState.findIndex(movie => movie.id === movieId);
                    const newState = [...prevState];
                    newState.splice(movieToUpdateIndex, 1, movieToUpdate);
                    return newState;
                }
                else {
                    console.log(`Invalid movie Id! (-_-;)`)
                    return `Invalid movie Id! (-_-;)`
                }
            }
        default:
            return prevState;
    }
}

//store:
const { createStore, combineReducers } = myRedux;
//Combine it  يا ست الكل
const rootReducer = combineReducers({ movies, users, admins });
const store = createStore(rootReducer);


//app:
const app = {
    //MOVIES:
    addMovie: (name, duration, adminId) => {
        const _admin = store.getState().admins.filter(admin => admin.id === adminId)[0];
        if (!_admin) return `NOT AUTHORIZED TO PERFORM THIS ACTION (O_o;)`;
        store.dispatch({
            type: 'ADD_MOVIE',
            payload: {
                id: getRandomInt(),
                name,
                duration,
                details: [],
                rating: [],
                watchedBy: [],//[{userId:'u1',watchTime:99}]
                favedBy: [], //[{userId:'u1'}]
                postedBy: _admin.name
            }
        })
    },
    getMoviesList: () => store.getState().movies,
    addMovieDetails: (movieId, cast = []) => {
        store.dispatch({ type: 'ADD_DETAIL', payload: { movieId, cast } });
    },
    deleteMovie: (movieId, adminId) => {
        const _admin = store.getState().admins.filter(admin => admin.id === adminId)[0];
        if (!_admin) return `NOT AUTHORIZED TO PERFORM THIS ACTION (O_o;)`;
        store.dispatch({ type: 'DELETE_MOVIE', payload: { movieId } })
    },
    rateMovie: (movieId, userId, score) => {
        if (score > 10 || score < 0) return `Rating value has to be between 1:10`;
        store.dispatch({ type: 'RATE_MOVIE', payload: { movieId, userId, score } })
    },
    getMovieRatingList: (movieId) => {
        const state = store.getState().movies;
        const list = state.filter(m => m.id === movieId)
        list[0].rating.map(s => {
            console.log(s.userId)
        })
    },
    getMovieOverallScore: (movieId) => {
        let score = 0;
        let overallScore = 0;
        let divider = 0;
        const state = store.getState().movies;
        const list = state.filter(m => m.id === movieId)
        list[0].rating.map(r => {
            score += r.score;
            divider += 10;
        })
        overallScore = score / divider * 100;
        return `OverAll Rating: ${overallScore.toFixed(2)}%`;
    },
    addToFav: (userId, movieId) => {
        store.dispatch({ type: 'ADD_FAV', payload: { userId, movieId } })
    },
    addToWatch: (userId, movieId, watchTime = 0) => {
        store.dispatch({ type: 'ADD_WATCH', payload: { userId, movieId, watchTime, watched: null } })
    },
    getMovieWatchers: (movieId) => {
        const state = store.getState().movies;
        const targetMovie = state.find(movie => movie.id === movieId);
        if (targetMovie) {
            return `Watching now : ${targetMovie.watchedBy.map(user => user.userId)}`;
        }
        else {
            return `Invalid Movie Id (-_-;)`;
        }
    },
    getUserWatchTime: (userId, movieId) => {
        const state = store.getState().movies;
        const targetMovie = state.find(movie => movie.id === movieId);
        let userWatchTime = targetMovie.watchedBy.filter(user => user.userId === userId)[0];
        let displayText = userWatchTime ? userWatchTime.watchTime : 'NOT there, cAuSe yOu eNtEreD wRoNg iNfo, SHAME ON YOU (-_-;)'
        if (targetMovie) {
            return `Watch Time for ${userId} is ${displayText} Minutes`;
        }
    },
    //USERS:
    addUser: (name) => {
        store.dispatch({
            type: 'ADD_USER', payload: {
                id: `u${getRandomInt()}`,
                name,
                fav: [],
                watchList: [],
                watchingNow: [],
                watchingDates:[],
                isLoggedIn: false,
            }
        })
    },
    toggleUserLogin: (userName, userId) => {
        const state = store.getState().users;
        const idChecker = state.filter(user => user.id === userId);
        const nameChecker = state.filter(user => user.name === userName);
        if (idChecker.length < 1) return `Wrong Id Info, Re-Check! Easy to hack us!`;
        if (nameChecker.length < 1) return `Wrong user name Info, Re-Check! 0 security`;
        nameChecker[0].isLoggedIn = !nameChecker[0].isLoggedIn;
        return `user toggled succesfuly !✔️`
    },
    getUsers: () => {
        return store.getState().users;
    },
    togglePlay: (movieId, userId, clickDate = new Date().toLocaleTimeString("en-US")) => {
        const targetUser = store.getState().users.filter(user => user.id === userId)[0];
        if (!targetUser) retuen`Invalid User info`;
        store.dispatch({ type: 'TOGGLE_PLAY', payload: { movieId, userId, clickDate, } });

    },

    //ADMINS:
    addAdmin: (name) => {
        store.dispatch({
            type: 'ADD_ADMIN', payload: {
                id: `a${getRandomInt()}`,
                name,
                isLoggedIn: false,
            }
        })
    },
    toggleAdminLogin: (adminName, adminId) => {
        const state = store.getState().admins;
        const idChecker = state.filter(admin => admin.id === adminId);
        const nameChecker = state.filter(admin => admin.name === adminName);
        if (idChecker.length < 1) return `Wrong admin Id Info, Re-Check! Easy to hack us!`;
        if (nameChecker.length < 1) return `Wrong admin name Info, Re-Check! 0 security`;
        nameChecker[0].isLoggedIn = !nameChecker[0].isLoggedIn;
        return `Admin toggled succesfuly !✔️`
    }
}

