import { connect } from 'react-redux'
import Articles from '../components/Articles.jsx'

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articlesList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const ReduxArticles = connect(mapStateToProps, mapDispatchToProps)(Articles);

export default ReduxArticles;

