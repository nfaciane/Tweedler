$(() => {
  const $page = $('#all-contents');

  const $tweetsDiv = $('<div class="tweets"></div>');

  $page.append($tweetsDiv);

  //create a function
  function addNewTweet(){
  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div class="tweet"></div>');
    const text = `@${tweet.user}: ${tweet.message}`;
    //add timestamp to div.tweet
    const $timestamp = $('<div> class="timestamp"></div>').text(moment(tweet.created_at).format('MMMM D, YYYY h:mma'));
    $tweet.text(text);
    //append timestamp to tweet
    $tweet.append($timestamp);

    return $tweet;
  });

  $tweetsDiv.append($tweets);
}
addNewTweet();
//show user new tweets; compare lastCount array length to newTweets array length
let lastCount = streams.home.length;
setInterval(function() {
  //grab new tweets and render
  let newTweets = streams.home.slice(lastCount);
  newTweets.forEach(function(){
    //add newTweets to top of home page; use prepend
    $tweetsDiv.prepend($tweet);
  })
}, 10000);
});
