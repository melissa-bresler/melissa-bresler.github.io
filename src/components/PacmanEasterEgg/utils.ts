export function getPointOnPath(path: SVGPathElement, length: number) {
  return path.getPointAtLength(length);
}

export function toScreenPoint(path: SVGPathElement, x: number, y: number) {
  const svgPoint = path.ownerSVGElement?.createSVGPoint();
  const screenCTM = path.getScreenCTM();

  if (!svgPoint || !screenCTM) return null;

  svgPoint.x = x;
  svgPoint.y = y;

  return svgPoint.matrixTransform(screenCTM);
}

export function calculateDistance(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
