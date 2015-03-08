import java.lang.ArrayIndexOutOfBoundsException;
import java.lang.IllegalArgumentException;
import java.lang.Override;

public class Percolation extends QuickFindUF {

    private boolean[] isOpen;
    private int N;
    // create N-by-N grid, with all sites blocked
    public Percolation(int N) {
        super(N);
        if (N < 1) {
            throw new IllegalArgumentException();
        }
        isOpen = new boolean[N*N];
        this.N = N;
    }

    // open site (row i, column j) if it is not open already
    public void open(int i, int j) {
        checkInput(i, j);
        if (!isOpen(i, j)) {
            isOpen[(i - 1) + (j - 1)] = true;
            unionNeighbour(i, j, i + 1, j);
            unionNeighbour(i, j, i - 1, j);
            unionNeighbour(i, j, i, j + 1);
            unionNeighbour(i, j, i, j - 1);
        }
    }

    // is site (row i, column j) open?
    public boolean isOpen(int i, int j) {
        checkInput(i, j);
        return isOpen[(i - 1) + (j - 1)];
    }

    // is site (row i, column j) full?
    public boolean isFull(int i, int j) {
        checkInput(i, j);
        boolean full = false;
        if (isOpen(i, j)) {
            boolean[] openColumns = new boolean[N];
            for (int row = 0; row < N - 1; row++) {
                for (int column = 0; column < N - 1; column++) {
                    if (connected((row + column), (i - 1) + (j - 1))) {
                        openColumns [column] = true;
                    }
                }
            }
            full = true;
            for (int row = 0; row < openColumns.length; row++) {
                if (!openColumns[row]) {
                    full = false;
                }
            }
        }
        return full;
    }

    // does the system percolate?
    public boolean percolates() {
        boolean percolate = false;
        for (int row = 1; row < N; row++) {
            for (int column = 1; column < N; column++) {
                if (isOpen(row, column)) {
                    percolate = isFull(row, column);
                    if (percolate) {
                        break;
                    }
                }
            }
        }
        return percolate;
    }

    // test client (optional)
    public static void main(String[] args) {
        Percolation percolation;

    }

    private void checkInput(int i, int j) {
        if (i < 1 || j < 1 || i > N || j > N) {
            throw new ArrayIndexOutOfBoundsException();
        }
    }

    private void unionNeighbour(int i, int j, int i2, int j2) {
        if (i2 > 0 && i2 < N && j2 < N && j2 > 0 && isOpen(i2, j2)) {
            union((i - 1) + (j - 1), i2 + (j2 - 1));
        }
    }
}