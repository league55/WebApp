import { AUTHENTICATED, LOGGED_OUT } from './../actions/actions';

const defaultState = { status: 'stale', data: [] };
//
// const ADD_COMMENT = 'ADD_COMMENT';
// const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';

export function commentsReducer(state = defaultState, action) {
  switch (action.type) {
    // case ADD_COMMENT:
    //   return {
    //     status: state.status,
    //     data: state.data.concat(action.comment)
    //   };
    //
    // case COMMENTS_REFRESHED:
    //   return {
    //     status: 'loaded',
    //     data: action.comments
    //   };

    default:
      return state;
  }
}

const defaultAuthState = { signedIn: false, roles: [] };

export function authReducer(state = defaultAuthState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles
      });

    case LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export function errorsReducer(state = {} /* , action */) {
  return state;
}

