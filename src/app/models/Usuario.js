const baseQuery = require('./baseQuery');

class Usuario {

    listar(){
        return baseQuery('SELECT * FROM users');
    }
    inserir(user){
        return baseQuery('INSERT INTO users SET ?',user)
    }
    buscarPorEmail(email){
        return baseQuery('SELECT * FROM users WHERE email = ?', email);
    }
    atualizar(user){
        return baseQuery('UPDATE users SET ? WHERE id = ?', [user,user.id]);
    }
    deletar(id){
        return baseQuery('DELETE FROM users WHERE id = ?',id);
    }
}

module.exports = Usuario