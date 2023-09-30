const FormField = (props) => {
  const { placeholder, formValue, handleChange, type, inputLabel } = props;
  const { isTextArea, optional, focusOn } = props;
  const { name, inputStyles } = props;

  return (
    <div className="flex flex-col gap-3 w-full">
      {inputLabel && (
        <label>
          {inputLabel}{" "}
          {optional && (
            <span className="text-purple-500 text-xs">{`*(Optional)*`}</span>
          )}
        </label>
      )}
      {isTextArea ? (
        <textarea
          name={name || ""}
          value={formValue}
          onChange={handleChange}
          className={inputStyles}
          placeholder={placeholder}
        />
      ) : (
        <input
          name={name || ""}
          autoFocus={focusOn ? true : false}
          value={formValue}
          onChange={handleChange}
          type={type || "text"}
          className={inputStyles}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
