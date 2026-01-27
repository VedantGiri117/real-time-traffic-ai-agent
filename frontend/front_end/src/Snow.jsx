import "./snow.css";

function Snow() {
  const flakes = Array.from({ length: 30 });

  return (
    <>
      {flakes.map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: Math.random() * 100 + "vw",
            animationDuration: 5 + Math.random() * 10 + "s",
            fontSize: 10 + Math.random() * 20 + "px",
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
}

export default Snow;
