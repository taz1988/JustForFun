package hu.wedding.weddingcounter;

import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.BasicClient;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import static com.google.common.collect.Lists.newArrayList;

/**
 * This class job is to Listen tweets, which has #hanynapazeskuvoig and #howmanydaysforwedding hashtag.
 * If get one, than generate a picture and send a tweet about how many day until my wedding.
 *
 * @author Zoltan Kornel Torok, taz19880922@gmail.com.
 */
@Component
public class TwitterSiteStreamListener implements InitializingBean {

    BlockingQueue<String> tweets;
    private BasicClient client;
    @Autowired
    private ReplyService replyService;


    public void afterPropertiesSet() throws Exception {
        listenStream();
    }

    private void listenStream() {
        connectTwitter();
        // on a different thread, or multiple different threads....
        while (!client.isDone()) {
            String msg = null;
            try {
                System.out.println("Start to waiting for messages...");
                msg = tweets.take();
                //msg = tweets.poll(5, TimeUnit.SECONDS);
                replyService.replyForTweet(msg);
            } catch (InterruptedException e) {
                e.printStackTrace();
                System.out.println(e);
            }
            System.out.println(msg);
        }
        client.stop();
        System.out.println("Finished");
    }

    private void connectTwitter() {
        tweets = new LinkedBlockingQueue<String>(100000);
        System.out.println("try to connect");
        Authentication openAuth = new OAuth1(System.getenv("CONSUMER_KEY"), System.getenv("CONSUMER_SECRET"), System.getenv("ACCESS_TOKEN"), System.getenv("ACCESS_TOKEN_SECRET"));
        System.out.println(System.getenv("CONSUMER_KEY"));
        System.out.println(System.getenv("CONSUMER_SECRET"));
        System.out.println(System.getenv("ACCESS_TOKEN"));
        System.out.println(System.getenv("ACCESS_TOKEN"));
        ClientBuilder builder = new ClientBuilder()
                .name("weddingCount")
                .hosts(Constants.STREAM_HOST)
                .authentication(openAuth)
                //.endpoint(new StatusesSampleEndpoint())
                .endpoint((new StatusesFilterEndpoint()).trackTerms(newArrayList("hanynapazeskuvoig", "howmanydaysforwedding")))
                .processor(new StringDelimitedProcessor(tweets));

        client = builder.build();
// Attempts to establish a connection.
        client.connect();
        System.out.println("connected");
    }


}
