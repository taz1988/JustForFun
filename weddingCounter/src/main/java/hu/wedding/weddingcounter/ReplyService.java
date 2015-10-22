package hu.wedding.weddingcounter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

/**
 * Generate reply responses for the tweets.
 * @author Zoltan Kornel Torok, taz19880922@gmail.com.
 */
@Component
public class ReplyService {

    @Autowired
    private TextService textService;
    private TwitterFactory factory;

    public ReplyService() {
        ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.setDebugEnabled(true)
                .setOAuthConsumerKey(System.getenv("CONSUMER_KEY"))
                .setOAuthConsumerSecret(System.getenv("CONSUMER_SECRET"))
                .setOAuthAccessToken(System.getenv("ACCESS_TOKEN"))
                .setOAuthAccessTokenSecret(System.getenv("ACCESS_TOKEN_SECRET"));
        factory = new TwitterFactory(configurationBuilder.build());
    }

    public void replyForTweet(String tweet) {
        try {
            Twitter twitter = factory.getInstance();
            Status questionTweet = TwitterObjectFactory.createStatus(tweet);
            StatusUpdate reply = null;
            for (HashtagEntity hashTag : questionTweet.getHashtagEntities()) {
                if (hashTag.getText().contains("howmanydaysforwedding")) {
                    reply = new StatusUpdate(textService.getEnglishText());
                    break;
                } else if (hashTag.getText().contains("hanynapazeskuvoig")) {
                    reply = new StatusUpdate(textService.getHungarianText());
                    break;
                }
            }
            if (reply != null) {
                reply.setInReplyToStatusId(questionTweet.getInReplyToStatusId());

                Status status = twitter.updateStatus(reply);
                System.out.println("Successfully updated the status to [" + status.getText() + "].");
            }
        } catch (TwitterException te) {
            te.printStackTrace();
        }
    }

}
