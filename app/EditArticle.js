import React, { PureComponent } from 'react';
import {withRouter} from 'react-router-dom';
import Api from './services/api';

class EditArticle extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            article: {}
        }
        this.isNew = props.location.pathname.indexOf('article/new') > -1;

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handlePublishArticle = this.handlePublishArticle.bind(this);
    }

    componentDidMount () {
        if (!this.isNew) {
            let id = this.props.match.params.id;
            Api
                .getArticle(id)
                .then(article => {
                    this.setState({article});
                })
        }
    }

    handlePublishArticle () {
        let {slug, title, description, body, tagList} = this.state.article,
            exec;

        if (this.isNew) {
            exec = Api
                .createArticle({
                    article: {
                        title,
                        description,
                        body,
                        tagList
                    }
                });
        } else {
            exec = Api
                .updateArticle(slug, {
                    article: {
                        title,
                        description,
                        body,
                        tagList
                    }
                });
        }

        exec.then((article) => {
            this.props.history.push(`/article/view/${article.slug}`);
        });
    }

    handleOnChange (e) {
        let {id, value} = e.target;
        this.setState({
            article: {
                ...this.state.article,
                [id] : value
            }
        });
    }

    render () {
        let {title, description, body, tagList} = this.state.article;
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input id="title" type="text" className="form-control form-control-lg" placeholder="Article Title" value={title} onChange={this.handleOnChange}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input id="description" type="text" className="form-control" placeholder="What's this article about?" value={description} onChange={this.handleOnChange}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea id="body" className="form-control" rows="8" placeholder="Write your article (in markdown)" value={body} onChange={this.handleOnChange}></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter tags" /><div className="tag-list"></div>
                                    </fieldset>
                                    <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={this.handlePublishArticle}>
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditArticle);
