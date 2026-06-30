import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const livroService = {
  listar: async () => {
    const resposta = await axios.get(API_URL);
    return resposta.data;
  },

  cadastrar: async (livro) => {
    const resposta = await axios.post(API_URL, livro);
    return resposta.data;
  },

  excluir: async (id) => {
    const resposta = await axios.delete(`${API_URL}/${id}`);
    return resposta.data;
  }
};