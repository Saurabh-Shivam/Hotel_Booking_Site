import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      // here payload is goona be ur destination, date and options data which we entered in the home page's search bar
      return action.payload;
    // when we click on the search bar button we will be changing our state so then we will need NEW_SEARCH action and to dispatch that we will need the dispatch function
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// here children will be our components with which we want to reach the data
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
