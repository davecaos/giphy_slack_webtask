# giphy_slack_webtask
Little example of hacky version of Slack's '/giphy' command using webtask,
this will only post in channels (it will be posted by default at the general channel with doge photos)

## Create the webtask
```bash
wt create --secret BOT_TOKEN=PUT_OUR_SLACK_TOKEN_HERE https://raw.githubusercontent.com/davecaos/giphy_slack_webtask/master/giphy.js
```

## Result

<img width="1280" alt="screen shot 2018-07-25 at 00 26 50" src="https://user-images.githubusercontent.com/6124495/43367447-5d2053fc-9323-11e8-817c-3a51cbaa045d.png">


