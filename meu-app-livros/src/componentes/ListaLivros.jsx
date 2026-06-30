"use client";

import { useState, useEffect } from 'react';
import { livroService } from '../api/livroService';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const buscarDados = async () => {
    try {
      setCarregando(true);
      const dados = await livroService.listar();
      setLivros(dados);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setCarregando(false);
    }
  };

  // Carrega os dados assim que o componente é montado na tela
  useEffect(() => {
    buscarDados();
  }, []);

  const lidarComExclusao = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      try {
        await livroService.excluir(id);
        buscarDados(); // Recarrega a lista do servidor após excluir
      } catch (error) {
        console.error("Erro ao excluir livro:", error);
        alert("Não foi possível excluir o livro.");
      }
    }
  };

  if (carregando) return <p style={{ color: '#666' }}>Carregando livros...</p>;

  return (
    <div style={{ color: '#333' }}>
      <h3>Livros Registrados</h3>
      {livros.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhum livro cadastrado ou encontrado na API.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {livros.map((livro) => (
            <li 
              key={livro._id} 
              style={{ 
                padding: '15px', 
                border: '1px solid #eee',
                borderRadius: '6px',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: '#fff',
                marginBottom: '10px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#222' }}>{livro.titulo}</h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#555' }}>📖 Páginas: {livro.paginas}</p>
                <small style={{ color: '#aaa', fontSize: '11px' }}>ID: {livro._id}</small>
              </div>
              
              <button 
                onClick={() => lidarComExclusao(livro._id)} 
                style={{ 
                  padding: '8px 16px', 
                  background: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaLivros;