export const EmbeddedPlayer = () => {
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/track/0wshkEEcJUQU33RSRBb5dv?utm_source=generator&theme=0"
      width="352px"
      height="352px"
      frameBorder="0"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};
