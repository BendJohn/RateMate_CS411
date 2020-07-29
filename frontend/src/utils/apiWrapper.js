const axios = require('axios');

const BASE_URL = 'http://localhost:5000/';
const instance = axios.create({
  baseURL: BASE_URL,
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

export const deleteProfessor = (professor_name) => {
  return instance.delete(`professors/${professor_name}`).then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const createProfessor = (name, rating) => {
  const requestString = `${BASE_URL}professors`;
  console.log(requestString);
  return axios
    .post(requestString, {
      headers: {
        "Content-Type": "application/json"
      },
      professor_name: name,
      avg_rating: rating
    })
    .catch(error => {
      return {
        type: "FAILED TO CREATE PROFESSOR",
        error
      };
    });
};

export const editProfessor = (name, rating) => {
  const requestString = `${BASE_URL}professors/${name}`;
  return axios
    .put(requestString, {
      headers: {
        "Content-Type": "application/json"
      },
      avg_rating: rating
    })
    .catch(error => {
      return {
        type: "FAILED TO EDIT PROFESSOR",
        error
      };
    });
};

export const getProfessorByName = (professorName) => {
    return instance.get(`professors/${professorName}`).then(
      res => res.data,
      err => {
        console.error(err);
        return null;
      },
    );
  };
