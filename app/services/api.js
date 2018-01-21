import axios from 'axios';

const SERVER = 'https://conduit.productionready.io/api/';

var getEndPoint = (endpoint) => [ SERVER, endpoint ].join('');
var withAuthHeader = (token) => {
    return {
        'Authorization': `Token ${token}`
    }
};

var api = {
    login(user) {
        let { email, password } = user;

        let loginEndpoint = getEndPoint('users/login');

        return axios.post(loginEndpoint, {
            user: { email, password }
        })
        .then(response => response.data.user);
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

        return axios.put(getEndPoint('user'), {
            user: { email, username, password, image, bio }
        });
    },

    getProfile(username) {
        let profileEndpoint = getEndPoint(`profiles/${username}`);

        return axios.get(profileEndpoint);
    },

    followUser(username) {
        let followEndpoint = getEndPoint(`profiles/${username}/follow`);

        return axios.post(followEndpoint);
    },

    unfollowUser(username) {
        let followEndpoint = getEndPoint(`profiles/${username}/follow`);

        return axios.delete(followEndpoint);
    },

    articlesList(token, params) {
        let articlesEndpoint = getEndPoint('articles');

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

    articlesFeed(token, params) {
        let feedEndpoint = getEndPoint('articles/feed');

        return axios
            .get(feedEndpoint, {
                params,
                headers: withAuthHeader(token)
            })
            .then(response => response.data);;
    },

    getTags() {
        return axios.get(getEndPoint('tags'))
                    .then(response => response.data.tags);
    },

    favoriteArticle(token, slug) {
        let favoriteEndpoint = getEndPoint(`articles/${slug}/favorite`);
        return axios
            .post(favoriteEndpoint, null, {
                headers: withAuthHeader(token)
            })
            .then(response => response.data.article);
    },

    unfavoriteArticle(token, slug) {
        let unfavoriteEndpoint = getEndPoint(`articles/${slug}/favorite`);
        return axios
            .delete(unfavoriteEndpoint, {
                headers: withAuthHeader(token)
            })
            .then(response => response.data.article);
    },

    getArticle (token, slug) {
        let articleEndpoint = getEndPoint(`articles/${slug}`),
            params = {};
        if (token) {
            params = {
                headers: withAuthHeader(token)
            };
        }
        return axios
            .get(articleEndpoint, params)
            .then(response => response.data.article);
    }
};

export default api;
