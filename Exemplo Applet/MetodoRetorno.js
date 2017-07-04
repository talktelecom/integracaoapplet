//===============================================================================================
//========== Retornos da applet =================================================================

var status_login = 'login';
var tmp_ligoupara = null;
var tmp_nr_cliente = null;
var b_found_tlds_prospect = false;
var ROTA = '-1';
var b_found_tlds_call = false;
var id_prospect_currency = 0;
var i_TimeOut = 50;
var id_ligacao = 0;
var str_versao ='';
var table_conteudo;
var table_grupo;
var nAtendeu = 0;

var bconn = false;

var ECONOMIC_ACTIVTY = '1';
var LEADS_GRP_MID = '2';
var LEADS_MID = '3';
var TLDS_USER_PHONE_EXTENSION = '4';
var str_nr = '';
var newstr_nr = '';

var str_status_atual = '';
var i_tela_main_ativa = 0;
var i_tela_agenda = 0;

var tmp_id='';
var tmp_ramal='';
var tmp_senha='';

var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;

//Fun��o tabelas/colunas/linhas ficam invis�veis
function submit_table(esconde)
{
	document.getElementById(esconde).style.visibility = "hidden";
}

//Fun��o tabelas/colunas/linhas ficam vis�veis
function visible_table(mostra)
{
	document.getElementById(mostra).style.visibility = "visible";
}

// Habilita bot�es e caixa de texto
function EnabledButton(habilitar)
{
	document.getElementById(habilitar).disabled = false;
}

// Desabilita bot�es e caixa de texto
function DesableButton(desabilitar)
{
	document.getElementById(desabilitar).disabled = true;
}

function doInsereRecado(strMensagem, strData, strHora, strDuracao,strNumA)
{
	var tr = table_grupo.insertRow(table_grupo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_recado_' + strMensagem);

	td = tr.insertCell(0);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 30px;");
	td.innerHTML = strMensagem;

	td = tr.insertCell(1);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 90px;");
	td.innerHTML = strData;

	td = tr.insertCell(2);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 90px;");
	td.innerHTML = strHora;

	td = tr.insertCell(3);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 90px;");
	td.innerHTML = strDuracao;

	td = tr.insertCell(4);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 150px;");
	td.innerHTML = strNumA;
}

//Retorna uma mensagem enviada por outro ramal. (ramal , mensagem)
function doTalkMessager(strRamal,strMensagem)
{
	//alert(strRamal + strMensagem);
}

//Retorna o nome do arquivo .vox referente a chamada.
function doNomeDoArquivo(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorna a
function doTransfereCliente(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorna a Fila de espera no ramal
function doInFilaOper(msg)
{
	StatusUpdate('InFilaOper:'+msg);
}

//Retorna a Fila de espera no ramal
function doOutFilaOper(msg)

{
	StatusUpdate('OutFilaOper:'+msg)
}

//Retorna a Fila de espera no grupo
function doInFilaGrupo(Canal,Grupo)
{
	//alert(Canal + Grupo);
	StatusUpdate("InFilaGrupo:"+Canal+","+Grupo)
	document.Atendimento.txtFila.value=parseInt(document.Atendimento.txtFila.value)+1;

}

//Retorna a Fila de espera no grupo
function doOutFilaGrupo(Canal,Grupo)
{
	//alert(Canal + Grupo);
	StatusUpdate("OutFilaGrupo:"+Canal+","+Grupo)
	if (document.Atendimento.txtFila.value != "0")
	{
		document.Atendimento.txtFila.value=parseInt(document.Atendimento.txtFila.value)-1;
	}
}

//Retorna do m�todo para pedir recados.
//Retornos
//Aloca Vox Recado Ok.
//Erro Aloca Vox Recado.
function doAlocaVoxRecado(msg)
{
	//StatusUpdate(msg);
	//alert(msg);
}

//Retorno do M�todo para ouvir recado.
//Retornos
//Play Vox Ok.
//Erro Play Vox.
function doPlayVox(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para n�o dispon�vel
function doNaoDisponivel(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

// Retorno do M�todo de Logon
function doLogon(msg)
{
	//alert(document.getElementById("JTalkAtendimento").str_rotadefault);
	StatusUpdate(msg);
	if (msg == "Logon V�lido")
	{

		document.Atendimento.btnLogin.value='LogOut';

	}
	else
	{
		document.Atendimento.btnLogin.value='LogIn';
	}
	alert(msg);
}

// Retorno do M�todo de Logoff
function doLogoff(msg)
{
	alert(msg);
	StatusUpdate(msg);
	//alert(msg);
}

// Retorno para Discar Externo (mensagem, telefone)
function doDiscaExterno(msg, tel)
{
	alert("Retorno para Discar Externo");
	info(msg, tel, "", "externo",0);
	//StatusUpdate(msg + " " + tel);
	//alert(msg);
}

//Retorno para Ring Externo
function doRingExterno(msg, tel)
{
	EnabledButton("btnDesligar");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");
	DesableButton("btnConsultar");
	DesableButton("btnCancelarConculta");
	DesableButton("btnTransferencia");
	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");

	alert("Retorno para Ring Externo");
	nAtendeu = tel;
	limpaInfo();
	info(msg, tel, "", "externo",0);
	//StatusUpdate(msg + " " + tel);
	//alert(msg);
}

//Retorno para Ring Externo do Power
function doRingExternoPower(msg, tel, codcli)
{
	EnabledButton("btnDesligar");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");
	DesableButton("btnConsultar");
	DesableButton("btnCancelarConculta");
	DesableButton("btnTransferencia");
	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");

	nAtendeu = tel;
	limpaInfo();
	info(msg, "Codigo Cliente: " + codcli, tel, "externo",0);
	//StatusUpdate(msg + " " + tel + " C�digo - " + codcli);
	//alert(msg);
}

//Retorno para Atendeu Externo
function doAtendeuExterno(msg, telA, telB)
{
	EnabledButton("btnConsultar");
	EnabledButton("btnTransferencia");
	EnabledButton("txtTransFone");

	nAtendeu = 0;
	limpaInfo();
	info( msg, telB, telA,"externo",0);
	StatusUpdate(msg + " " + telA + " " + telB);
	BtnEnabled();
	//alert(msg);
}

//Retorno para Atendeu Externo do Power
function doAtendeuExternoPower(msg, telA, codcli, codcamp, telB, nome, codtel, codcampcli,canal)
{
	EnabledButton("btnConsultar");
	EnabledButton("btnTransferencia");
	EnabledButton("txtTransFone");
	nAtendeu = 0;
	limpaInfo();
	info(msg, telB, telA, codcli+ "Canal:"+canal,0);
	StatusUpdate(msg + " " + telA + " " + telB + " C�digo - " + codcli+ "Canal:"+canal);
	BtnEnabled();
	//alert(msg);
}

//Retorno para Ring da Ura
function doRingUra(msg, tel)
{
	EnabledButton("btnConsultar");
	DesableButton("btnTransferencia");

	EnabledButton("btnDesligar");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");

	DesableButton("btnCancelarConculta");

	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");

	alert("Retorno para Ring da Ura");
	info(msg, "", tel, "externo",0);
	//StatusUpdate(msg + " " + tel);
	//alert(msg);
}

//Retorno para Ring do Power
function doRingUraPower(msg, tel, codcli)
{
	EnabledButton("btnDesligar");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");

	DesableButton("btnCancelarConculta");

	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");

	nAtendeu = tel;
	info(msg, "Codigo Cliente: " + codcli, tel, "externo",0);
	//StatusUpdate(msg + " " + tel + " C�digo - " + codcli);
	//alert(msg);
}

//Retorno para Atendeu Ura
function doAtendeuUra(msg, telA, telB)
{
	EnabledButton("btnDesligar");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");

	DesableButton("btnCancelarConculta");

	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");
	alert("Atendeu Ura");
	nAtendeu = 0;
	limpaInfo();
	info(msg, telB, telA, "externo",0);
	//StatusUpdate(msg + " " + telA + " " + telB);
	BtnEnabled();
	//alert(msg);
}

//Retorno para Atendeu Ura do Power
function doAtendeuUraPower(msg, telA, codcli, codcamp, telB, nome, codtel, codcampcli,canal)
{
	EnabledButton("btnDesligar");
	EnabledButton("btnTransferencia");
	EnabledButton("txtTransFone");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");

	DesableButton("btnCancelarConculta");

	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");

	nAtendeu = 0;
	limpaInfo();
	info(msg, telB, telA,  "Codigo Cliente: " + codcli,0);
	info(nome, codcamp, codtel, codcampcli,1);
	//StatusUpdate(msg + " " + telA + " " + telB + " C�digo - " + codcli );
	StatusUpdate(msg + " " + telA + " " + telB + " C�digo - " + codcli + " Canal - " + canal);
	BtnEnabled();
	//alert(msg);
}

// Retorno para Informa��o Estat�stica
function doInformacaoEstatistica(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

// Retorno para Intervalo
function doIntervalo(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Intervalo de Grupo
function doIntervaloGrupo(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Intervalo de Grupo Dialer
function doIntervaloGrupoDialer(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Intervalo Dialer
function doIntervaloDialer(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Consulta de Ramal setRetorna
function doConsultaRamal(msg)
{
	StatusUpdate(msg);
	if(msg == "Consulta Ramal")
	{
		document.Atendimento.btnConsultar.value = "Retornar";
	}
	else
	{
		document.Atendimento.getElementById("JTalkAtendimento").setRetorna();
	}
	//alert(msg);
}

//Retorno para Intervalo Externo
function doIntervaloExterno(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Agente Livre
function doAgenteLivre(msg)
{

	limpaInfo();
	if(nAtendeu != 0)
	{
		StatusUpdate("Chamada " + nAtendeu + " n�o atendida.");
		nAtendeu = 0;
	}
	DesableButton("btnDesligar");
	EnabledButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	EnabledButton("btnCapturar");
	DesableButton("btnConsultar");
	DesableButton("btnCancelarConculta");
	DesableButton("btnTransferencia");
	EnabledButton("btnRecados");
	EnabledButton("btnCancelaRecado");
	EnabledButton("btnOuvirDialogo");
	EnabledButton("btnOuvirRecado");
	EnabledButton("btnRecados");
	EnabledButton("btnCopiaVox");

	StatusUpdate(msg);
	//BtnDisabled()
	alert(msg);
}

//Retorno para Ring do Ramal
function doRingRamal(msg, tel)
{
	EnabledButton("btnDesligar");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");
	DesableButton("btnConsultar");
	DesableButton("btnCancelarConculta");
	DesableButton("btnTransferencia");
	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");
	nAtendeu = tel;
	info(msg, tel, "", "interno",0)
	//StatusUpdate(msg + " " + tel);
	//alert(msg);
}

//Retorno para Atendeu Ramal
function doAtendeuRamal(msg, tel)
{
	EnabledButton("btnDesligar");
	EnabledButton("btnTransferencia");
	EnabledButton("txtTransFone");
	DesableButton("btnDiscar");
	DesableButton("btnCancelarDiscagem");
	DesableButton("btnCapturar");
	DesableButton("btnConsultar");
	DesableButton("btnCancelarConculta");
	DesableButton("btnRecados");
	DesableButton("btnCancelaRecado");
	DesableButton("btnOuvirDialogo");
	DesableButton("btnOuvirRecado");
	DesableButton("btnRecados");
	DesableButton("btnCopiaVox");
	nAtendeu = 0;
	limpaInfo();
	info(msg, tel, "", "interno",0)
	StatusUpdate(msg + " " + tel);
	BtnEnabled();
	//alert(msg);
}

function doIntervalosDescricao(msg,intervaloId,Produtivo)
{
	alert('doIntervalosDescricao - Descri��o ' + msg + " Id " +intervaloId + " Produtivo " + Produtivo);
	StatusUpdate(msg);
}

function doIntervalosSelecionado(msg,intervaloId)
{
	alert('doIntervalosSelecionado - Intervalo ' + msg + " Id " +intervaloId);
	StatusUpdate(msg);
}

//Retorno para Fim do Mailing
function doFimMailing(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Intervalo Dialer
function doIntervaloDialer(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para N�o Atendeu
function doNaoAtendeu(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Ocupado
function doOcupado(msg)
{
	StatusUpdate(msg);
	//alert(msg);
}

//Retorno para Grava ramal
function doGrava(msg)
{
	StatusUpdate(msg);
}

//Estes m�todos retornam os ramais um a um conforme recebimento.
function doRamaisPA(msg)
{
	StatusUpdate(msg);
}

function doRamaisGrupos(msg)
{
	StatusUpdate(msg);
}

function doRamaisPabx(msg)
{
    StatusUpdate(msg);
}

function doRamaisFax(msg)
{
    StatusUpdate(msg);
}

function doRamaisUra(msg)
{
    StatusUpdate(msg);
}


function Cabecalho_Ramal()
{
	var tr = table_conteudo.insertRow(table_conteudo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal');

	td = tr.insertCell(0);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 30px; font-weight: bold;");
	td.innerHTML = "Ramal";

	td = tr.insertCell(1);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 190px; font-weight: bold;");
	td.innerHTML = "Nome";

	td = tr.insertCell(2);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 90px; font-weight: bold;");
	td.innerHTML = "Status";

	td = tr.insertCell(3);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 90px; font-weight: bold;");
	td.innerHTML = "Departamento";
}


function Cabecalho_Grupo()
{
	var tr = table_grupo.insertRow(table_grupo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal');

	td = tr.insertCell(0);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 30px; font-weight: bold;");
	td.innerHTML = "Ramal";

	td = tr.insertCell(1);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 190px; font-weight: bold;");
	td.innerHTML = "Grupo";

	td = tr.insertCell(2);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 90px; font-weight: bold;");
	td.innerHTML = "Logados";
}

function insereRamalPA(nrRamal, nmRamal, Status, Depto)
{
	var tr = table_conteudo.insertRow(table_conteudo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal_' + nrRamal);

	td = tr.insertCell(0);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 30px;");
	td.innerHTML = "<a href='javascript: printTelefone(" + nrRamal + ")'>" + nrRamal + "</a>";

	td = tr.insertCell(1);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 190px;");
	td.innerHTML = nmRamal;

	td = tr.insertCell(2);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 90px;");
	td.innerHTML = Status;

	td = tr.insertCell(3);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 90px;");
	td.innerHTML = Depto;
}

function insereRamalGrupo(nrRamal, nmRamal, Status)
{

	var tr = table_grupo.insertRow(table_grupo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal_' + nrRamal);

	td = tr.insertCell(0);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 30px;");
	td.innerHTML = "<a href='javascript: printTelefone(" + nrRamal + ")'>" + nrRamal + "</a>";

	td = tr.insertCell(1);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 190px;");
	td.innerHTML = nmRamal;

	td = tr.insertCell(2);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 90px;");
	td.innerHTML = Status;
}

function info(Col1, Col2, Col3, Col4, aux)
{
	if(aux == 0)
	{
		//info('Status', 'Linha Interna', 'Linha Externa', 'Localiza��o', 1);
	}

	var table = document.createElement('table');
	var tr    = document.createElement('tr');
	var td    = document.createElement('td');
	var td2   = document.createElement('td');
	var td3   = document.createElement('td');
	var td4   = document.createElement('td');

	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","color:#000066;background-color:#F0F0F0;border-color:WhiteSmoke;text-decoration: none;");
	td.innerHTML= Col1;

	td2.setAttribute("align", "center");
	td2.setAttribute("NOWRAP","center");
	td2.setAttribute("class","Cabecalho");
	td2.setAttribute("style","color:#000066;background-color:#F0F0F0;border-color:WhiteSmoke;text-decoration: none;");
	td2.innerHTML=Col2;

	td3.setAttribute("align", "center");
	td3.setAttribute("NOWRAP","center");
	td3.setAttribute("class","Cabecalho");
	td3.setAttribute("style","color:#000066;background-color:#F0F0F0;border-color:WhiteSmoke;text-decoration: none;");
	td3.innerHTML=Col3;

	td4.setAttribute("align", "center");
	td4.setAttribute("NOWRAP","center");
	td4.setAttribute("class","Cabecalho");
	td4.setAttribute("style","color:#000066;background-color:#F0F0F0;border-color:WhiteSmoke;text-decoration: none;");
	td4.innerHTML=Col4;

	tr.appendChild(td);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);

	table.appendChild(table);

	document.getElementById('table_info').firstChild.appendChild(tr);

}

function limpaInfo()
{
	while(document.getElementById('table_info').rows.length > 0)
	{
		document.getElementById('table_info').deleteRow(0);
	}
}


// Fun��o para desabilitar bot�es
function BtnEnabled()
{
	document.Atendimento.btnConsultar.disabled = false;
	document.Atendimento.btnTransferencia.disabled = false;
}

// Fun��o para habilitar bot�es
function BtnDisabled()
{
	document.Atendimento.btnConsultar.disabled = true;
	document.Atendimento.btnTransferencia.disabled = true;
}

// Fun��o para print do ramal e chama m�todo method_discar() para discar
function printTelefone(Ramal)
{
	//alert("printTelefone")
	document.Atendimento.txtFone.value = Ramal;
	method_discar();
}

//FIm dos m�todos que retornam os ramais um a um conforme recebimento.

//============== Fim dos retornos da applet ==================

