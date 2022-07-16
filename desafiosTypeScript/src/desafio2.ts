// Como podemos melhorar o esse código usando TS? 



type Profissao = 'Padeiro' | 'Atriz'

interface Pessoa {
    name: string,
    idade: number,
    profissao: Profissao
}

const pessoa1: Pessoa = {
    name: 'Carlos',
    idade: 21,
    profissao: 'Padeiro'
}

const pessoa2: Pessoa = {
    name: 'Suzana',
    idade: 25,
    profissao: 'Atriz'
}