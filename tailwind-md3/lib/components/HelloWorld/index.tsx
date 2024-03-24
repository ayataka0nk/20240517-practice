export const HelloWorld = () => {
  const style = getStyle();
  return <div className={style}>Hello World</div>;
};
const getStyle = () => {
  const styles = ["text-red-500", "bg-surface"];
  return styles.join(" ");
};
