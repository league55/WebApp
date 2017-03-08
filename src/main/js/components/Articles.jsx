import React, {PropTypes} from "react";
import Header from "../Header.jsx";
import Page from "../Page.jsx";
import Article from "../Article.jsx";
import buildArticle from "../../dynamic/ArticleBuilder";
import Paragraph from '../Paragraph.jsx';
import { Row, Col } from 'react-bootstrap';

class Articles extends React.Component {

    mapArticles(articles) {
        return articles.map((article)=> buildArticle(article));
    }

    render() {
        let articleComponents = this.mapArticles(this.props.articles);
        return (<div>
                <h1> Articles page</h1>
                    <Col md={10} mdOffset={2}>
                    {articleComponents}
                </Col>
            </div>
        );
    }
}

Articles.propTypes = {
    children: React.PropTypes.object
};

export default Articles;