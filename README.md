# Integracao Applet



### Retorno para Atendeu Externo (mensagem,TelefoneA, TelefoneB)
#### Atendeu para ligações manuais (click to call, preview).
function doAtendeuExterno(msg, telA, telB)

### Retorno para Atendeu Ramal (mensagem, Telefone)
#### Atendeu ligações entre ramais
function doAtendeuRamal(msg, tel)

### Para ligações do PowerDialer
#### Atendimento externo para agendamentos Ura CallBack
function doAtendeuExternoPower (mensagem, telefone, codcli, codcamp, telefoneb, nome, codtel, codcampcliente) 

### Para ligações URA
#### Atendeu Receptivo
function doAtendeuUra (mensagem,telefone, telefoneb) 

### Para ligações do Power Dialer
#### Atendeu Discador Automatico. 
function doAtendeuUraPower(mensagem telefone, codcli, codcamp, telefoneb, nome, codtel,codcampcliente) 
