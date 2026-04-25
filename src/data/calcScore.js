export function calcScore({ taste, ratio, quality, diversity, service }) {
  return (
    taste     * 0.25 +
    ratio     * 0.25 +
    quality   * 0.20 +
    diversity * 0.15 +
    service   * 0.15
  );
}
