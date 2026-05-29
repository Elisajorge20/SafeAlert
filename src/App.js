import React, { useState } from 'react';
import './App.css';

const alertasIniciais = [
  { id: 'SA-2026-0047', nome: 'Maria Silva', idade: 8, genero: 'Feminino', localizacao: 'Av. Eduardo Mondlane, Maputo', hora: '26 Mai, 09:32', descricao: 'Vestindo uniforme escolar azul. Cabelo preto curto, aprox. 1.2m de altura.', suspeito: '', gravidade: 'critico', estado: 'activo', reportadoPor: 'Cidadão' },
  { id: 'SA-2026-0046', nome: 'João Machava', idade: 14, genero: 'Masculino', localizacao: 'Mercado Central, Maputo', hora: '26 Mai, 06:15', descricao: 'T-shirt vermelha, calças pretas, aprox. 1.6m de altura.', suspeito: 'Dois homens desconhecidos numa Toyota HiAce branca.', gravidade: 'critico', estado: 'activo', reportadoPor: 'Família' },
  { id: 'SA-2026-0045', nome: 'Ana Tembe', idade: 11, genero: 'Feminino', localizacao: 'Bairro da Sommerschield, Maputo', hora: '25 Mai, 14:00', descricao: 'Vestido amarelo, cabelo trançado. Cicatriz pequena na bochecha esquerda.', suspeito: '', gravidade: 'alto', estado: 'investigando', reportadoPor: 'Vizinho' },
  { id: 'SA-2026-0044', nome: 'Pedro Nhane', idade: 9, genero: 'Masculino', localizacao: 'Matola, Província de Maputo', hora: '23 Mai, 08:00', descricao: 'Encontrado em segurança perto do Rio Matola. Suspeito detido.', suspeito: '', gravidade: 'medio', estado: 'resolvido', reportadoPor: 'Escola' },
];

const corGravidade = { critico: '#C0392B', alto: '#E67E22', medio: '#1A5276' };
const badgeEstado = { activo: { bg: '#FADBD8', cor: '#922B21', texto: 'Activo' }, investigando: { bg: '#FDEBD0', cor: '#784212', texto: 'Em Investigação' }, resolvido: { bg: '#D5F5E3', cor: '#145A32', texto: 'Resolvido' } };

export default function App() {
  const [pagina, setPagina] = useState('inicio');
  const [alertas, setAlertas] = useState(alertasIniciais);
  const [filtro, setFiltro] = useState('todos');
  const [alertaSeleccionado, setAlertaSeleccionado] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ nome: '', idade: '', genero: '', localizacao: '', hora: '', descricao: '', suspeito: '', gravidade: '', telefone: '', reporter: '' });

  const mostrarToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const alertasFiltrados = filtro === 'todos' ? alertas : alertas.filter(a => a.estado === filtro);
  const contagens = { activo: alertas.filter(a => a.estado === 'activo').length, investigando: alertas.filter(a => a.estado === 'investigando').length, resolvido: alertas.filter(a => a.estado === 'resolvido').length };

  const submeterRelatorio = () => {
    if (!form.nome || !form.idade || !form.genero || !form.localizacao || !form.gravidade || !form.telefone) { mostrarToast('Por favor preencha todos os campos obrigatórios (*)'); return; }
    const novo = { ...form, id: `SA-2026-${Math.floor(Math.random()*9000+1000)}`, estado: 'investigando', reportadoPor: form.reporter || 'Anónimo', hora: new Date().toLocaleString('pt-MZ') };
    setAlertas([novo, ...alertas]);
    setForm({ nome: '', idade: '', genero: '', localizacao: '', hora: '', descricao: '', suspeito: '', gravidade: '', telefone: '', reporter: '' });
    mostrarToast('Alerta submetido com sucesso!');
    setPagina('relatorios');
  };

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#F2F2F7', minHeight: '100vh', maxWidth: 480, margin: '0 auto', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <div style={{ background: '#C0392B', padding: '12px 16px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(192,57,43,0.3)' }}>
        <span style={{ fontWeight: 700, fontSize: 20, color: '#fff', flex: 1 }}>Safe<span style={{ color: '#FADBD8' }}>Alert</span> 🇲🇿</span>
        <a href="tel:119" style={{ background: '#fff', color: '#C0392B', fontWeight: 700, fontSize: 13, borderRadius: 20, padding: '6px 14px', textDecoration: 'none' }}>⚠️ Ligar 119</a>
      </div>

      {/* PAGES */}
      <div style={{ paddingBottom: 80 }}>

        {/* INICIO */}
        {pagina === 'inicio' && (
          <div style={{ padding: 16 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>Painel de Alertas</h1>
            <p style={{ color: '#6C6C6E', fontSize: 14, marginBottom: 16 }}>Alertas de raptos em tempo real para Moçambique</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[['Activos', contagens.activo, '#C0392B'], ['Investigando', contagens.investigando, '#E67E22'], ['Resolvidos', contagens.resolvido, '#1E8449']].map(([l, n, c]) => (
                <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '14px 10px', borderLeft: `4px solid ${c}`, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: c }}>{n}</div>
                  <div style={{ fontSize: 12, color: '#6C6C6E', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#C0392B', borderRadius: 12, padding: '16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(192,57,43,0.3)' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>⚠️ Testemunhou um rapto?</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 3 }}>Ligue 119 ou submeta um relatório</div>
              </div>
              <button onClick={() => setPagina('reportar')} style={{ background: '#fff', color: '#C0392B', border: 'none', borderRadius: 8, padding: '10px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>+ Reportar</button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {[['todos','Todos'],['activo','Activos'],['investigando','Investigando'],['resolvido','Resolvidos']].map(([v, l]) => (
                <button key={v} onClick={() => setFiltro(v)} style={{ padding: '6px 14px', borderRadius: 20, border: 'none', background: filtro === v ? '#C0392B' : '#fff', color: filtro === v ? '#fff' : '#6C6C6E', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>{l}</button>
              ))}
            </div>

            {alertasFiltrados.map(a => (
              <div key={a.id} onClick={() => { setAlertaSeleccionado(a); setPagina('detalhe'); }} style={{ background: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
                  <div style={{ width: 4, height: 52, borderRadius: 4, background: corGravidade[a.gravidade] || '#C0392B', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{a.nome}, {a.idade}</div>
                    <div style={{ fontSize: 13, color: '#6C6C6E', marginTop: 3 }}>📍 {a.localizacao}</div>
                  </div>
                  <span style={{ background: badgeEstado[a.estado]?.bg, color: badgeEstado[a.estado]?.cor, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{badgeEstado[a.estado]?.texto}</span>
                </div>
                <div style={{ borderTop: '1px solid #E5E5EA', padding: '8px 16px', display: 'flex', gap: 16, fontSize: 12, color: '#6C6C6E' }}>
                  <span>🕐 {a.hora}</span><span>👤 {a.genero}</span><span>📁 {a.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REPORTAR */}
        {pagina === 'reportar' && (
          <div style={{ padding: 16 }}>
            <button onClick={() => setPagina('inicio')} style={{ background: 'none', border: 'none', color: '#C0392B', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 12 }}>← Voltar</button>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Reportar Incidente</h1>
            <p style={{ color: '#6C6C6E', fontSize: 14, marginBottom: 16 }}>Forneça o máximo de detalhes possível.</p>
            <div style={{ background: '#FADBD8', borderLeft: '3px solid #C0392B', borderRadius: '0 8px 8px 0', padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#922B21' }}>
              ⚠️ <strong>Importante:</strong> Apenas reporte se tiver conhecimento directo. Relatórios falsos são crime. Em emergência ligue <strong>119</strong>.
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              {[['Nome completo da vítima *', 'nome', 'text', 'ex: Maria Silva'],['Idade *', 'idade', 'number', 'Idade'],['Localização *', 'localizacao', 'text', 'Rua, bairro, cidade'],['Telefone de contacto *', 'telefone', 'tel', '+258 8X XXX XXXX'],['O seu nome', 'reporter', 'text', 'Nome (opcional)']].map(([label, key, type, ph]) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{label}</label>
                  <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} style={{ width: '100%', border: '1.5px solid #E5E5EA', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Género *</label>
                <select value={form.genero} onChange={e => setForm({...form, genero: e.target.value})} style={{ width: '100%', border: '1.5px solid #E5E5EA', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit' }}>
                  <option value="">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Descrição física</label>
                <textarea value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} placeholder="Roupa, cabelo, altura, características..." style={{ width: '100%', border: '1.5px solid #E5E5EA', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 80, resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Gravidade *</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['critico','🔴 Crítico'],['alto','🟠 Alto'],['medio','🔵 Médio']].map(([v, l]) => (
                    <button key={v} onClick={() => setForm({...form, gravidade: v})} style={{ flex: 1, padding: '10px 6px', border: `2px solid ${form.gravidade === v ? corGravidade[v] : '#E5E5EA'}`, borderRadius: 8, background: form.gravidade === v ? corGravidade[v]+'22' : '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
                  ))}
                </div>
              </div>
              <button onClick={submeterRelatorio} style={{ width: '100%', background: '#C0392B', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📩 Submeter Alerta às Autoridades</button>
            </div>
          </div>
        )}

        {/* DETALHE */}
        {pagina === 'detalhe' && alertaSeleccionado && (
          <div style={{ padding: 16 }}>
            <button onClick={() => setPagina('inicio')} style={{ background: 'none', border: 'none', color: '#C0392B', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 12 }}>← Voltar</button>
            <div style={{ background: corGravidade[alertaSeleccionado.gravidade] || '#C0392B', borderRadius: 12, padding: 20, color: '#fff', display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 40 }}>👤</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{alertaSeleccionado.nome}</div>
                <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>{alertaSeleccionado.idade} anos · {alertaSeleccionado.genero} · <span style={{ background: badgeEstado[alertaSeleccionado.estado]?.bg, color: badgeEstado[alertaSeleccionado.estado]?.cor, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{badgeEstado[alertaSeleccionado.estado]?.texto}</span></div>
              </div>
            </div>
            {[['📍 Última localização', alertaSeleccionado.localizacao],['🕐 Hora do incidente', alertaSeleccionado.hora],['📁 ID do Caso', alertaSeleccionado.id],['🧍 Descrição física', alertaSeleccionado.descricao || 'Sem descrição'],alertaSeleccionado.suspeito ? ['🚗 Suspeito/Veículo', alertaSeleccionado.suspeito] : null,['👤 Reportado por', alertaSeleccionado.reportadoPor]].filter(Boolean).map(([l, v]) => (
              <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                <div style={{ fontSize: 12, color: '#6C6C6E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 4 }}>
              {[['💬 Dar uma dica', () => mostrarToast('Dica submetida — obrigado!')],['📤 Partilhar alerta', () => mostrarToast('Link copiado!')],['🖨️ Imprimir', () => window.print()]].map(([l, fn]) => (
                <button key={l} onClick={fn} style={{ background: '#fff', border: '1.5px solid #E5E5EA', borderRadius: 12, padding: '14px 10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
              ))}
              <a href="tel:119" style={{ background: '#C0392B', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞 Ligar 119</a>
            </div>
          </div>
        )}

        {/* RELATORIOS */}
        {pagina === 'relatorios' && (
          <div style={{ padding: 16 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Todos os Relatórios</h1>
            <p style={{ color: '#6C6C6E', fontSize: 14, marginBottom: 16 }}>Todos os incidentes submetidos no sistema.</p>
            {alertas.map(a => (
              <div key={a.id} onClick={() => { setAlertaSeleccionado(a); setPagina('detalhe'); }} style={{ background: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
                  <div style={{ width: 4, height: 52, borderRadius: 4, background: corGravidade[a.gravidade] || '#C0392B', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{a.nome}, {a.idade}</div>
                    <div style={{ fontSize: 13, color: '#6C6C6E', marginTop: 2 }}>📍 {a.localizacao}</div>
                    <div style={{ fontSize: 12, color: '#6C6C6E', marginTop: 2 }}>📁 {a.id} · 🕐 {a.hora}</div>
                  </div>
                  <span style={{ background: badgeEstado[a.estado]?.bg, color: badgeEstado[a.estado]?.cor, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{badgeEstado[a.estado]?.texto}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INFO */}
        {pagina === 'info' && (
          <div style={{ padding: 16 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Informação e Ajuda</h1>
            <p style={{ color: '#6C6C6E', fontSize: 14, marginBottom: 16 }}>Contactos de emergência e dicas de segurança.</p>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>📞 Contactos de Emergência</h2>
              {[['Polícia (PRM)', '119'],['Protecção à Criança (INAS)', '116'],['Emergência Geral', '112'],['Força de Intervenção Rápida', '21 42 5051']].map(([n, num]) => (
                <div key={n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #E5E5EA' }}>
                  <span style={{ fontSize: 14, color: '#6C6C6E' }}>{n}</span>
                  <a href={`tel:${num}`} style={{ fontSize: 20, fontWeight: 700, color: '#C0392B', textDecoration: 'none' }}>{num}</a>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>🛡️ Se Testemunhar um Rapto</h2>
              {['Mantenha-se em segurança. Não intervenha fisicamente.','Ligue 119 imediatamente.','Anote detalhes: veículo, matrícula, direcção.','Submeta um relatório no SafeAlert.','Partilhe o alerta com a sua comunidade.'].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 26, height: 26, background: '#C0392B', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i+1}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, paddingTop: 3 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: '#fff', borderTop: '1px solid #E5E5EA', display: 'flex', zIndex: 100 }}>
        {[['inicio','🏠','Início'],['reportar','📋','Reportar'],['relatorios','📁','Relatórios'],['info','ℹ️','Info']].map(([p, icon, label]) => (
          <button key={p} onClick={() => setPagina(p)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 4px', background: 'none', border: 'none', cursor: 'pointer', color: pagina === p ? '#C0392B' : '#6C6C6E', fontWeight: pagina === p ? 700 : 400, fontSize: 10, fontFamily: 'inherit' }}>
            <span style={{ fontSize: 22 }}>{icon}</span>{label}
          </button>
        ))}
      </div>

      {/* TOAST */}
      {toast && <div style={{ position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)', background: '#1C1C1E', color: '#fff', padding: '12px 24px', borderRadius: 30, fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', zIndex: 999 }}>{toast}</div>}
    </div>
  );
}