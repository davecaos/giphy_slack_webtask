'use latest';

const request = require('request');
const slackBaseURL   = 'https://slack.com/api/';
const giphySearchUrl = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';
const chatPostEndpoint = 'chat.postMessage';
let token;

/* Call the given endpoing in Slack API */
const callSlackAPI = (endpoint, form, cb) => {
  request.post(slackBaseURL + endpoint, {form}, (err, res, body) => {
    if (err) return cb(err);

    body = JSON.parse(body);
    if (!body.ok) return cb(body.error);

    return cb(null, body);
  });
};

const callSearchGiphyAPI = (searchParam, cb) => {
  const url = giphySearchUrl + searchParam;
  request(url, function(err, response, body) {
    if (err) return cb(err);

    return cb(null, body);
  });
}


/* Post message to specified Slack channel */
const postMsg = (searchParam, channel, image , cb) => {
  const obj = {
    title: "Gif " + searchParam + " Link FTW!",
    title_link: image,
    image_url: image,
  };
  callSlackAPI(chatPostEndpoint, {
    token,
    channel,
    as_user: false,
    username: 'Image Roboto ;D',
    icon_url: 'https://images.emojiterra.com/google/android-oreo/512px/1f916.png',
    text: 'This is a gif and I like it :notes:',
    attachments: JSON.stringify([obj])
  }, (err, body) => {
    if (err) { console.log(err); return cb(err); }
    cb(null);
  });
};

module.exports = (context, cb) => {
  // Slack bot token
  token = context.data.BOT_TOKEN;

  const searchParam = context.data.searchParam || 'doge'
  const channelName = context.data.channel     || 'general';

  callSearchGiphyAPI(searchParam, (err, body) => {
    if (err) return cb(err);

    const imageUrl = JSON.parse(body).data.image_url;

    return postMsg(searchParam, channelName, imageUrl, cb);
  });
};


