const Button = ({ type, title, styles, handleButton }) => {
  const fakeHandler = () => {};

  return (
    <button
      onClick={handleButton || fakeHandler}
      type={type || "button"}
      className={styles || ""}
    >
      {title}
    </button>
  );
};

export default Button;
