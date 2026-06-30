"use client";

import { useState } from 'react';
import FormularioLivro from '../componentes/FormularioLivro';
import ListaLivros from '../componentes/ListaLivros';

export default function Home() {
  const [menuAtivo, setMenuAtivo] = useState('listar');

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>📚 Sistema de Livros</h2>

      {/* --- MENUS / ABAS --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <button 
          onClick={() => setMenuAtivo('listar')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: menuAtivo === 'listar' ? '#007BFF' : '#f0f0f0',
            color: menuAtivo === 'listar' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          📋 Listar Livros
        </button>
        
        <button 
          onClick={() => setMenuAtivo('cadastrar')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: menuAtivo === 'cadastrar' ? '#28a745' : '#f0f0f0',
            color: menuAtivo === 'cadastrar' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          ➕ Inserir Novo Livro
        </button>
      </div>

      {/* --- CONTEÚDO DINÂMICO --- */}
      {menuAtivo === 'cadastrar' && (
        <FormularioLivro aoCadastrarSucesso={() => setMenuAtivo('listar')} />
      )}

      {menuAtivo === 'listar' && (
        <ListaLivros />
      )}
    </div>
  );
}