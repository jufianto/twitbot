
var TWITTER_CONSUMER_KEY = '';
var TWITTER_CONSUMER_SECRET = '';
var TWITTER_ACCESS_TOKEN = '';
var TWITTER_ACCESS_TOKEN_SECRET = '';


var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
	
});

console.log('The bot is running...');
var TWITTER_SEARCH_PHRASE = '#DesaIT OR #DesaGoIT';
var status = ['']
var hastag = ""

function postToTwitter(){
	if (typeof status !== 'undefined' && status.length > 0)
	{
		var thestatus = status.shift();
		console.log('pop ' + thestatus)
		//console.log('data telah di pop')
		Bot.post('statuses/update', { status:  thestatus + hastag },function(error, data, response){
				if (error) {
					console.log('Bot could not be initiated, : ' + error);
				}
				else {


		  			console.log('Status di update' , thestatus);
		  			
				}

				})
	}else{
		console.log("---")
	}
}


function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}
	
	/* Set an interval of 30 minutes (in microsecondes) */
	setInterval(BotRetweet, 1*60*1000);
}






function init()
{
	  setInterval(postToTwitter,1000)
	  
}

init()
BotRetweet()
