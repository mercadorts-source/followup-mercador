import React, { useState } from "react";

// Follow up Mercador – PWA Ready
// Integração prevista com Excel (.xlsx) para importação e exportação de dados
// Estrutura compatível com alimentação offline e sincronização web
// Este MVP está preparado para funcionar como Progressive Web App (PWA)
// Suporta instalação em celular e desktop

export default function FollowUpMercadorMVP() {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState({ role: "admin", name: "Administrador" });
  const [users, setUsers] = useState([
    { id: 1, name: "Administrador", role: "admin" },
    { id: 2, name: "Cliente", role: "cliente" },
  ]);
  const [activeRole, setActiveRole] = useState("admin");([]);
  const [crmContacts, setCrmContacts] = useState([]);
  const [financialEntries, setFinancialEntries] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState("");
  const [docType, setDocType] = useState("PDF");([]);
  const [entryDesc, setEntryDesc] = useState("");
  const [entryType, setEntryType] = useState("Custo");
  const [entryValue, setEntryValue] = useState("");([]);
  const [contactName, setContactName] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactType, setContactType] = useState("WhatsApp");([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [cost, setCost] = useState("");

  function addProject() {
    if (!name) return;
    setProjects([
      ...projects,
      {
        id: Date.now(),
        name,
        country,
        cost: parseFloat(cost || 0),
        stage: "Análise Estratégica",
      },
    ]);
    setName("");
    setCountry("");
    setCost("");
  }

  const totalCost = projects.reduce((acc, p) => acc + p.cost, 0);
  const totalRevenue = financialEntries.filter(e => e.type === "Receita").reduce((a, b) => a + b.value, 0);
  const totalExpenses = financialEntries.filter(e => e.type === "Custo").reduce((a, b) => a + b.value, 0);
  const result = totalRevenue - totalExpenses;
  const roi = totalExpenses > 0 ? ((result / totalExpenses) * 100).toFixed(2) : 0;

  const chartData = [
    { period: "Mês 1", receita: totalRevenue * 0.2, custos: totalExpenses * 0.3 },
    { period: "Mês 2", receita: totalRevenue * 0.5, custos: totalExpenses * 0.6 },
    { period: "Mês 3", receita: totalRevenue, custos: totalExpenses },
  ];((acc, p) => acc + p.cost, 0);

  function addContact() {
    if (!contactName) return;
    setCrmContacts([
      ...crmContacts,
      {
        id: Date.now(),
        name: contactName,
        company: contactCompany,
        type: contactType,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setContactName("");
    setContactCompany("");
  }

  function addFinancialEntry() {
    if (!entryDesc || !entryValue) return;
    setFinancialEntries([
      ...financialEntries,
      {
        id: Date.now(),
        desc: entryDesc,
        type: entryType,
        value: parseFloat(entryValue),
      },
    ]);
    setEntryDesc("");
    setEntryValue("");
  }

  function addDocument() {
    if (!docName) return;
    setDocuments([
      ...documents,
      {
        id: Date.now(),
        name: docName,
        type: docType,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setDocName("");
  }() {
    if (!entryDesc || !entryValue) return;
    setFinancialEntries([
      ...financialEntries,
      {
        id: Date.now(),
        desc: entryDesc,
        type: entryType,
        value: parseFloat(entryValue),
      },
    ]);
    setEntryDesc("");
    setEntryValue("");
  }
() {
    if (!contactName) return;
    setCrmContacts([
      ...crmContacts,
      {
        id: Date.now(),
        name: contactName,
        company: contactCompany,
        type: contactType,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setContactName("");
    setContactCompany("");
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Follow up Mercador</h1>
        <select
          className="border rounded-xl p-2"
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
        >
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Novo Projeto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="border rounded p-2"
            placeholder="Nome do Projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded p-2"
            placeholder="País / Mercado"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="border rounded p-2"
            placeholder="Custo Inicial (USD)"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <button
          onClick={addProject}
          className="mt-3 px-4 py-2 rounded-xl bg-black text-white"
        >
          Adicionar Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Receita Total</p>
          <p className="text-2xl font-bold">US$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Custos Totais</p>
          <p className="text-2xl font-bold">US$ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Resultado</p>
          <p className="text-2xl font-bold">US$ {result.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">ROI</p>
          <p className="text-2xl font-bold">{roi}%</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Projetos Ativos</p>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Projetos Ativos</p>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Custo Total</p>
          <p className="text-2xl font-bold">US$ {totalCost.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500">Etapa Atual</p>
          <p className="text-lg font-semibold">Pipeline Internacional</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Centro de Custos & Receitas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input className="border rounded p-2" placeholder="Descrição" value={entryDesc} onChange={(e) => setEntryDesc(e.target.value)} />
          <select className="border rounded p-2" value={entryType} onChange={(e) => setEntryType(e.target.value)}>
            <option>Custo</option>
            <option>Receita</option>
          </select>
          <input className="border rounded p-2" type="number" placeholder="Valor" value={entryValue} onChange={(e) => setEntryValue(e.target.value)} />
          <button onClick={addFinancialEntry} className="bg-black text-white rounded-xl px-3">Lançar</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Gestão de Documentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input className="border rounded p-2" placeholder="Nome do Documento" value={docName} onChange={(e) => setDocName(e.target.value)} />
          <select className="border rounded p-2" value={docType} onChange={(e) => setDocType(e.target.value)}>
            <option>PDF</option>
            <option>DOCX</option>
            <option>XLSX</option>
            <option>JPG</option>
          </select>
          <button onClick={addDocument} className="bg-black text-white rounded-xl px-3">Adicionar</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Projetos</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Projeto</th>
              <th className="text-left p-2">País</th>
              <th className="text-left p-2">Etapa</th>
              <th className="text-right p-2">Custo</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.country}</td>
                <td className="p-2">{p.stage}</td>
                <td className="p-2 text-right">US$ {p.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
