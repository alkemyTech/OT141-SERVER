const isImageValid = (req, nameInput) => {
  if (!req.files?.[nameInput]) {
    return true;
  }

  if (!/(png|jpeg|jpg|webp|gif)/.test(req.files?.[nameInput].mimetype)) {
    throw new Error('Invalid image format ( valid:  .png .jpeg .jpg .webp .gif )');
  }
  return true;
};

module.exports = { isImageValid };
