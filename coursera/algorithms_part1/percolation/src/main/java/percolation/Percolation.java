package percolation;

public class Percolation {

    private QuickFindUF uf;
    private boolean[] isOpen;
    // create N-by-N grid, with all sites blocked
    public Percolation(int N) {
        uf = new QuickFindUF(N*N);
        isOpen = new boolean[N*N];
    }
    public void open(int i, int j)          // open site (row i, column j) if it is not open already
    public boolean isOpen(int i, int j)     // is site (row i, column j) open?
    public boolean isFull(int i, int j)     // is site (row i, column j) full?
    public boolean percolates()             // does the system percolate?

    public static void main(String[] args) {}   // test client (optional)
}