export const Section = ({
  label,
  children,
  selector,
  changeSelector,
  favoritedCount,
  unfavoritedCount,
}) => {
  const selectors = [
    {
      name: "favorited",
      text: `favorited ( ${favoritedCount} )`,
      isActive: selector === "favorited",
    },
    {
      name: "unfavorited",
      text: `unfavorited ( ${unfavoritedCount} )`,
      isActive: selector === "unfavorited",
    },
    {
      name: "create-dog",
      text: "create dog",
      isActive: selector === "create-dog",
    },
  ];
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* Add the class 'active' to any selector in order to make it's color change */}
          {selectors.map((selector, index) => (
            <div
              key={index}
              className={`selector ${selector.isActive && "active"}`}
              onClick={() => changeSelector(selector.name)}
            >
              {selector.text}
            </div>
          ))}
        </div>
      </div>
      {children}
    </section>
  );
};
