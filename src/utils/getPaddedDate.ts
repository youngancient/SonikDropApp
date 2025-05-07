export function formatToDDMMYYYY(date: Date): string {
    // Get the month (0-indexed), add 1 to make it 1-indexed
    const month = date.getMonth() + 1;
    // Get the day of the month
    const day = date.getDate();
    // Get the full year
    const year = date.getFullYear();
  
    // Pad month and day with a leading zero if less than 10
    // Using String().padStart(2, '0') is a clean way to do this
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
  
    // Combine the padded components with dots
    return `${paddedDay}.${paddedMonth}.${year}`;
  }