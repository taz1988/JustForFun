/**
 * @author Zoltán Kornél Török
 */
public class PercolationStats {

    private double[] result;

    // perform T independent experiments on an N-by-N grid
    public PercolationStats(int N, int T) {
        if (N < 0 || T < 0) {
            throw new IllegalArgumentException();
        }
        result = new double[T];
        for (int i = 0; i < T; i++) {
            result[i] = runTest(N);
        }
    }

    // sample mean of percolation threshold
    public double mean() {
        return StdStats.mean(result);
    }

    // sample standard deviation of percolation threshold
    public double stddev() {
        return StdStats.stddev(result);
    }

    // low  endpoint of 95% confidence interval
    public double confidenceLo() {
        double mean = mean();
        double deviation = stddev();
        return mean - ((1.96 * deviation) / Math.sqrt(result.length));
    }

    // high endpoint of 95% confidence interval
    public double confidenceHi() {
        double mean = mean();
        double deviation = stddev();
        return mean + ((1.96 * deviation) / Math.sqrt(result.length));
    }

    // test client (described below)
    public static void main(String[] args) {
        PercolationStats stats = new PercolationStats(Integer.parseInt(args[0]), Integer.parseInt(args[0]));
        System.out.println("mean = " + stats.mean());
        System.out.println("stddev = " + stats.stddev());
        System.out.println("mean = " + stats.confidenceLo() + "  " + stats.confidenceHi());
    }

    private double runTest(int N) {
        Percolation percolation = new Percolation(N);
        int openSiteCount = 0;
        int row;
        int column;
        while (!percolation.percolates()) {
            row = StdRandom.uniform(1, N + 1);
            column = StdRandom.uniform(1, N + 1);
            while (percolation.isOpen(row, column)) {
                row = StdRandom.uniform(1, N + 1);
                column = StdRandom.uniform(1, N + 1);
            }
            openSiteCount++;
            percolation.open(row, column);
        }
        return openSiteCount / (double) (N * N);
    }
}
