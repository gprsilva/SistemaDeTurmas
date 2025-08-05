import './dashboard.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';


function Dashboard() {
  const [nomeProfessor, setNomeProfessor] = useState("");

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
        setNomeProfessor(data.Nome); // <- corrigido para Nome com N maiúsculo
      }
    };

    fetchProfessor();
  }, []);

  return (
    <div className="header">
      <h1>Bem-vindo Prof° {nomeProfessor || "..."}</h1>
      <nav>
        <a href="#">Turmas</a>
        <a href="#">Atividades</a>
      </nav>
    </div>
  );
}

export default Dashboard;
