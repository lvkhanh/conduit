import Api from './api';
import Token from './token';


const handle = {
    favorite (event, article, callback) {
        event.preventDefault();

        let token = Token.get();
        if (!token) return;

        let {slug, favorited} = article,
            exec;
        if (favorited) {
            exec = Api.unfavoriteArticle(slug);
        } else {
            exec = Api.favoriteArticle(slug);
        }

        exec.then(callback);
    },

    followUser (event, article, callback) {
        event.preventDefault();

        let token = Token.get();
        if (!token) return;

        let {author: {username, following}} = article,
            exec;
        if (following) {
            exec = Api.unfollowUser(username);
        } else {
            exec = Api.followUser(username);
        }
        exec.then(callback);
    }
}

export default handle;


/*
 {
 "article": {
     "slug": "how-to-train-your-dragon",
     "title": "How to train your dragon",
     "description": "Ever wonder how?",
     "body": "It takes a Jacobian",
     "tagList": ["dragons", "training"],
     "createdAt": "2016-02-18T03:22:56.637Z",
     "updatedAt": "2016-02-18T03:48:35.824Z",
     "favorited": false,
     "favoritesCount": 0,
     "author": {
         "username": "jake",
         "bio": "I work at statefarm",
         "image": "https://i.stack.imgur.com/xHWG8.jpg",
         "following": false
         }
     }
 }*/