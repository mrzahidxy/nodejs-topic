export const cpuIntensiveTask = (limit: number) => {
  let fibonacciResults: number[] = [];

  // Fibonacci function: A naive recursive implementation (O(2^n) time complexity)
  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // Perform Fibonacci calculation for numbers up to the limit
  for (let i = 2; i <= limit; i++) {
    // Calculate Fibonacci number for each value of i (This will get CPU-intensive as i increases)
    const result = fibonacci(i);
    
    // Optionally log or store the results if necessary (but we focus on the computational load)
    fibonacciResults.push(result);
  }

  return fibonacciResults;
};
