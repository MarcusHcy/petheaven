// REUSABLE: shows a photo from the public/images folder.
// If the photo file isn't there yet it shows a friendly empty box that says
// exactly which file to add, so the page never looks broken while you collect pictures.
//
// props:
//   src      path inside public/, for example "images/pets/luna.jpg"
//   alt      describes the picture (important for screen readers)
//   ratio    shape of the box, "4 / 3" by default. Use null to fill the parent instead
//   hideIfMissing  true = show nothing at all when the file is missing (used for optional photos)
import { useState, useEffect } from "react";

export default function ImageSlot({ src, alt, ratio = "4 / 3", hideIfMissing = false, className = "" }) {
  const [failed, setFailed] = useState(false);

  // try again if a different picture is passed in
  useEffect(() => {
  setFailed(false);
}, [src]);

  if (failed && hideIfMissing) return null;

  return (
    <div
      className={`slot ${ratio ? "" : "slot-fill"} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {!failed ? (
        <img
          src={import.meta.env.BASE_URL + src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="slot-empty">
          <span aria-hidden="true">🐾</span>
          <strong>Photo goes here</strong>
          <small>public/{src}</small>
        </div>
      )}
    </div>
  );
}
