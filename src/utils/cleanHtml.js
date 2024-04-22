const stripHtml = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
export default stripHtml;
