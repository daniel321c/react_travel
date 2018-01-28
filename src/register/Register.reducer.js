import { registerConstants } from './constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case registerConstants.REGISTER_REQUEST:
      return { registering: true };
    case registerConstants.REGISTER_SUCCESS:
      return {};
    case registerConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}