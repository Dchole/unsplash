const slugify = (label: string) => label.toLowerCase().split(" ").join("-");

export default slugify;
