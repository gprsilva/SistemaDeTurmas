import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      console.log('Erro:', error.message);
      setErro('Email ou senha incorretos.');
    } else {
      navigate('/dashboard'); // redireciona para a tela principal
    }
  }

  return (
    <div className="login-container">
      <h2>Login do Professor</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </div>
  );
}

export default Login;
