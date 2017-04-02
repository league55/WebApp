import { AUTHENTICATED, LOGGED_OUT } from './../actions/actions';

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

