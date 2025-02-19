const API_URL = '/api/usuarios';

// Função para cadastrar um novo usuário
async function cadastrarUsuario(usuario) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
}

// Função para buscar todos os usuários
async function listarUsuarios() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
}

// Exemplo de uso das funções
const novoUsuario = {
    nome: 'João Silva',
    email: 'joao@example.com',
    senha: '123456',
    data_nascimento: '1990-05-15',
    tipo_usuario: 'Aluno'
};

cadastrarUsuario(novoUsuario).then(data => console.log('Usuário cadastrado:', data));

listarUsuarios().then(usuarios => console.log('Lista de usuários:', usuarios));
