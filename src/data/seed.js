// Dados de exemplo (fictícios). Ficam salvos no localStorage do navegador
// e podem ser restaurados em Configurações > "Restaurar dados de exemplo".

export const DISCIPLINAS = ['Matemática', 'Português', 'Ciências', 'História'];
export const TURMAS = ['7º A', '7º C', '8º A', '8º B', '8º C', '9º A', '9º B', '9º C'];

export const users = [
  { id: 'u1', nome: 'João Silva', email: 'gestor@escola.edu.br', senha: '123456', perfil: 'gestor', ativo: true, criadoEm: '2026-02-01' },
  { id: 'u2', nome: 'Mariana Lopes', email: 'professor@escola.edu.br', senha: '123456', perfil: 'professor', ativo: true, criadoEm: '2026-02-03' },
  { id: 'u3', nome: 'Ricardo Moura', email: 'ricardo.moura@escola.edu.br', senha: '123456', perfil: 'professor', ativo: true, criadoEm: '2026-02-10' },
  { id: 'u4', nome: 'Fernanda Dias', email: 'fernanda.dias@escola.edu.br', senha: '123456', perfil: 'gestor', ativo: false, criadoEm: '2026-03-15' },
];

const mat = (id, titulo, tipo, duracao, disciplina, concluido = false) => ({ id, titulo, tipo, duracao, disciplina, concluido });

export const students = [
  {
    id: 'a1', nome: 'Ana Beatriz Costa', turma: '9º A', turno: 'Manhã', matricula: '2024.0847',
    nascimento: '2010-03-12', responsavel: 'Maria Costa', score: 82, emTutoria: true, atualizadoEm: '2026-06-14',
    notas: { 'Matemática': [5.8, 6.4, 6.2, 5.2], 'Português': [7.2, 7.9, 6.8, 6.6], 'Ciências': [8.6, 7.9, 7.8, 8.2], 'História': [6.9, 6.2, 5.9, 5.6] },
    comportamento: { frequencia: 72, faltas: 18, atrasos: 9, ocorrencias: 3, participacao: 'Baixa', entregasAtrasadas: 6 },
    socio: { renda: 'Até 1 salário mínimo', moradores: 5, transporte: 'Ônibus (2 conduções)', distancia: '14 km', internet: 'Apenas celular (dados móveis)', trabalha: 'Sim, cuida dos irmãos à tarde', beneficio: 'Bolsa Família' },
    lacunas: [
      { disciplina: 'Matemática', topico: 'Frações e Decimais', nivel: 'CRÍTICA' },
      { disciplina: 'Português', topico: 'Interpretação de Texto', nivel: 'ALTA' },
      { disciplina: 'Ciências', topico: 'Ecossistemas', nivel: 'MÉDIA' },
      { disciplina: 'História', topico: 'Brasil República', nivel: 'BAIXA' },
    ],
    materiais: [
      mat('m1', 'Frações: conceitos básicos', 'Vídeo', 12, 'Matemática', true),
      mat('m2', 'Apostila Interpretação de Texto', 'Apostila', 45, 'Português', true),
      mat('m3', 'Lista de Exercícios - Frações', 'Exercício', 20, 'Matemática'),
      mat('m4', 'Ecossistemas Brasileiros', 'Vídeo', 18, 'Ciências'),
      mat('m5', 'Quiz Interpretação Nível 1', 'Exercício', 15, 'Português'),
    ],
    progresso: { 'Matemática': 25, 'Português': 40, 'Ciências': 60, 'História': 72 },
  },
  {
    id: 'a2', nome: 'Carlos Eduardo Lima', turma: '8º B', turno: 'Tarde', matricula: '2024.0512',
    nascimento: '2011-07-22', responsavel: 'Paulo Lima', score: 76, emTutoria: true, atualizadoEm: '2026-06-13',
    notas: { 'Matemática': [6.0, 5.5, 5.1, 4.8], 'Português': [6.5, 6.0, 5.8, 5.5], 'Ciências': [7.0, 6.8, 6.1, 6.0], 'História': [7.5, 7.0, 6.6, 6.2] },
    comportamento: { frequencia: 78, faltas: 14, atrasos: 4, ocorrencias: 1, participacao: 'Média', entregasAtrasadas: 3 },
    socio: { renda: '1 a 2 salários mínimos', moradores: 4, transporte: 'A pé', distancia: '2 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [
      { disciplina: 'Matemática', topico: 'Equações do 1º grau', nivel: 'ALTA' },
      { disciplina: 'Português', topico: 'Ortografia', nivel: 'MÉDIA' },
      { disciplina: 'Ciências', topico: 'Corpo Humano', nivel: 'MÉDIA' },
      { disciplina: 'História', topico: 'Brasil Colônia', nivel: 'BAIXA' },
    ],
    materiais: [
      mat('m1', 'Equações: passo a passo', 'Vídeo', 15, 'Matemática'),
      mat('m2', 'Exercícios de Ortografia', 'Exercício', 20, 'Português', true),
      mat('m3', 'Sistemas do Corpo Humano', 'Vídeo', 22, 'Ciências'),
    ],
    progresso: { 'Matemática': 20, 'Português': 45, 'Ciências': 35, 'História': 60 },
  },
  {
    id: 'a3', nome: 'Maria Santos', turma: '7º C', turno: 'Manhã', matricula: '2025.0133',
    nascimento: '2012-01-30', responsavel: 'Joana Santos', score: 65, emTutoria: false, atualizadoEm: '2026-06-12',
    notas: { 'Matemática': [8.1, 7.6, 5.4, 5.6], 'Português': [7.8, 7.5, 7.2, 7.0], 'Ciências': [7.0, 7.2, 6.9, 6.8], 'História': [8.0, 7.7, 7.5, 7.1] },
    comportamento: { frequencia: 88, faltas: 7, atrasos: 2, ocorrencias: 0, participacao: 'Média', entregasAtrasadas: 2 },
    socio: { renda: '1 a 2 salários mínimos', moradores: 3, transporte: 'Transporte escolar', distancia: '6 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [{ disciplina: 'Matemática', topico: 'Potenciação', nivel: 'ALTA' }],
    materiais: [mat('m1', 'Potências e raízes', 'Vídeo', 14, 'Matemática')],
    progresso: { 'Matemática': 30, 'Português': 70, 'Ciências': 65, 'História': 75 },
  },
  {
    id: 'a4', nome: 'Pedro Alves', turma: '9º B', turno: 'Tarde', matricula: '2023.0981',
    nascimento: '2010-09-05', responsavel: 'Sandra Alves', score: 61, emTutoria: false, atualizadoEm: '2026-06-11',
    notas: { 'Matemática': [6.8, 6.5, 6.6, 6.0], 'Português': [6.2, 6.0, 6.1, 5.9], 'Ciências': [7.1, 6.9, 6.5, 6.3], 'História': [6.6, 6.4, 6.0, 6.1] },
    comportamento: { frequencia: 84, faltas: 9, atrasos: 6, ocorrencias: 1, participacao: 'Baixa', entregasAtrasadas: 4 },
    socio: { renda: '2 a 3 salários mínimos', moradores: 4, transporte: 'Bicicleta', distancia: '4 km', internet: 'Banda larga', trabalha: 'Sim, meio período', beneficio: 'Nenhum' },
    lacunas: [{ disciplina: 'Português', topico: 'Produção textual', nivel: 'MÉDIA' }],
    materiais: [mat('m1', 'Como estruturar uma redação', 'Apostila', 30, 'Português')],
    progresso: { 'Matemática': 55, 'Português': 40, 'Ciências': 60, 'História': 58 },
  },
  {
    id: 'a5', nome: 'Julia Fernandes', turma: '8º A', turno: 'Manhã', matricula: '2024.0233',
    nascimento: '2011-04-18', responsavel: 'Roberto Fernandes', score: 54, emTutoria: false, atualizadoEm: '2026-06-10',
    notas: { 'Matemática': [7.0, 7.2, 6.9, 6.8], 'Português': [7.5, 7.1, 7.0, 6.9], 'Ciências': [6.8, 6.5, 6.6, 6.4], 'História': [7.2, 7.0, 6.8, 6.9] },
    comportamento: { frequencia: 90, faltas: 5, atrasos: 3, ocorrencias: 0, participacao: 'Média', entregasAtrasadas: 1 },
    socio: { renda: '2 a 3 salários mínimos', moradores: 3, transporte: 'Carro da família', distancia: '5 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [], materiais: [],
    progresso: { 'Matemática': 70, 'Português': 72, 'Ciências': 66, 'História': 70 },
  },
  {
    id: 'a6', nome: 'Juliana Ferreira', turma: '8º A', turno: 'Manhã', matricula: '2024.0288',
    nascimento: '2011-11-02', responsavel: 'Cláudia Ferreira', score: 71, emTutoria: true, atualizadoEm: '2026-06-10',
    notas: { 'Matemática': [5.5, 5.0, 4.6, 4.8], 'Português': [5.8, 5.2, 4.9, 5.1], 'Ciências': [6.0, 5.5, 4.7, 5.0], 'História': [6.8, 6.5, 6.2, 6.0] },
    comportamento: { frequencia: 82, faltas: 11, atrasos: 5, ocorrencias: 2, participacao: 'Baixa', entregasAtrasadas: 5 },
    socio: { renda: 'Até 1 salário mínimo', moradores: 6, transporte: 'Ônibus', distancia: '9 km', internet: 'Apenas celular (dados móveis)', trabalha: 'Não', beneficio: 'Bolsa Família' },
    lacunas: [
      { disciplina: 'Matemática', topico: 'Porcentagem', nivel: 'CRÍTICA' },
      { disciplina: 'Ciências', topico: 'Química básica', nivel: 'ALTA' },
    ],
    materiais: [
      mat('m1', 'Porcentagem no dia a dia', 'Vídeo', 10, 'Matemática', true),
      mat('m2', 'Exercícios de porcentagem', 'Exercício', 25, 'Matemática'),
      mat('m3', 'Átomos e moléculas', 'Vídeo', 16, 'Ciências'),
    ],
    progresso: { 'Matemática': 35, 'Português': 50, 'Ciências': 30, 'História': 62 },
  },
  {
    id: 'a7', nome: 'Rafael Gomes', turma: '7º A', turno: 'Tarde', matricula: '2025.0091',
    nascimento: '2012-06-14', responsavel: 'Luciana Gomes', score: 58, emTutoria: false, atualizadoEm: '2026-06-09',
    notas: { 'Matemática': [7.5, 7.0, 6.2, 5.9], 'Português': [7.0, 6.8, 6.4, 6.0], 'Ciências': [7.4, 7.1, 6.6, 6.5], 'História': [7.8, 7.2, 6.9, 6.6] },
    comportamento: { frequencia: 86, faltas: 8, atrasos: 7, ocorrencias: 1, participacao: 'Média', entregasAtrasadas: 3 },
    socio: { renda: '1 a 2 salários mínimos', moradores: 4, transporte: 'Ônibus', distancia: '7 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [], materiais: [],
    progresso: { 'Matemática': 55, 'Português': 58, 'Ciências': 62, 'História': 66 },
  },
  {
    id: 'a8', nome: 'Camila Rocha', turma: '9º C', turno: 'Manhã', matricula: '2023.0410',
    nascimento: '2010-02-27', responsavel: 'Antônio Rocha', score: 48, emTutoria: false, atualizadoEm: '2026-06-08',
    notas: { 'Matemática': [7.8, 7.5, 7.4, 7.2], 'Português': [8.0, 7.8, 7.6, 7.5], 'Ciências': [7.2, 7.4, 7.0, 7.1], 'História': [8.2, 8.0, 7.8, 7.9] },
    comportamento: { frequencia: 91, faltas: 4, atrasos: 1, ocorrencias: 0, participacao: 'Alta', entregasAtrasadas: 0 },
    socio: { renda: '1 a 2 salários mínimos', moradores: 5, transporte: 'A pé', distancia: '1,5 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [], materiais: [],
    progresso: { 'Matemática': 78, 'Português': 80, 'Ciências': 74, 'História': 82 },
  },
  {
    id: 'a9', nome: 'Bruno Nascimento', turma: '8º C', turno: 'Tarde', matricula: '2024.0675',
    nascimento: '2011-08-09', responsavel: 'Patrícia Nascimento', score: 45, emTutoria: false, atualizadoEm: '2026-06-07',
    notas: { 'Matemática': [7.0, 7.3, 7.1, 7.4], 'Português': [6.9, 7.0, 7.2, 7.3], 'Ciências': [7.6, 7.5, 7.7, 7.8], 'História': [7.1, 7.3, 7.0, 7.2] },
    comportamento: { frequencia: 93, faltas: 3, atrasos: 2, ocorrencias: 0, participacao: 'Média', entregasAtrasadas: 4 },
    socio: { renda: '3 a 5 salários mínimos', moradores: 4, transporte: 'Carro da família', distancia: '3 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [], materiais: [],
    progresso: { 'Matemática': 72, 'Português': 73, 'Ciências': 78, 'História': 72 },
  },
  {
    id: 'a10', nome: 'Lucas Martins', turma: '9º A', turno: 'Manhã', matricula: '2023.0322',
    nascimento: '2010-12-01', responsavel: 'Renata Martins', score: 32, emTutoria: false, atualizadoEm: '2026-06-05',
    notas: { 'Matemática': [8.5, 8.8, 9.0, 8.7], 'Português': [8.2, 8.0, 8.4, 8.6], 'Ciências': [9.0, 8.7, 8.9, 9.1], 'História': [8.0, 8.3, 8.1, 8.5] },
    comportamento: { frequencia: 97, faltas: 1, atrasos: 0, ocorrencias: 0, participacao: 'Alta', entregasAtrasadas: 0 },
    socio: { renda: '3 a 5 salários mínimos', moradores: 3, transporte: 'Transporte escolar', distancia: '8 km', internet: 'Banda larga', trabalha: 'Não', beneficio: 'Nenhum' },
    lacunas: [], materiais: [],
    progresso: { 'Matemática': 90, 'Português': 85, 'Ciências': 92, 'História': 84 },
  },
];

export const alerts = [
  { id: 'al1', alunoId: 'a1', descricao: 'Frequência abaixo de 75% no mês', data: '2026-06-14', urgencia: 'ALTA', status: 'Pendente' },
  { id: 'al2', alunoId: 'a2', descricao: '3 faltas consecutivas', data: '2026-06-13', urgencia: 'ALTA', status: 'Pendente' },
  { id: 'al3', alunoId: 'a3', descricao: 'Queda de 20 pts em Matemática', data: '2026-06-12', urgencia: 'MÉDIA', status: 'Em análise' },
  { id: 'al4', alunoId: 'a4', descricao: 'Sem acesso há 7 dias', data: '2026-06-11', urgencia: 'MÉDIA', status: 'Pendente' },
  { id: 'al5', alunoId: 'a6', descricao: 'Nota abaixo de 50 em 3 disciplinas', data: '2026-06-10', urgencia: 'ALTA', status: 'Resolvido' },
  { id: 'al6', alunoId: 'a7', descricao: 'Score de risco aumentou 15 pts', data: '2026-06-09', urgencia: 'MÉDIA', status: 'Em análise' },
  { id: 'al7', alunoId: 'a8', descricao: 'Responsável sem contato há 30 dias', data: '2026-06-08', urgencia: 'BAIXA', status: 'Pendente' },
  { id: 'al8', alunoId: 'a9', descricao: 'Atraso recorrente nas entregas', data: '2026-06-07', urgencia: 'BAIXA', status: 'Resolvido' },
  { id: 'al9', alunoId: 'a1', descricao: 'Nota abaixo de 6 em Matemática', data: '2026-05-28', urgencia: 'ALTA', status: 'Em análise' },
  { id: 'al10', alunoId: 'a2', descricao: 'Queda de 10 pts em Português', data: '2026-05-20', urgencia: 'MÉDIA', status: 'Resolvido' },
];

// Evolução mensal do score médio de risco (rede inteira)
export const evolucaoMensal = [
  { mes: 'Jan', valor: 45 }, { mes: 'Fev', valor: 52 }, { mes: 'Mar', valor: 48 },
  { mes: 'Abr', valor: 61 }, { mes: 'Mai', valor: 58 }, { mes: 'Jun', valor: 72 },
  { mes: 'Jul', valor: 68 }, { mes: 'Ago', valor: 75 }, { mes: 'Set', valor: 80 },
  { mes: 'Out', valor: 87, previsto: true }, { mes: 'Nov', valor: 83, previsto: true }, { mes: 'Dez', valor: 90, previsto: true },
];

export const seed = { users, students, alerts, evolucaoMensal };
