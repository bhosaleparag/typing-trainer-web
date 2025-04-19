// userReducer.js
import { SET_NAME } from './userActions';

const initialState = {
  name: '',
  email: '',
  photo: '',
  userId: '',
  wordRaceScore: 0,
  highestScoreWordRace: 0,
  gamesPlayed: 0,
  badge: 1
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
