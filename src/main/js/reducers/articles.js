import * as actionTypes from '../constants/actionTypes';

const defaultState = {
  articlesList: [
    {
      id: 1,
      title: 'Big bang',
      content: [
        {
          type: 'heading',
          content: 'part 1'
        },
        {
          type: 'paragraph',
          content: 'it is big big bang \n the reason of the live'
        }
      ]
    },
    {
      id: 2,
      title: 'Come on ',
      content: [
        {
          type: 'heading',
          content: 'part 2'
        },
        {
          type: 'paragraph',
          content: 'and let me gove, because I ....'
        },
        {
          type: 'image',
          content: {
            src: '1',
            name: 'pikachu'
          }
        }
      ]
    }
  ]
};


export default function articles(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      return Object.assign({}, state, state.articlesList.concat(action.article));
    default:
      return state;
  }
}
