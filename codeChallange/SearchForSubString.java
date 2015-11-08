/**
*   @author Zoltan Kornel Torok, taz19880922@gmail.com
*   Try to find the shortest indexOf implemantation without use indexOf, search or regexp.
*   More info: https://dzone.com/articles/code-challenge-series-1
*/
public class SearchForSubString {

    public static String TEXT = "thisissomefoundmetestStringfoundmeblablablablaketto";
    public static String SUB_TEXT = "foundme";

    public int findSubString(String text, String subText) {
       for (int i = 0, j = 0; i < text.length() - subText.length() + 1; i++, j=0)
            while (text.charAt(i + j) == subText.charAt(j))
                if (j + 1 == subText.length())
                    return i;
                else
                    j++;
       return -1; 
    }

    public static int f(String t, String s) {
        for(int i=0,j=0; i<t.length()-s.length()+1; i++,j=0) while(t.charAt(i+j)==s.charAt(j))if(j+1==s.length())return i;else j++;return -1;
    } 

    public static void main(String[] args) {
        System.out.println("The " + SUB_TEXT + " first occurence: " + SearchForSubString.f(TEXT, "ketto"));
    }
}
