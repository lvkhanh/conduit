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

    articlesList(params) {
        let articlesEndpoint = getEndPoint('articles');

        return axios.get(articlesEndpoint, { params });
    },

    articlesFeed(token, params) {
        let feedEndpoint = getEndPoint('articles/feed');

        return axios.get(feedEndpoint, {
            params,
            headers: withAuthHeader(token)
        });
    },

    getTags() {
        return axios.get(getEndPoint('tags'))
                    .then(response => response.data.tags);
    }
};

export default api;
