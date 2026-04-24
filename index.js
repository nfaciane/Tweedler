$(() => {
  const $page = $('#all-contents');

  const $tweetsDiv = $('<div class="tweets"></div>');

  $page.append($tweetsDiv);

  //put this code into a function
  function addNewTweets(tweets) {
    const $tweets = tweets.map((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      //username needs to be in its own tag
      //swapping const text = `@${tweet.user}: ${tweet.message}`;
      //setting each class
      const $username = $('<p class="username">').text(tweet.user);
      const $message = $('<p class="message">').text(tweet.message);
      const $timestamp = $('<p class="timestamp">').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));
      const $humanFriendlyTimestamp = $('<p class="humanFriendlyTimestamp">').text(moment(tweet.created_at).fromNow());

      //give the username it's click handler function inside here
      $tweet.append($username).append($message).append($timestamp).append($humanFriendlyTimestamp);

      return $tweet;
    });

    $tweetsDiv.prepend($tweets);
  }

  //swapped input to default to homepage
  addNewTweets(streams.home);

  //allow users to write their own tweets, appending objects to page
  const $usernameInput = $('<input id="username-input">');
  const $messageInput = $('<input id="message-input">');
  const $submit = $('<input type="submit">');
  $page.prepend($submit).prepend($messageInput).prepend($usernameInput);

  //handling new tweet submit and adding to the home stream, then re-rendering the page
  $submit.on('click', function () {
    streams.home.unshift({
      user: $usernameInput.val(),
      message: $messageInput.val(),
      created_at: new Date()
    });
    $('.tweets').empty();
    addNewTweets(streams.home);
  });

  //pass tweets for specific username on click event
  $tweetsDiv.on('click', '.username', function (event) {
    const username = $(event.currentTarget).text(); // e.g. "shawndrost"
    $('.tweets').empty();
    addNewTweets(streams.users[username]);
  });

  //auto adding new tweets to the top of the home page
  let lastCount = streams.home.length;
  setInterval(function () {
    let newTweets = streams.home.slice(lastCount);
    newTweets.forEach(function (tweet) {
      const $tweet = $('<div class="tweet"></div>');
      const $username = $('<p class="username">').text(tweet.user);
      const $message = $('<p class="message">').text(tweet.message);
      const $timestamp = $('<p class="timestamp">').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));
      const $humanFriendlyTimestamp = $('<p class="humanFriendlyTimestamp">').text(moment(tweet.created_at).fromNow());
      $tweet.append($username).append($message).append($timestamp).append($humanFriendlyTimestamp);
      $tweetsDiv.prepend($tweet);
    });
    lastCount = streams.home.length;
  }, 1500);

});



/*
//show user new tweets, compare lastCount array length to newTweets array length
let lastCount = streams.home.length
setInterval(function() {
  //grab new tweets and render
  let newTweets = streams.home.slice(lastCount);
  newTweets.forEach(function(tweet){
    const $tweet = $('<div class="tweet"></div>');
    //add newTweets to top of home page; user prepend
    $tweetsDiv.prepend($tweet);
  });
}, 10000);
*/
