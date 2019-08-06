import { createContext } from 'react';

const biographyDefaultContext = {
  value: false,
  changeValue(value) {
    this.value = value;
  },
};

export default createContext(biographyDefaultContext);
