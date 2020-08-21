const baseQuery = require('./baseQuery');

class File {

    listar(){
        return baseQuery('SELECT * FROM files');
    }
    inserir(file){
        return baseQuery('INSERT INTO files SET ?',file)
    }
    buscarPorId(id){
        return baseQuery('SELECT * FROM files WHERE id = ?', id);
    }
    atualizar(file){
        return baseQuery('UPDATE files SET ? WHERE id = ?', [file,file.id]);
    }
    deletar(id){
        return baseQuery('DELETE FROM files WHERE id = ?',id);
    }
}

module.exports = File