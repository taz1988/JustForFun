package hu.wedding.weddingcounter;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Generate a string which will be displayed on the picture and in the twitter text.
 * @author Zoltan Kornel Torok, taz19880922@gmail.com.
 */
@Component
public class TextService {

    private static Date WEDDING_DATE = new Date(1445724000000L);

    public String getEnglishText() {
        Long days = getDaysUntilWedding();
        return days + " days until the wedding!";
    }

    public String getHungarianText() {
        Long days = getDaysUntilWedding();
        return days + " nap már csak az esküvőig!";
    }

    private Long getDaysUntilWedding() {
        Date currentDate = new Date();
        return TimeUnit.MILLISECONDS.toDays(WEDDING_DATE.getTime() - currentDate.getTime());
    }
}
