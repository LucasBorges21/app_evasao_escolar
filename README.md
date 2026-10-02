# Ecossistema Escolar Inteligente — Protótipo

Protótipo funcional (front-end) construído a partir dos wireframes do Figma.
Feito com **React + Vite**, sem backend: os dados de exemplo ficam salvos no navegador (localStorage).

## Telas

| Rota | Tela | O que dá para fazer |
|---|---|---|
| `#/login` | Login | Entrar como Gestor ou Professor (valida perfil e senha) |
| `#/` | Dashboard | KPIs calculados, evolução mensal do risco, ranking de alunos em risco |
| `#/alunos` | Alunos | Buscar, filtrar por turma/risco e **cadastrar novos alunos** |
| `#/alunos/:id` | Perfil do aluno | Score de risco, abas Acadêmico / Comportamental / Socioeconômico, iniciar tutoria |
| `#/tutoria/:id` | Tutoria personalizada | Lacunas, trilha de estudos (marcar materiais concluídos atualiza o progresso) |
| `#/relatorios` | Alertas e relatórios | Filtros, KPIs, mudar status do alerta, exportar PDF (impressão) |
| `#/usuarios` | Usuários (só gestor) | **Cadastrar, editar, desativar e excluir usuários** |
| `#/configuracoes` | Configurações | Trocar senha, restaurar dados de exemplo |

## Acessos de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Gestor Escolar | `gestor@escola.edu.br` | `123456` |
| Professor | `professor@escola.edu.br` | `123456` |

Na tela de login há botões que preenchem esses dados automaticamente.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Estrutura

```
src/
  data/seed.js          dados de exemplo (alunos, alertas, usuários)
  store/AppContext.jsx  estado global + persistência no localStorage
  components/           Layout (sidebar/topbar) e componentes de UI
  pages/                uma página por tela
  styles.css            tema escuro baseado nos wireframes
```