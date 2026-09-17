/**
 * Small brass corner brackets that sit just outside a framed photo, like a
 * viewfinder mark. Must be a sibling of the (overflow-hidden) image
 * container, inside a plain `relative` wrapper — placing it inside the
 * clipped container would cut the marks off since they sit outside its
 * edges by design.
 */
export function FrameCorners() {
  const arm = "absolute h-5 w-5 border-brass";
  return (
    <>
      <span aria-hidden className={`${arm} -left-2 -top-2 border-l-2 border-t-2`} />
      <span aria-hidden className={`${arm} -right-2 -top-2 border-r-2 border-t-2`} />
      <span aria-hidden className={`${arm} -bottom-2 -left-2 border-b-2 border-l-2`} />
      <span aria-hidden className={`${arm} -bottom-2 -right-2 border-b-2 border-r-2`} />
    </>
  );
}
