import React, { PureComponent } from 'react';
import Api from './services/api';
import ArticleMeta from './ArticleMeta';

const ArticleContent = ({body}) => (
    <div className="row article-content">
        <div className="col-md-12">
            <p>{body}</p>
        </div>
    </div>
);

class Article extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            article: {}
        };
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount () {
        let id = this.props.match.params.id;
        Api
            .getArticle(id)
            .then(article => {
                this.setState({article});
            });
    }

    handleFavorite (article) {
        this.setState({article});
    }

    handleFollow (profile) {
        this.setState({
            article: {
                ...this.state.article,
                author: profile
            }
        });
    }

    render () {
        let {title, body} = this.state.article;
        return (
            <div className="article-page">
                <div className="banner">
                    <div className="container">
                        <h1>{title}</h1>
                        <ArticleMeta article={this.state.article} currentUser={this.props.user} handleFollow={this.handleFollow} handleFavorite={this.handleFavorite}/>
                    </div>
                </div>

                <div className="container page">
                    <ArticleContent body={body}/>
                    <hr />
                    <div className="article-actions">
                        <ArticleMeta article={this.state.article} currentUser={this.props.user} handleFollow={this.handleFollow} handleFavorite={this.handleFavorite}/>
                    </div>

                    {/*<CommentSection/>*/}
                </div>
            </div>
        );
    }
}

export default Article;

const CommentSection = () => (
    <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
                <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">
                        Post Comment
                    </button>
                </div>
            </form>

            <div className="card">
                <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                    <a href="" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">Jacob Schmidt</a>
                    <span className="date-posted">Dec 29th</span>
                </div>
            </div>

            <div className="card">
                <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                    <a href="" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">Jacob Schmidt</a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                        <i className="ion-edit"></i>
                        <i className="ion-trash-a"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
);