
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

# --- CONFIGURAÇÃO DA PÁGINA ---
st.set_page_config(page_title="Follow up Mercador", page_icon="♠️", layout="wide")

# Estilo Personalizado
st.markdown("""
    <style>
    .main { background-color: #f4f6f9; }
    .stButton>button { background-color: #800020; color: white; border-radius: 5px; }
    h1, h2, h3 { color: #2c3e50; font-family: 'Helvetica', sans-serif; }
    .metric-card { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    </style>
""", unsafe_allow_html=True)

# --- SIDEBAR ---
st.sidebar.title("♠️ Follow up Mercador")
st.sidebar.markdown("Gestão de Internacionalização")

# Simulação de Login/Acesso
user_level = st.sidebar.selectbox("Nível de Acesso", ["Administrador (Consultor)", "Cliente (Empresa)"])
project_name = st.sidebar.selectbox("Projeto Ativo", ["Expansão Chile - Eletrônicos", "Expansão EUA - Moda", "Novo Projeto"])

menu = st.sidebar.radio("Navegação", [
    "Dashboard Geral", 
    "Timeline (6 Fases)", 
    "Financeiro & DRE", 
    "CRM & Logs", 
    "Gestão de Arquivos",
    "Configurações"
])

# --- DADOS MOCKADOS (Baseado nos Docs) ---
# Em produção, isso viria da planilha Excel ou Banco de Dados
if 'financials' not in st.session_state:
    st.session_state['financials'] = pd.DataFrame(columns=['Data', 'Tipo', 'Categoria', 'Valor', 'Moeda'])

# --- PÁGINAS ---

if menu == "Dashboard Geral":
    st.title(f"Dashboard: {project_name}")
    st.markdown("Visão consolidada do projeto de internacionalização (24 Meses).")
    
    # KPIs baseados nos documentos
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Status Atual", "Fase 3: Seleção 3PL", "Em andamento")
    c2.metric("Break-even Estimado", "500-800 Pedidos/mês", "Meta: Mês 12")
    c3.metric("Orçamento Executado", "USD 4,200", "Setup + Consultoria")
    c4.metric("Dias p/ Lançamento", "45 Dias", "Conforme Cronograma")

    # Gráfico de Evolução
    st.subheader("Progresso por Fase (Metodologia Mercador)")
    phases = ['1. Análise', '2. Compliance', '3. Seleção 3PL', '4. Implantação', '5. Otimização', '6. Lançamento']
    progress = [100, 100, 60, 20, 0, 0] # Exemplo
    fig = px.bar(x=phases, y=progress, labels={'x':'Fase', 'y':'% Concluído'}, title="Cronograma de Execução (16-27 Semanas)", color=progress, color_continuous_scale='Greens')
    st.plotly_chart(fig, use_container_width=True)

elif menu == "Timeline (6 Fases)":
    st.title("📍 Acompanhamento de Etapas")
    st.info("Roteiro baseado no framework de internacionalização e fulfillment local.")
    
    tab1, tab2, tab3 = st.tabs(["Fase 1-2: Estratégia", "Fase 3-4: Operacional", "Fase 5-6: Go-to-Market"])
    
    with tab1:
        st.header("Análise e Compliance")
        st.checkbox("Plano de Negócios e Análise de Mercado (Chile/EUA) [Fonte: Doc 1]", value=True)
        st.checkbox("Classificação Fiscal (NCM/HS Code) [Fonte: Doc 1]", value=True)
        st.checkbox("Definição de Incoterms (DDP vs DAP) - DDP Recomendado [Fonte: Doc 1]", value=True)
        
    with tab2:
        st.header("Seleção 3PL e Tech")
        st.markdown("**Critérios de Seleção 3PL:** Experiência E-commerce, Integração WMS, Capacidade IOR [Fonte: Doc 2]")
        st.checkbox("Prospecção de Parceiros (Ex: Omni, Loginsa, DHL) [Fonte: Doc 4]")
        st.checkbox("Importação em Lote (Bulk Import) [Fonte: Doc 2]")
        st.checkbox("Integração Shopify/VTEX com WMS Local [Fonte: Doc 1]")
        
    with tab3:
        st.header("Lançamento")
        st.checkbox("Treinamento de Equipe")
        st.checkbox("Setup de Logística Reversa (Returns) [Fonte: Doc 2]")

elif menu == "Financeiro & DRE":
    st.title("💰 Centro de Custos e DRE")
    st.markdown("Controle de Setup, Logística Internacional e Fulfillment.")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.subheader("Novo Lançamento")
        dt = st.date_input("Data")
        tipo = st.selectbox("Tipo", ["Despesa", "Receita"])
        cat = st.selectbox("Categoria", [
            "Setup (Consultoria/3PL)", 
            "Frete Internacional", 
            "Armazenagem (Storage)", 
            "Picking & Packing", 
            "Impostos (Importação)", 
            "Venda Produto"
        ])
        val = st.number_input("Valor", min_value=0.0)
        curr = st.selectbox("Moeda", ["BRL", "USD", "CLP"])
        if st.button("Registrar"):
            # Lógica simples de adição
            new_data = pd.DataFrame({'Data': [dt], 'Tipo': [tipo], 'Categoria': [cat], 'Valor': [val], 'Moeda': [curr]})
            st.session_state['financials'] = pd.concat([st.session_state['financials'], new_data], ignore_index=True)
            st.success("Salvo!")
            
    with col2:
        st.subheader("DRE Gerencial")
        periodo = st.selectbox("Visualização", ["Mensal", "Trimestral", "Anual", "Acumulado 24 Meses"])
        if not st.session_state['financials'].empty:
            st.dataframe(st.session_state['financials'], use_container_width=True)
            
            # Resumo
            total_desp = st.session_state['financials'][st.session_state['financials']['Tipo']=='Despesa']['Valor'].sum()
            st.metric("Total Investido", f"{total_desp:,.2f}")
        else:
            st.warning("Ainda não há dados. Importe a planilha Excel ou adicione manualmente.")

elif menu == "CRM & Logs":
    st.title("📞 CRM: Registro de Contatos")
    st.markdown("Histórico de interação com stakeholders e clientes.")
    
    with st.form("crm_form"):
        c1, c2 = st.columns(2)
        c1.text_input("Nome do Contato")
        c2.selectbox("Canal", ["WhatsApp", "E-mail", "Telefone", "Presencial"])
        st.text_area("Resumo da Conversa")
        st.form_submit_button("Salvar Log")
    
    st.markdown("### Histórico Recente")
    st.table(pd.DataFrame({
        "Data": ["30/12/2024"],
        "Canal": ["WhatsApp"],
        "Contato": ["Gerente Omni Logistics"],
        "Resumo": ["Solicitação de tabela de preços para armazenagem em Santiago."]
    }))

elif menu == "Gestão de Arquivos":
    st.title("📂 Documentação Digital")
    st.file_uploader("Upload de Documentos (PDF, DOCX, XLS, JPG)", accept_multiple_files=True)
    st.markdown("---")
    st.markdown("### Arquivos do Projeto")
    st.markdown("📄 **Invoice_Comercial.pdf**")
    st.markdown("📄 **Packing_List_Final.xlsx**")

elif menu == "Configurações":
    st.title("⚙️ Setup do Projeto")
    st.markdown("Parâmetros do 'Follow up Mercador'.")
    st.text_input("Nome do Projeto", value=project_name)
    st.selectbox("País de Destino", ["Chile", "EUA", "Europa"])
    st.slider("Duração do Planejamento (Meses)", 12, 60, 24)
