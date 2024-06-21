export default function Background({ className, src, width, height, index }) {
  return (
    <>
      <img
        className={className}
        src={src}
        alt={`bg-image-${index}`}
        width={width}
        height={height}
      />
    </>
  );
}
