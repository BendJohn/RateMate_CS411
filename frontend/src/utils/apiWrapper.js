const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getAllProfessors = () => {
    return instance.get('professors').then(
      res => res.data,
      err => {
        console.error(err);
        return null;
      },
    );
  };