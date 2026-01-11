export const SearchField = (props) => {
  return (
    <input
      {...props}
      type="text"
      placeholder="Search..."
      className="
        px-3 py-2
        w-full md:w-64
        rounded-lg
        bg-white/15
        outline-none
        focus:ring-2 focus:ring-indigo-500
      "
    />
  );
};


export const SearchButton = ({children, ...props}) => {
  return (
    <button
      {...props}
      type="button"
      className="
        px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700
      "
    >
        {children}
    </button>
  );
};


