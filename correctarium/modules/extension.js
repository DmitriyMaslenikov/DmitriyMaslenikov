const extension = (ext) => {
  switch (ext) {
    case 'rtf':
      return 1;
      break;
    case 'doc':
      return 1;
      break;
    case 'docx':
      return 1;
      break;
    default:
      return 1.2;
  }
};

exports.extension = extension;
