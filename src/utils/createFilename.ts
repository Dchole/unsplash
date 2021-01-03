import slugify from "./slugify";

const createFilenameFromLabel = (label: string, filename: string) =>
  `${slugify(label)}.${filename.split(".").pop()}`;

export default createFilenameFromLabel;
