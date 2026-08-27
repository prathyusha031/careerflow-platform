export function formatSalary(min?: number, max?: number): string {
  if (min == null && max == null) {
    return 'Not specified';
  }

  const format = (n: number) => `₹${(n / 100000).toFixed(1)}L`;

  if (min != null && max != null) {
    return `${format(min)} - ${format(max)}/year`;
  }

  if (min != null) {
    return `From ${format(min)}/year`;
  }

  return `Up to ${format(max!)}/year`;
}