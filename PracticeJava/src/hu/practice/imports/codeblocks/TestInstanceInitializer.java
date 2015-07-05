package hu.practice.imports.codeblocks;

/**
 * Test instance initializer
 * @author Zoltan Kornel Torok, taz19880922@gmail.com.
 */
public class TestInstanceInitializer {
    {
        System.out.println("So this will run first always, when create a new object");
    }
    private int a;
    public TestInstanceInitializer(int a) {
        this.a = a;
        System.out.println(this.a);
    }

    public static void main(String[] args) {
        TestInstanceInitializer testInstanceInitializer = new TestInstanceInitializer(1);
    }
}
