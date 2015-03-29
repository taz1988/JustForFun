/**
 * Percolation implementation.
 *
 * @author Zoltán Kornél Török
 */
public class Percolation {

    private WeightedQuickUnionUF quickFindUF;
    private boolean[] isOpen;
    private int N;

    /**
     * .
     *
     * @param N N.
     */
    public Percolation(final int N) {
        quickFindUF = new WeightedQuickUnionUF(N * N);
        if (N < 1) {
            throw new IllegalArgumentException();
        }
        isOpen = new boolean[N * N];
        this.N = N;
    }

    /**
     * .
     *
     * @param i
     * @param j
     */
    public void open(final int i, final int j) {
        checkInput(i, j);
        if (!isOpen(i, j)) {
            isOpen[((i - 1) * N) + (j - 1)] = true;
            unionNeighbour(i, j, i + 1, j);
            unionNeighbour(i, j, i - 1, j);
            unionNeighbour(i, j, i, j + 1);
            unionNeighbour(i, j, i, j - 1);
        }
    }

    /**
     * is site (row i, column j) open?
     *
     * @param i
     * @param j
     * @return
     */
    public boolean isOpen(final int i, final int j) {
        checkInput(i, j);
        return isOpen[((i - 1) * N) + (j - 1)];
    }

    /**
     * is site (row i, column j) full?
     *
     * @param i
     * @param j
     * @return
     */
    public boolean isFull(final int i, final int j) {
        checkInput(i, j);
        boolean full = false;
        if (isOpen(i, j)) {
            if (i - 1 != 0) {
                for (int row = 0; row < N - 1; row++) {
                    full = quickFindUF.connected(((i - 1) * N) + (j - 1), row);
                    if (full) {
                        break;
                    }
                }
            } else {
                full = true;
            }
        }
        return full;
    }

    /**
     * does the system percolate?
     *
     * @return
     */
    public boolean percolates() {
        boolean percolate = false;
        for (int i = 1; i < N; i++) {
            if (isOpen(N, i)) {
                for (int j = 1; j < N; j++) {
                    if (isOpen(1, j)) {
                        percolate = quickFindUF.connected(N * (N - 1) + (i - 1), (j - 1));
                        if (percolate) {
                            break;
                        }
                    }
                }
                if (percolate) {
                    break;
                }
            }
        }
        return percolate;
    }

    // test client (optional)
    public static void main(String[] args) {
        Percolation percolation;

    }

    private void checkInput(final int i, final int j) {
        if (i < 1 || j < 1 || i > N || j > N) {
            throw new ArrayIndexOutOfBoundsException();
        }
    }

    private void unionNeighbour(final int i, final int j, final int i2, final int j2) {
        if (i2 > 0 && i2 <= N && j2 <= N && j2 > 0 && isOpen(i2, j2)) {
            quickFindUF.union(((i - 1) * N) + (j - 1), ((i2 - 1) * N) + (j2 - 1));
        }
    }
}
