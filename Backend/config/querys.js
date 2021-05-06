const INSERT_Utilizador = 'INSERT INTO Utilizador SET ?';

const GET_Utilizador = 
'SELECT Utilizador.email, Utilizador.Primeiro_nome, Utilizador.Ultimo_nome, FROM Utilizador WHERE Utilizador.email=?';