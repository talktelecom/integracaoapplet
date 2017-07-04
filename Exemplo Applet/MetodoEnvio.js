//=====================================================================================================================
//========== Métodos de Envios da applet ==============================================================================

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

if (checkIt('konqueror'))
{
    browser = "Konqueror";
    OS = "Linux";
}
else if (checkIt('safari')) browser = "Safari"
else if (checkIt('omniweb')) browser = "OmniWeb"
else if (checkIt('opera')) browser = "Opera"
else if (checkIt('webtv')) browser = "WebTV";
else if (checkIt('icab')) browser = "iCab"
else if (checkIt('msie')) browser = "Internet Explorer"
else if (!checkIt('compatible'))
{
    browser = "Netscape Navigator"
    version = detect.charAt(8);
}
else browser = "An unknown browser";

if (!version) version = detect.charAt(place + thestring.length);

if (!OS)
{
    if (checkIt('linux')) OS = "Linux";
    else if (checkIt('x11')) OS = "Unix";
    else if (checkIt('mac')) OS = "Mac"
    else if (checkIt('win')) OS = "Windows"
    else OS = "an unknown operating system";
}

function checkIt(string)
{
    place = detect.indexOf(string) + 1;
    thestring = string;
    return place;
}

//var ip='192.168.0.200';

/*editar ip remoto*/
//var ip='10.0.2.43';

var ip='10.0.0.2';
//var ip='201.44.80.130';

var porta=44900;

var tmp_codebase_user_phone_extension='';
var tmp_evt_logon='';



//Verifica para saber se é numeros
function checkNumero(event)
{
    var BACKSPACE = 8;
    var key;
    var tecla;
    CheckTAB=true;
    if(navigator.appName.indexOf("Netscape")!= -1)
	{
		tecla= event.which;
	}
    else
	{
		tecla= event.keyCode;
	}
    key = String.fromCharCode( tecla);
    if ( tecla == 13 )
	{
		return false;
	}
    if ( tecla == BACKSPACE )
	{
		return true;
	}

	var strValidos = "1234567890"

    if ( strValidos.indexOf( key ) == -1 )
	{
  return false;
    }

    return true;
}

//function runApp()
//{

//	var wsh = new ActiveXObject("WScript.Shell");
//	wsh.Run("notepad.exe");


	//cmdStr="-Djava.security.policy=polfile header.html";
	//ws.Exec (cmdStr,0,TRUE);

//}

//executa o notepad.exe
function runApp()
{
    var objShell = new ActiveXObject("Shell.Application");
	objShell.ShellExecute("notepad.exe", "", "", "open", 1);
}

//Habilita os Logs de erro setTrace =1 e setTracePacket = 1 e
//document.getElementById("JTalkAtendimento").getVersion() verifica versão da Applet
//Ler se exite cookie de logon

function loadHeader()
{
	EnabledButton("txtRamal");
	EnabledButton("txtId");
	EnabledButton("txtSenha");
	EnabledButton("txtIpMaq");
	EnabledButton("txtPorta");
	DesableButton("txtFila");
	submit_table("TabelaDicar");
	submit_table("TableConsulta");
	submit_table("TableDialogos");
	submit_table("TableStatusInter");
	submit_table("StatusAtendimento");
	submit_table("TableStatus");
	submit_table("lblStatus");
	submit_table("StatusGeral");

	document.getElementById("JTalkAtendimento").setTrace(1);
	document.getElementById("JTalkAtendimento").setTracePacket(1);

	str_versao = document.getElementById("JTalkAtendimento").getVersion();
	StatusUpdate("Applet Versão: " + str_versao + " iniciada com sucesso!");

	alert("Applet Versão: " + str_versao + " iniciada com sucesso!");

	document.Atendimento.txtFila.value=0;

	//====================== Cookies =========================
	if(lerCookie("Id") != null)
	{
		document.Atendimento.txtSenha.value = lerCookie("Senha");
		document.Atendimento.txtId.value = lerCookie("Id");
		document.Atendimento.txtRamal.value = lerCookie("Ramal");
		document.Atendimento.txtIpMaq.value = lerCookie("IpMaq");
		document.Atendimento.txtPorta.value = lerCookie("PortaMaq");
	}

}

//Função para Login e Logoff
function LogarRamal(str_id)
{
	if (str_id == parent.TLDS_USER_PHONE_EXTENSION)
	{
		tmp_ramal = document.Atendimento.txtRamal.value;
		tmp_id = document.Atendimento.txtId.value
		tmp_senha = document.Atendimento.txtSenha.value;
		ip = document.Atendimento.txtIpMaq.value;
		porta = document.Atendimento.txtPorta.value;
		if (tmp_id!='')
		{

			if (browser == "Internet Explorer")
			{
				bconn = JTalkAtendimento.setConnectCTI(ip,porta);
				if (bconn==true)
				{
					JTalkAtendimento.setLogin(tmp_ramal, tmp_id , tmp_senha, '1');
					//parent.header.JTalkAtendimento.setSairIntervaloDialer();
					DesableButton("txtRamal");
					DesableButton("txtId");
					DesableButton("txtSenha");
					DesableButton("txtIpMaq");
					DesableButton("txtPorta");
					visible_table("TabelaDicar");
					visible_table("TableConsulta");
					visible_table("TableDialogos");
					visible_table("TableStatusInter");
					visible_table("StatusAtendimento");
					visible_table("TableStatus");
					visible_table("lblStatus");
					visible_table("StatusGeral");

					DesableButton("btnDesligar");
					DesableButton("btnCancelarDiscagem");
					DesableButton("btnCancelarConculta");
					DesableButton("btnConsultar");
					DesableButton("txtTransFone");
					DesableButton("btnTransferencia");
				}

			}
			else
			{
				bconn = JTalkAtendimento.setConnectCTI(ip,porta);
				if (bconn==true)
				{
					//parent.header.document.Atendimento.JTalkAtendimento.setLogin(tmp_ramal, tmp_id, tmp_senha, '0');
					document.JTalkAtendimento.setLogin(tmp_ramal, tmp_id, tmp_senha, '1');

					DesableButton("txtRamal");
					DesableButton("txtId");
					DesableButton("txtSenha");
					DesableButton("txtIpMaq");
					DesableButton("txtPorta");
					visible_table("TabelaDicar");
					visible_table("TableConsulta");
					visible_table("TableDialogos");
					visible_table("TableStatusInter");
					visible_table("StatusAtendimento");
					visible_table("TableStatus");
					visible_table("lblStatus");
					visible_table("StatusGeral");

					DesableButton("btnDesligar");
					DesableButton("btnCancelarDiscagem");
					DesableButton("btnCancelarConculta");
					DesableButton("btnConsultar");
					DesableButton("txtTransFone");
					DesableButton("btnTransferencia");
				}
			}
		}
	}

	submit_table("Carregando");

}

/*methods*/
// Método de Login chama função LogarRamal aonde ocorre a chamada de logon
// Método setLogoff faz logoff
// Método setCloseConnect fecha conexão
function method_login()
{
	table_conteudo = document.getElementById('table_conteudo');
	table_grupo = document.getElementById('table_grupo');
	if (status_login == 'login')
	{
		if (document.Atendimento.txtRamal.value == '')
		{
			alert('INFORME O RAMAL !');
			return;
		}

		if (document.Atendimento.txtId.value == '')
		{
			alert('INFORME O ID DO RAMAL!');
			return;
		}

		if (document.Atendimento.txtSenha.value =='')
		{
			alert('INFORME A SENHA DO RAMAL!');
			return;
		}


		if (document.Atendimento.txtIpMaq.value =='')
		{
			alert('INFORME O IP DA MAQUINA!');
			return;
		}

		if (document.Atendimento.txtPorta.value =='')
		{
			alert('INFORME A PORTA DA MAQUINA!');
			return;
		}

		visible_table("Carregando");

		LogarRamal(parent.TLDS_USER_PHONE_EXTENSION);

		status_login = 'logout';



		//====================== Cookies =========================

		criarCookie("Senha", document.Atendimento.txtSenha.value, 30);
		criarCookie("Id", document.Atendimento.txtId.value, 30);
		criarCookie("Ramal", document.Atendimento.txtRamal.value, 30);
		criarCookie("IpMaq", document.Atendimento.txtIpMaq.value, 30);
		criarCookie("PortaMaq", document.Atendimento.txtPorta.value, 30);
		//StatusUpdate("Criando Cookie: " + "Senha: " + document.Atendimento.txtSenha.value + " por 30 dias");
		//StatusUpdate("Criando Cookie: " + "Id: " + document.Atendimento.txtId.value + " por 30 dias");
		//StatusUpdate("Criando Cookie: " + "Ramal: " + document.Atendimento.txtRamal.value + " por 30 dias");

		//==================== Fim Cookies =======================

	}
	else
	{
		submit_table("Carregando");
		status_login = 'login';
		document.Atendimento.btnLogin.value='LogIn';
		document.getElementById("JTalkAtendimento").setLogoff();
		//document.getElementById("JTalkAtendimento").setCloseConnect();
		EnabledButton("txtRamal");
		EnabledButton("txtId");
		EnabledButton("txtSenha");
		EnabledButton("txtIpMaq");
		EnabledButton("txtPorta");
		submit_table("TabelaDicar");
		submit_table("TableConsulta");
		submit_table("TableDialogos");
		submit_table("TableStatusInter");
		submit_table("StatusAtendimento");
		submit_table("TableStatus");
		submit_table("lblStatus");
		submit_table("StatusGeral");

	}
}

function submit_table(esconde)
{
	document.getElementById(esconde).style.visibility = "hidden";
}

function visible_table(mostra)
{
	document.getElementById(mostra).style.visibility = "visible";
}

function EnabledButton(habilitar)
{
	document.getElementById(habilitar).disabled = false;
}

function DesableButton(desabilitar)
{
	document.getElementById(desabilitar).disabled = true;
}



//Método de Discagem
//Método setTiradaFila Tira ramal da fila
//Método setEnviaRamais Envia Ramais
//Método setPoeNaFila Coloca em fila
function method_discagem()
{
	//alert("Método de Discagem");
	limpaRamais();
	document.getElementById("JTalkAtendimento").setTiradaFila();
	Cabecalho_Ramal();
	Cabecalho_Grupo();
	document.getElementById("JTalkAtendimento").setEnviaRamais();
	document.getElementById("JTalkAtendimento").setPoeNaFila();
}


function method_Ramais()
{
	limpaRamais();
	Cabecalho_Ramal();
	Cabecalho_Grupo();
	document.getElementById("JTalkAtendimento").setEnviaRamais();
}


//Método de Discar
//Método str_rotadefault Pede retorno da rota
//Método setEnviaRamais Envia Ramais
//Método setLiberaPausa Libera se ramal esta em pausa
//Método setDiscar
//setDiscar(1 = a Discagem para Ramal , Mensagem do status da ligação , Para ramal interno não utilizar rotas)
//setDiscar(0 = a Discagem para Externo , Mensagem do status da ligação , Utilizar rotas para discagem externa)

function method_discar()
{
	EnabledButton("btnCancelarDiscagem");
	EnabledButton("btnDesligar");
	//alert("Método de Discar");

	ROTA = document.getElementById("JTalkAtendimento").str_rotadefault;

	document.getElementById("JTalkAtendimento").setTiradaFila();
	nAtendeu = document.Atendimento.txtFone.value;
	id_ligacao = 0;

	//document.getElementById("JTalkAtendimento").setEnviaRamais();

	//document.getElementById("JTalkAtendimento").setLiberaPausa();

	if (nAtendeu.length <= 4)
	{
		alert("Chamando Ramal");
		info('Chamando Ramal', nAtendeu, "","interno",0);
		//StatusUpdate('Discagem para Ramal');
		sret = document.getElementById("JTalkAtendimento").setDiscar(1 ,nAtendeu ,'')
	}
	else
	{
		StatusUpdate('Discagem Externa usando rota '+ ROTA);
		sret = document.getElementById("JTalkAtendimento").setDiscar(0 ,nAtendeu ,ROTA)
	}
}

//Método para Gravar Ligação ou NÃO gravar
function method_gravar_on_ramal()
{
	if(document.Atendimento.btnGravar.value == 'Gravar')
	{
		document.getElementById("JTalkAtendimento").setGravarOn();
		document.Atendimento.btnGravar.value = 'Gravando';
	}
	else
	{
		document.getElementById("JTalkAtendimento").setGravarOff();
		document.Atendimento.btnGravar.value = 'Gravar';
	}
}

//Método para capturar ligação de outro ramal
function method_captura_ramal()
{
	document.getElementById("JTalkAtendimento").setCapturaChamada();
}

//Método setDesligaCliente Desliga Cliente
function method_desliga_cliente()
{
	parent.i_count_receive = 0;

	document.getElementById("JTalkAtendimento").setDesligaCliente();
}

//Método em que coloca ramal em Intervalo setIntervalo ou libera ramal setLiberaPausa
function method_intervalo()
{
	//if (document.getElementById("JTalkAtendimento").i_intervalo == 1)
	//{
	//	document.getElementById("JTalkAtendimento").setLiberaPausa();
	//}
	//else
	//{
		document.getElementById("JTalkAtendimento").setIntervalo();
	//}
}

//Método coloca ramal em não disponível setNaoDisponivel ou retira ramal de não disponível
function method_nao_disponivel()
{
	//if (document.getElementById("JTalkAtendimento").i_naodisponivel == 1)
	//{
	//	parent.i_count_receive = 0;
	//	document.getElementById("JTalkAtendimento").setLiberaPausa();
	//}
	//else
	//{
		document.getElementById("JTalkAtendimento").setNaoDisponivel();
	//}
}

//Metodo para retirar de pausa um ramal e deixar o mesmo como livre
function method_livre()
{
	document.getElementById("JTalkAtendimento").setLiberaPausa();
}

//Método em que coloca ramal em Intervalo externo setIntervaloExterno
function method_intervalo_externo()
{
	document.getElementById("JTalkAtendimento").setIntervaloExterno();
}

//Método consultar ramal = coloca primeiro setPoeEspera ramal que estava em ligação fica em espera
// Consulta Ramal
//Consulta o ramal ligando para o mesmo setConsulta(1 = a ramais interno, valor do telefone , Não precisa de rota)
// Agora se for consultar Externo
//Consulta numero externo ligando para o mesmo setConsulta(0 = a ramais interno, valor do telefone , precisa da rota)
function method_Consultar()
{
	EnabledButton("btnCancelarConculta");
	if(document.Atendimento.btnConsultar.value == "Consultar")
	{
		document.getElementById("JTalkAtendimento").setPoeEspera();
		if (document.getElementById('txtTransFone').value.length <= 4)
		{
			StatusUpdate('Consulta interna');
			document.getElementById("JTalkAtendimento").setConsulta(1 ,document.getElementById('txtTransFone').value ,'');
		}
		else
		{
			StatusUpdate('Consulta externa');
			document.getElementById("JTalkAtendimento").setConsulta(0, document.getElementById('txtTransFone').value, ROTA);
		}
	}
	else
	{
		document.getElementById("JTalkAtendimento").setRetorna();
		document.getElementById('btnConsultar').value = "Consultar";
	}
}

//Método transfere ligação setTransferencia se a ligação não estiver em espera colocar em espera setPoeEspera
// Transfere para Ramal
//Transferir para ramal setTransferencia(1 = ramal interno, valor do telefone, não precisa de rota)
// Transfere para Externo
// Transfere para Externo setTransferencia(0 = ramal interno, valor do telefone, precisa de rota)
function method_transferencia()
{
	if(document.Atendimento.btnConsultar.value == "Consultar")
	{
		sret = document.getElementById("JTalkAtendimento").setPoeEspera();
	}

	if (document.Atendimento.txtTransFone.value.length <= 4)
	{
		StatusUpdate('Transferência para interno');
		sret = document.getElementById("JTalkAtendimento").setTransferencia(1 ,document.Atendimento.txtTransFone.value ,'');
	}
	else
	{
		StatusUpdate('Transferência para externo');
		sret = document.getElementById("JTalkAtendimento").setTransferencia(0, document.Atendimento.txtTransFone.value, ROTA);
	}
	document.getElementById('btnConsultar').value = "Consultar";
}

//Método fazer logoff da pagina ao clicar no fechar do browser setLogoff
function winClose()
{
	StatusUpdate('Fechando Janela...');
	document.getElementById("JTalkAtendimento").setLogoff();
}


//Método adiciona ramal setAdicionaRamal (Ramal do grupo , Ramal a ser inserido ou removido, se 0 = Remove o ramal do grupo e se 1 = Insere o ramal no Grupo )
function method_adiciona_ramal()
{
	sret = document.getElementById("JTalkAtendimento").setAdicionaRamal(document.Atendimento.txtramalgrupo.value,document.Atendimento.txtramalinsere.value,document.Atendimento.txttipo.value)
}

function limpaRamais()
{
    while(table_conteudo.rows.length > 0)
    {
	table_conteudo.deleteRow(0);
    }
	while(table_grupo.rows.length > 0)
    {
	table_grupo.deleteRow(0);
    }
}

// Método para pedir recados. setAlocaVoxRecado
function method_Recados()
{
	limpaRecados();
	document.getElementById("JTalkAtendimento").setAlocaVoxRecado();
	Cabecalho_Recados();
}

// Função para limpar linhas limpaRecados
function limpaRecados()
{
	while(table_grupo.rows.length > 0)
    {
		table_grupo.deleteRow(0);
    }

    while(table_grupo.rows.length > 0)
	{
		table_grupo.deleteRow(0);
    }
}

// Função para cabeçalhos
function Cabecalho_Recados()
{
	var tr = table_grupo.insertRow(table_grupo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_recado');

	td = tr.insertCell(0);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 30px; font-weight: bold;");
	td.innerHTML = "Recado";

	td = tr.insertCell(1);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 90px; font-weight: bold;");
	td.innerHTML = "Data";

	td = tr.insertCell(2);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 90px; font-weight: bold;");
	td.innerHTML = "Hora";

	td = tr.insertCell(3);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 90px; font-weight: bold;");
	td.innerHTML = "Duracao";


	td = tr.insertCell(4);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","center");
	td.setAttribute("class","Cabecalho");
	td.setAttribute("style","width: 150px; font-weight: bold;");
	td.innerHTML = "Numero A";
}

//Método de play no arquivo vox setPlayVox(nome do arquivo ex. M0159_30032011_152712_1204.vox)
function method_playVox(strRecado)
{
document.getElementById("JTalkAtendimento").setPlayVox(strRecado);
}

// Método que cancela o AlocaVoxRecado. setCancelaAlocaVoxRecado
function method_CancelaAlocaVoxRecado()
{
	limpaRecados();
	document.getElementById("JTalkAtendimento").setCancelaAlocaVoxRecado();
}

// Método que coloca em intervalo de grupo (Retorna valor inteiro. Intervalo do tipo Grupo. getIntervaloGrupo) e
// Método para entrar e sair de intervalo de grupo setIntervaloGrupo. Retornará a função JavaScript: doIntervaloGrupo(String msg)
function method_IntervaloGrupo()
{
	//alert(document.getElementById("JTalkAtendimento").getIntervaloGrupo());
	document.getElementById("JTalkAtendimento").setIntervaloGrupo();
}


// Método setCopiaVox(String strRamal ,String strPath, String strArquivo)
function method_CopiaVox()
{
	alert(document.Atendimento.txtRecado.value);
	document.getElementById("JTalkAtendimento").setCopiaVox(txtRamal.value ,'c:\\talk', document.Atendimento.txtRecado.value)
}

// Método getIntervaloGrupoDialer verifica se está em intervalo
// Método entra em intervalo de grupo setEntrarIntervaloGrupoDialer
// Método sai de intervalo de grupo setSairIntervaloGrupoDialer
function method_IntervaloGrupoDialer()
{
	//if (document.getElementById("JTalkAtendimento").getIntervaloGrupoDialer()==0)
	//{
		document.getElementById("JTalkAtendimento").setEntrarIntervaloGrupoDialer();
	//}
	//else
	//{
	//	document.getElementById("JTalkAtendimento").setSairIntervaloGrupoDialer();
	//}
}

// Método getIntervaloGrupoDialer verifica se está em intervalo
// Método entra em intervalo dialer setEntrarIntervaloGrupoDialer
// Método sai de intervalo dialer setSairIntervaloGrupoDialer
function method_IntervaloDialer()
{
	//if (document.getElementById("JTalkAtendimento").getIntervaloDialer()==0)
	//{
		document.getElementById("JTalkAtendimento").setEntrarIntervaloDialer();
	//}
	//else
	//{
	//	document.getElementById("JTalkAtendimento").setSairIntervaloDialer();
	//}
}

// Método setPlayVox(nome do arquivo ex. M0159_30032011_152712_1204.vox) para ouvir recado.
function method_ouvirrecado()
{
	document.getElementById("JTalkAtendimento").setPlayVox(document.Atendimento.txtRecado.value);
}

// Método para pedir dialogo. setAlocaVoxRecado
// Método setPlayVox(nome do arquivo ex. M0159_30032011_152712_1204.vox) para ouvir dialogo.
function method_ouvirdialogo()
{
	alert(document.Atendimento.txtRecado.value)
	document.getElementById("JTalkAtendimento").setAlocaVoxRecado();
	document.getElementById("JTalkAtendimento").setPlayVox(document.Atendimento.txtRecado.value);
}


function printRecado(Recado)
{
//document.getElementById("JTalkAtendimento").setPlayVox(strRecado);
//	document.Atendimento.txtRecado.value = 'Recado';
}

// Método Poe o ramal na fila. Simula colocar o ramal no gancho.
function method_PoeNaFila()
{
	limpaRamais();
	document.getElementById("JTalkAtendimento").setPoeNaFila();
}

// Método que cancela consulta setLiberaConsulta
// Método Tira da espera em transferência. setTiraEspera
function method_CancelaConsulta()
{
	document.getElementById("JTalkAtendimento").setLiberaConsulta();
	document.getElementById("JTalkAtendimento").setTiraEspera();
}

// Função para desabilitar botões
function BtnEnabled()
{
	document.Atendimento.btnConsultar.disabled = false;
	document.Atendimento.btnTransferencia.disabled = false;
}

// Função para habilitar botões
function BtnDisabled()
{
	document.Atendimento.btnConsultar.disabled = true;
	document.Atendimento.btnTransferencia.disabled = true;
}

// Função para print do ramal e chama método method_discar() para discar
function printTelefone(Ramal)
{
	alert("printTelefone")
	document.Atendimento.txtFone.value = Ramal;
	method_discar();
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
		//info('Status', 'Linha Interna', 'Linha Externa', 'Localização', 1);
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

/*function insereRamalPabx(nrRamal, nmRamal, Status)
{
	var tr = table_conteudo.insertRow(table_conteudo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal_' + nrRamal);

	td = tr.insertCell(0);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 30px;");
	td.innerHTML = nrRamal;

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

function insereRamalFax(nrRamal, nmRamal, Status)
{
	var tr = table_conteudo.insertRow(table_conteudo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal_' + nrRamal);

	td = tr.insertCell(0);
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 30px;");
	td.innerHTML = nrRamal;

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

function insereRamalUra(nrRamal, nmRamal, Status)
{

	var tr = table_conteudo.insertRow(table_conteudo.rows.length);
	var td;

	tr.setAttribute("id", 'tr_ramal_' + nrRamal);

	td = tr.insertCell(0);
	td.setAttribute("align", "center");
	td.setAttribute("NOWRAP","");
	td.setAttribute("class","ContentGridStyle");
	td.setAttribute("style","width: 30px;");
	td.innerHTML = nrRamal;

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
}*/

//===============================================================================================
//========== Update do status ===================================================================
												//===
function StatusUpdate(msg)									//===
{												//===
	var concat;									 	//===
	//concat = document.getElementById('txtStatus').value;					//===
	concat = document.getElementById('txtStatus').value;					//===
	concat = msg + "\n---------------------------------------------\n" + concat;	    	//===
												//===
	//document.getElementById('txtStatus').value = concat;					//===
	document.getElementById('txtStatus').value = concat;					//===
}												//===
												//===
//===============================================================================================
//===============================================================================================



//============== Fim dos envios da applet ==================

//============== Fim dos envios da applet ==================



//======================== Cookies ===========================
function criarCookie(nome,valor,dias)
{
	if(dias)
	{
		var date = new Date();
		date.setTime(date.getTime()+(dias*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else
	{
		var expires = "";
	}

	document.cookie = nome+"="+valor+expires+"; path=/";
}

function lerCookie(nome)
{
	var nomeEQ = nome + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ')
		{
			c = c.substring(1,c.length);
		}

		if (c.indexOf(nomeEQ) == 0)
		{
			return c.substring(nomeEQ.length,c.length);
		}
	}

	return null;
}

function apagarCookie(nome)
{
	createCookie(nome,"",-1);
}
//====================== Fim Cookies =========================

