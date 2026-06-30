"use client"; 

import { useState } from 'react';
import { livroService } from '../api/livroService';

function FormularioLivro({ aoCadastrarSucesso }) {
  const [titulo, setTitulo] = useState('');
  const [paginas, setPaginas] = useState('');

  const lidarComEnvio = async (e) => {
    e.preventDefault();

    if (!titulo || !paginas) {
      return alert("Por favor, preencha o título e a quantidade de páginas!");
    }

    const novoLivro = {
      titulo: titulo,
      paginas: parseInt(paginas, 10) // Converte string para número inteiro
    };

    try {
      await livroService.cadastrar(novoLivro);
      setTitulo('');
      setPaginas('');
      alert("Livro cadastrado com sucesso!");
      
      // Executa a função recebida por parâmetro para voltar à tela de listagem
      aoCadastrarSucesso(); 
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      alert("Erro ao cadastrar o livro.");
    }
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#333' }}>
      <h3>Inserir Novo Livro</h3>
      <form onSubmit={lidarComEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título:</label>
          <input 
            type="text" 
            placeholder="Ex: O Senhor dos Anéis" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantidade de Páginas:</label>
          <input 
            type="number" 
            placeholder="Ex: 1200" 
            value={paginas} 
            onChange={(e) => setPaginas(e.target.value)} 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Salvar Livro
        </button>
      </form>
    </div>
  );
}

export default FormularioLivro;