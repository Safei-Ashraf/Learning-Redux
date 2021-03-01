# Redux Movie APP (Vanilla JS)


A simple movies app, applying all basic concepts of state management using Redux approach in Vanilla JS.

- Add admin (authorized person to add/create/delete movies in the app)
- Add movies (name, duration) id assigned randomly.
- Add user (able to watch movies, play, pause, rate)
- Get a movies overall rating by different users
- Get list of all users who watched a certain movie
- Get all users who rated a movie
- Get a movie watch time, number of play/pause events
- Get a user watch list - fav list.
- Use undo -redo buttons to undo movie-related actions like (add-delete)
- Render added movies into UI along with undo -redo buttons.



##How To use:

-There is a live demo link below, you can use without downloading the app.


-clone or download the app using
```sh
git clone https://github.com/Safei-Ashraf/Learning-Redux.git
or using SSH 
git clone git@github.com:Safei-Ashraf/Learning-Redux.git

Then use live server to view the app by running index.html
```

![image](https://user-images.githubusercontent.com/44810632/109462258-e0690380-7a6b-11eb-8f4f-e5c9565074f0.png)

- Use the browser console to Add Admin => app.addAdmin(name)
- Add a movie through this admin (or any admin you might add) => app.addMovie(movieName, duration, AdminId) you can obtain adminId from the state store.getState().admin[0].id
- Add a user app.addUser(name)
- Now you can rate a movie app.rateMovie, add to watch list, play, pause, ..etc as user. and it will appear on the rendered UI.
- you can add or delete more movies as admin, it will also appear in the UI
- you can use the UNDO - REDO buttons to undo or redo actions related to movies.

### while the applies all concepts from Redux, they were all built using Vanilla JS to build solid understanding of state management concepts.

## Live Demo: 
 - Simple set of steps in photo of how to use the app 
![image](https://user-images.githubusercontent.com/44810632/109463634-05f70c80-7a6e-11eb-92dd-68ff2bc5fd8d.png)


 - [Live demo you can use without downloading the app click here](https://romantic-lalande-28c4ba.netlify.app/)


#   Learning Notes: 

- In this ReadME, I will be adding some of the notes I have been taking during learning, most of it came from the community notes on egghead course 
>	https://egghead.io/courses/getting-started-with-redux

and the rest I picked from various sources or by myself.


Redux has 3 main principles!

##    The first principle of Redux:



The entire state of the application will be represented by one JavaScript object.

This holds true regardless of the app's complexity.

All mutations and changes to the state in Redux are explicit.

Everything that changes in the application, including the data and the UI state, is contained in a single object called the state or state tree.

Since the entire state is represented in a single object, we are able to keep track of changes over time.

The second principle of Redux is that the state tree is read only.

You cannot modify or write to it.

The overall principle here is that the state is read only, and can only be modified by dispatching actions.

Any time you want to change the state, you have to dispatch an action. 
An action is a plain JS object describing in a minimal way the change to be made to the state.
 Just like the state is the minimal representation of your app's data, the action is the minimal representation of the change to that data.
The only way to change is the state tree is by dispatching an action.


Pure and Impure Functions

Pure functions are those whose return values depend only upon the values of their arguments.
 Pure functions don't have side effects (like network or database calls). They also do not override any existing values.
 Pure functions are predictable: given the same argument(s) , they will always produce the same return value. In the example above, the function returns a new array, instead of modifying the items that was passed in.



 
 Impure functions may have side effects, may operate on the DOM, and may override the values you pass to them. 

The distinction between pure and impure functions is important to understand, since Redux will sometimes require you to write pure functions.


The Reducer Function

React pioneered the idea that the UI layer is most predictable when it is described as a pure function of the application's state.
Redux complements this approach with another idea: that state mutations in your app must be described by a pure function that takes the previous state and the action being dispatched, and returns the next state of your application.
Inside any Redux application, there is one particular function that takes the previous state and the action being dispatched, and returns the next state of the whole application. This function must be pure (i.e. it cannot modify the state given to it) because it has to return a new object representing the application's new state.
Even in large applications, there is still just a single function that calculates the new state of the application. It does so based on the previous state of the whole application and the action being dispatched.
However, this function isn't necessarily slow. If certain parts of the state haven't changed, their references can stay as is. This is what makes Redux fast.
This is the 3rd and final principle of Redux:
 to describe state mutations, you must write a function that takes the previous state of the app and the action being dispatched, then returns the next state of the app. This function is called the Reducer.


			Using REDUX into your App
Installation:
# Yarn
yarn add redux

Importing:
import { createStore } from 'redux'

Declaration: 
const store = createStore(counter);


The store binds together the 3 principles of Redux:
	1. Holds the current application state object
	2. Allows you to dispatch actions
	3. When you create it, you need to specify the reducer that tells how state is updated with actions.


store has 3 important methods:
getState() retrieves the current state of the Redux store. If we ran console.log(store.getState()) with the code above, we could get 0 since it is the initial state of our application.
dispatch() is the most commonly used. It is how we dispatch actions to change the state of the application. If we run store.dispatch( { type: 'INCREMENT' }); followed by console.log(store.getState()); we will get 1, which reflects the current state resulting from the INCREMENT action.
subscribe() registers a callback that the redux store will call any time an action has been dispatched so you can update the UI of your application to reflect the current application state.








Avoiding Array Mutations:
 in order to avoid changes to the current array, we need the changes we make to be applied onto a NEW array, we use methods like (slice, concat, the … & map)

Avoiding Object Mutations:
 we use methods like the Object.assign() & …object (spread operator)


									

Combine Reducers:
This pattern is being used to combine reducers with the old state and reducers to make sure we avoid conflicts in code and separate concerns.

While storing the application's state with just an array may work for small applications, we can use objects to store more information.

To store this new information, we don't need to change the existing reducers.

We will use reducer composition to create a new reducer that calls existing reducers to manage their parts of the state, then combine the parts into a single state object.

Ref for reducer composition manually: https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/09-Reducer_Composition_with_Objects.md
Code: t.ly/spMq


Since this is a very common pattern in Redux, there is a helper function for it called 
			
r


A little help from :https://levelup.gitconnected.com/learn-redux-by-building-redux-from-scratch-dcbcbd31b0d0

“Redux is a predictable state container for JavaScript apps.”
 The application state consists of two key inputs:
	1. Data sent from the server
	2. User interaction with the UI / application

Redux manages the application state in the store. The state itself is just a plain JavaScript object. The store also provides methods to update the state and read from the state.

At the core of Redux is a publish/subscribe (PubSub) pattern which is a form of an observer pattern similar to the event driven architecture heavily used in JavaScript.

Action: it is simply a plain JavaScript object that contains a type which is a unique key to identify it and an additional payload of data.

Using the action, the state is updated based on the type and payload received. Components can be subscribed to state changes and will update the UI based on the the new state tree.

A simple representation of this flow is:

 user interaction publishes an action -> the reducer updates the state -> subscribed components update the UI based on the new state.

 Built upon this concept are the three core:
1-Single source of truth. The entire state of the UI is derived from a single object.
2-State is read-only. Neither views nor callbacks can write to state. State can only be changed when emitting an action (the publish) which is just a plain JavaScript object passed as an argument to the reducer.
3-Changes are made with pure functions. 
The state is not updated directly. The reducer function take the previous state (also a plain object) and creates a new state object based on previous state and the action object. You should always return a new object, never mutate the current one.

What is a Reducer function

A reducer is a function that takes the state and action and returns the new state.


Where prevState, nextState, and action are all JavaScript objects.

Note: If you’ve seen the combineReducers function before, it is just utility method that allows you to create isolated keys in the state object. It serves as a way to encapsulate the different parts of our state tree that are related and allows the developer to write clean code. Including anymore detail in this tutorial may only serve confuse, so you should just know that it doesn’t actually change the implementation of the single state tree. It separates the tree into chunks and then combines them into the final single state object that we’ve become accustomed to.


