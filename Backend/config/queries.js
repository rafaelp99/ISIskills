const INSERT_Utilizador = 'INSERT INTO Utilizador SET ?';

const GET_Utilizador = 
'SELECT Utilizador.Primeiro_nome, Utilizador.Ultimo_nome, Utilizador.email FROM Utilizador WHERE Utilizador.email=?';

const GET_all_utilizadores=  'SELECT Utilizador.Primeiro_nome, Utilizador.Ultimo_nome, Utilizador.email FROM Utilizador';