import Api from './api';

const handle = {
    favorite (event, article, token, callback) {
        event.preventDefault();

        if (!token) return;

        let {slug, favorited} = article,
            exec;
        if (favorited) {
            exec = Api.unfavoriteArticle(token, slug);
        } else {
            exec = Api.favoriteArticle(token, slug);
        }

        exec.then(callback);
    }
}

export default handle;