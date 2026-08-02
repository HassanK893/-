function DevBanner() {
  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor: "rgba(255, 0, 0, 0.8)",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "12px",
      zIndex: 9999,
      color: "white",
    }}>
      <h3>Сайт в разработке</h3>
      <p>Сайт находится в процессе доработки и несет демонстративный характер.</p>
    </div>
  );
}

export default DevBanner;
