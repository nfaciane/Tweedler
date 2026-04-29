$(() => {
  const $page = $('#all-contents');

  $('body').css('backgroundColor', '#B8D4E8');

  const $header = $('<h1>Tweeddler</h1>').css({
    color: '#F2F8FC',
    fontSize: '5rem',
    fontWeight: '800',
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center',
    padding: '60px 0',
    letterSpacing: '10px',
    backgroundImage: 'url(https://i.pinimg.com/1200x/14/b2/79/14b279e8c9f767179ebe3086a483faf1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 60%',
    textShadow: '2px 2px 8px #1A3040'
  });
  $('body').prepend($header);

  const $homeButton = $('<button>Home</button>').addClass('btn rounded-pill fw-bold ms-3 mt-2').css({ backgroundColor: '#2E6E8E', color: '#F2F8FC', border: 'none' });
  $header.after($homeButton);

  $homeButton.on('click', function () {
    $('.tweets').empty();
    addNewTweets(streams.home);
    lastCount = streams.home.length;
  });

  //position all-text on page
  $page.css('margin-top', '200px');

  const $tweetsDiv = $('<div class="tweets"></div>').css('margin-top', '120px');

  $page.append($tweetsDiv);

  //put this code into a function
  function addNewTweets(tweets) {
    const $tweets = tweets.map((tweet) => {
      const $tweet = $('<div class="tweet"></div>').css({ backgroundColor: '#D9EBF5', color: '#1A3040', border: '1px solid #8AACBE', padding: '10px', marginBottom: '5px' });
      //username needs to be in its own tag
      //swapping const text = `@${tweet.user}: ${tweet.message}`;
      //setting each class
      const $username = $('<span class="username">').text(tweet.user).css({ color: '#2E6E8E', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' });
      const $message = $('<span class="message">').text(tweet.message);
      const $timestamp = $('<span class="timestamp">').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));
      const $humanFriendlyTimestamp = $('<span class="humanFriendlyTimestamp">').text(moment(tweet.created_at).fromNow());

      const $tweetStructure = $('<p>').append($('<span>').text('@')).append($username).append($('<p>')).append($message).append(' - ').append($timestamp).append(' (').append($humanFriendlyTimestamp).append(')');

      //give the username it's click handler function inside here
      $tweet.append($tweetStructure);

      return $tweet;
    });

    $tweetsDiv.prepend($tweets);
  }

  //swapped input to default to homepage
  addNewTweets(streams.home);

  //allow users to write their own tweets, appending objects to page
  const $usernameInput = $('<textarea id="username-input">').css({ backgroundColor: '#D9EBF5', color: '#1A3040', border: '1px solid #8AACBE' });
  const $messageInput = $('<textarea id="message-input">').css(
    //style text box
    {width: '500px', height: '120px', marginTop: '20px', display: 'block', backgroundColor: '#D9EBF5', color: '#1A3040', border: '1px solid #8AACBE'});
    const $submit = $('<input type="submit">').css({ display: 'block', marginLeft: '430px', borderRadius: '50px', border: 'none', cursor: 'pointer', backgroundColor: '#2E6E8E', color: '#F2F8FC' });
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

  function loadNewTweets() {
    let newTweets = streams.home.slice(lastCount);
    newTweets.forEach(function (tweet) {
      const $tweet = $('<div class="tweet"></div>').css({ backgroundColor: '#D9EBF5', color: '#1A3040', border: '1px solid #8AACBE', padding: '10px', marginBottom: '5px' });
      const $username = $('<span class="username">').text(tweet.user).css({ color: '#2E6E8E', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' });
      const $message = $('<span class="message">').text(tweet.message);
      const $timestamp = $('<span class="timestamp">').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));
      const $humanFriendlyTimestamp = $('<span class="humanFriendlyTimestamp">').text(moment(tweet.created_at).fromNow());

      const $tweetStructure = $('<p>').append($('<span>').text('@')).append($username).append($('<p>')).append($message).append(' - ').append($timestamp).append(' (').append($humanFriendlyTimestamp).append(')');

      //give the username it's click handler function inside here
      $tweet.append($tweetStructure);

      if ($('.tweet').length > 10) {
        $('.tweet').last().remove();
      }

      $tweetsDiv.prepend($tweet);
    });
    lastCount = streams.home.length;
  }
//add refresh button; label: "New Tweet"; position: just above the tweets on left-hand side
  const $newTweetsButton = $('<button id="new-tweets-button">New Tweets</button>').css({ display: 'block', padding: '10px 30px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '1.5rem', backgroundColor: '#2E6E8E', color: '#F2F8FC' });
//position: just above the tweets
  $tweetsDiv.before($newTweetsButton);

  $newTweetsButton.on('click', loadNewTweets);

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
