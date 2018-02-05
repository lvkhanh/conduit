import axios from 'axios';
import Token from './token';

const SERVER = 'https://conduit.productionready.io/api/';

var getEndPoint = (endpoint) => [ SERVER, endpoint ].join('');
var withAuthHeader = (token) => {
    return {
        'Authorization': `Token ${token}`
    }
};

export const ARTICLE_ENDPOINT = 'articles';
export const ARTICLE_FEED_ENDPOINT = 'articles/feed';

var api = {
    login(user) {
        let { email, password } = user;

        let loginEndpoint = getEndPoint('users/login');

        return axios
            .post(loginEndpoint, {
                user: { email, password }
            })
            .then(response => ({ user: response.data.user }))
            .catch(response => ({ error: response.response.data.errors }));
    },

    register(user) {
        let { username, email, password } = user;

        let registerEndpoint = getEndPoint('users');

        return axios.post(registerEndpoint, {
            user: { username, email, password }
        });
    },

    currentUser(token) {
        return axios.get(getEndPoint('user'), {
            headers: withAuthHeader(token)
        }).then(response => response.data.user);
    },

    updateUser(user) {
        let {
            email,
            username,
            password,
            image,
            bio
        } = user;
        return axios
            .put(getEndPoint('user'), {
                user: { email, username, password, image, bio }
            }, {
                headers: withAuthHeader(Token.get())
            })
            .then(response => ({user: response.data.user}))
            .catch(response => ({error: response.response.data.errors}));
    },

    getProfile(username) {
        let token = Token.get(),
            params = {},
            profileEndpoint = getEndPoint(`profiles/${username}`);

        if (token) {
            params = {
                headers: withAuthHeader(token)
            }
        }

        return axios
            .get(profileEndpoint, params)
            .then(response => response.data.profile);
    },

    followUser(username) {
        let token = Token.get(),
            followEndpoint = getEndPoint(`profiles/${username}/follow`);

        return axios
            .post(followEndpoint, null, {
                headers: withAuthHeader(token)
            })
            .then(response => response.data.profile);
    },

    unfollowUser(username) {
        let token = Token.get(),
            followEndpoint = getEndPoint(`profiles/${username}/follow`);

        return axios
            .delete(followEndpoint, {
                headers: withAuthHeader(token)
            })
            .then(response => response.data.profile);
    },

    getArticles (endpoint, params = {}) {
        let token = Token.get(),
            articlesEndpoint = getEndPoint(endpoint);

        if (token) {
            params = {
                params,
                headers: withAuthHeader(token)
            }
        }

        return axios
            .get(articlesEndpoint, { ...params })
            .then(response => response.data);
    },

    articlesList(params) {
        let token = Token.get(),
            articlesEndpoint = getEndPoint('articles');

        if (token) {
            params = {
                params: params,
                headers: withAuthHeader(token)
            }
        }

        return axios
            .get(articlesEndpoint, { ...params })
            .then(response => response.data);
    },

    articlesFeed(params) {
        let token = Token.get(),
            feedEndpoint = getEndPoint('articles/feed');

        return axios
            .get(feedEndpoint, {
                params,
                headers: withAuthHeader(token)
            })
            .then(response => response.data);
    },

    getTags() {
        return axios.get(getEndPoint('tags'))
                    .then(response => response.data.tags);
    },

    favoriteArticle(slug) {
        let favoriteEndpoint = getEndPoint(`articles/${slug}/favorite`);
        return axios
            .post(favoriteEndpoint, null, {
                headers: withAuthHeader(Token.get())
            })
            .then(response => response.data.article);
    },

    unfavoriteArticle(slug) {
        let unfavoriteEndpoint = getEndPoint(`articles/${slug}/favorite`);
        return axios
            .delete(unfavoriteEndpoint, {
                headers: withAuthHeader(Token.get())
            })
            .then(response => response.data.article);
    },

    getArticle (slug) {
        let token = Token.get(),
            articleEndpoint = getEndPoint(`articles/${slug}`),
            params = {};
        if (token) {
            params = {
                headers: withAuthHeader(token)
            };
        }
        return axios
            .get(articleEndpoint, params)
            .then(response => response.data.article);
    },

    createArticle (article) {
        let endpoint = getEndPoint('/articles');
        return axios
            .post(endpoint, article, {
                headers: withAuthHeader(Token.get())
            })
            .then(response => response.data.article);
    },

    updateArticle (slug, article) {
        let endpoint = getEndPoint(`/articles/${slug}`);
        return axios
            .put(endpoint, article, {
                headers: withAuthHeader(Token.get())
            })
            .then(response => response.data.article);
    },

    deleteArticle (slug) {
        let endpoint = getEndPoint(`/articles/${slug}`);
        return axios
            .delete(endpoint, {
                headers: withAuthHeader(Token.get())
            })
            .then(response => response.data.article);
    }
};

export default api;
