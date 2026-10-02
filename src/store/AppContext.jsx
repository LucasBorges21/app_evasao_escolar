import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seed } from '../data/seed.js';

const DATA_KEY = 'eei-data-v1';
const SESSION_KEY = 'eei-session-v1';

const clone = (o) => JSON.parse(JSON.stringify(o));

function loadData() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* storage indisponível */ }
  return clone(seed);
}

function loadSession() {
  try { return localStorage.getItem(SESSION_KEY); } catch { return null; }
}

const newId = (prefix) => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const nivelRisco = (score) => (score >= 70 ? 'ALTO' : score >= 55 ? 'MÉDIO' : 'BAIXO');

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState(loadData);
  const [sessionId, setSessionId] = useState(loadSession);

  useEffect(() => {
    try { localStorage.setItem(DATA_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  }, [data]);

  useEffect(() => {
    try {
      if (sessionId) localStorage.setItem(SESSION_KEY, sessionId);
      else localStorage.removeItem(SESSION_KEY);
    } catch { /* ignore */ }
  }, [sessionId]);

  const currentUser = data.users.find((u) => u.id === sessionId && u.ativo) || null;

  const api = useMemo(() => ({
    // ---------- autenticação ----------
    login(email, senha, perfil) {
      const u = data.users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
      if (!u || u.senha !== senha) return 'Usuário ou senha inválidos.';
      if (!u.ativo) return 'Este usuário está desativado. Fale com o gestor.';
      if (u.perfil !== perfil) return `Este usuário não tem o perfil "${perfil === 'gestor' ? 'Gestor Escolar' : 'Professor'}".`;
      setSessionId(u.id);
      return null;
    },
    logout() { setSessionId(null); },

    // ---------- usuários ----------
    saveUser(user) {
      const email = user.email.trim().toLowerCase();
      const dup = data.users.find((u) => u.email.toLowerCase() === email && u.id !== user.id);
      if (dup) return 'Já existe um usuário com este e-mail.';
      setData((d) => {
        if (user.id) {
          return { ...d, users: d.users.map((u) => (u.id === user.id ? { ...u, ...user, email } : u)) };
        }
        const novo = { ...user, email, id: newId('u'), ativo: true, criadoEm: new Date().toISOString().slice(0, 10) };
        return { ...d, users: [...d.users, novo] };
      });
      return null;
    },
    toggleUser(id) {
      setData((d) => ({ ...d, users: d.users.map((u) => (u.id === id ? { ...u, ativo: !u.ativo } : u)) }));
    },
    deleteUser(id) {
      setData((d) => ({ ...d, users: d.users.filter((u) => u.id !== id) }));
    },

    // ---------- alunos ----------
    addStudent(s) {
      const id = newId('a');
      setData((d) => ({
        ...d,
        students: [...d.students, {
          id, ...s, score: Number(s.score) || 0, emTutoria: false,
          atualizadoEm: new Date().toISOString().slice(0, 10),
          notas: { 'Matemática': [], 'Português': [], 'Ciências': [], 'História': [] },
          comportamento: { frequencia: 100, faltas: 0, atrasos: 0, ocorrencias: 0, participacao: '—', entregasAtrasadas: 0 },
          socio: { renda: '—', moradores: '—', transporte: '—', distancia: '—', internet: '—', trabalha: '—', beneficio: '—' },
          lacunas: [], materiais: [],
          progresso: { 'Matemática': 0, 'Português': 0, 'Ciências': 0, 'História': 0 },
        }],
      }));
      return id;
    },
    updateStudent(id, patch) {
      setData((d) => ({ ...d, students: d.students.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
    },
    toggleMaterial(alunoId, materialId) {
      setData((d) => ({
        ...d,
        students: d.students.map((s) => {
          if (s.id !== alunoId) return s;
          let progresso = { ...s.progresso };
          const materiais = s.materiais.map((m) => {
            if (m.id !== materialId) return m;
            const delta = m.concluido ? -10 : 10;
            progresso[m.disciplina] = Math.max(0, Math.min(100, (progresso[m.disciplina] || 0) + delta));
            return { ...m, concluido: !m.concluido };
          });
          return { ...s, materiais, progresso };
        }),
      }));
    },

    // ---------- alertas ----------
    setAlertStatus(id, status) {
      setData((d) => ({ ...d, alerts: d.alerts.map((a) => (a.id === id ? { ...a, status } : a)) }));
    },

    resetData() {
      setData(clone(seed));
    },
  }), [data]);

  return (
    <AppContext.Provider value={{ ...data, currentUser, ...api }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
