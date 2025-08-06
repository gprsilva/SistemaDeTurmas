import './dashboard.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Componentes de exemplo - você pode substituir pelos seus componentes reais
const ListaTur = () => {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Curso') // Nome da sua tabela de turmas no Supabase
          .select('Id_curso,Nome,Id_professor,Id_aluno'); // Selecione as colunas que você precisa

        if (error) {
          throw error;
        }
        setTurmas(data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, []); // Array de dependências vazio para executar apenas na montagem

  if (loading) {
    return <div>Carregando turmas...</div>;
  }

  if (error) {
    return <div>Erro ao carregar turmas: {error}</div>;
  }

  if (turmas.length === 0) {
    return <div>Nenhuma turma encontrada.</div>;
  }

  return (
    <div>
      <h2 className='turmas'>Minhas Turmas</h2>
      {turmas.map((turma, index) => (
        <div key={index} className='dTur'>
          <p>{turma.Nome}</p>
          <button>Gerenciar</button>
          <button
              onClick={async () => {
                console.log(turma);
                if (window.confirm('Tem certeza que deseja excluir ${turma.Nome} de suas turmas ?')) {
                  const { error } = await supabase
                    .from('Curso')
                    .delete()
                    .eq('Id_curso', turma.Id_curso);

                  if (error) {
                    console.error('Erro ao excluir:', error.message);
                  } else {
                    console.log('Turma excluída!');
                  fetchTurmas();
      }
    }
  }}
>
  Excluir
</button>
        </div>
      ))}
    </div>
  );
};

const ListaAtv = () => (
  <div>
    <h2 className='atividades'>Lista de Atividades</h2>
  
  </div>
);

function Dashboard() {
  const [nomeProfessor, setNomeProfessor] = useState("");
  const [componenteAtivo, setComponenteAtivo] = useState('turmas'); // Estado para controlar qual componente mostrar

  useEffect(() => {
    const fetchProfessor = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Erro ao pegar usuário:", userError);
        return;
      }

      console.log("Usuário logado:", user);

      const { data, error } = await supabase
        .from("Professor")
        .select("Nome")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error("Erro ao buscar professor:", error);
      } else {
        console.log("Professor encontrado:", data);
        setNomeProfessor(data.Nome);
      }
    };

    fetchProfessor();
  }, []);

  const handleTurmasClick = () => {
    setComponenteAtivo('turmas');
  };

  const handleAtividadesClick = () => {
    setComponenteAtivo('atividades');
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Bem-vindo Prof° {nomeProfessor || "..."}</h1>
        <nav>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleTurmasClick(); }}
            style={{ 
              color: componenteAtivo === 'turmas' ? '#93c5fd' : 'white',
              fontWeight: componenteAtivo === 'turmas' ? 'bold' : '500'
            }}
          >
            Turmas
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleAtividadesClick(); }}
            style={{ 
              color: componenteAtivo === 'atividades' ? '#93c5fd' : 'white',
              fontWeight: componenteAtivo === 'atividades' ? 'bold' : '500'
            }}
          >
            Atividades
          </a>
        </nav>
      </div>
      
      <div className="content-area">
        {componenteAtivo === 'turmas' ? <ListaTur /> : <ListaAtv />}
      </div>
    </div>
  );
}

export default Dashboard;