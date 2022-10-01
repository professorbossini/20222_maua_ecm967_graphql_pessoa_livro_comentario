import { createServer } from '@graphql-yoga/node'
import { v4 as uuidv4 } from 'uuid'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Livro from './resolvers/Livro'
import Pessoa from './resolvers/Pessoa'
import Comentario from './resolvers/Comentario'
import * as fs from 'fs'

// const typeDefs = `
  
// `

const resolvers = {
  Query: Query,
  Mutation: Mutation,
  Livro: Livro,
  Pessoa: Pessoa,
  Comentario: Comentario
}


const server = createServer({
  schema: {
    typeDefs: fs.readFileSync('./src/schema.graphql', 'utf-8'), resolvers
  },
  context: {db: db}
})

server.start(() => console.log("Servidor executando..."))


// const resolvers = {
//   Query: {
//     livros(parent, args, ctx, info){
//       return ctx.db.livros
//     },
//     pessoas(parent, args, ctx, info){
//       return ctx.db.pessoas
//     },
//     comentarios(parent, args, ctx, info){
//       return ctx.db.comentarios
//     }
//   },
//   Mutation: {
//     inserirPessoa(parent, args, ctx, info){
//       const pessoa = {
//         id: uuidv4(),
//         nome: args.pessoa.nome,
//         idade: args.pessoa.idade
//       }
//       ctx.db.pessoas.push(pessoa)
//       return pessoa
//     },
//     inserirLivro (parent, args, ctx, info){
//       const autorExiste = ctx.db.pessoas.some(p => p.id === args.autor)
//       if (!autorExiste)
//         throw new Error ("Autor não existe")
//       const livro = {
//         id: uuidv4(),
//         titulo: args.livro.titulo,
//         edicao: args.livro.edicao,
//         autor: args.livro.autor
//       }
//       ctx.db.livros.push(livro)
//       return livro
//     },
//     inserirComentario(parent, args, ctx, info){
//       if (!ctx.db.pessoas.some(p => p.id === args.comentario.autor) || !ctx.db.livros.some(l => l.id === args.comentario.livro)){
//         throw new Error ("Autor e/ou livro inexistente(s)")
//       }
//       const comentario = {
//         id: uuidv4(),
//         texto: args.comentario.texto,
//         nota: args.comentario.nota,
//         livro: args.comentario.livro,
//         autor: args.comentario.autor
//       }
//       ctx.db.comentarios.push(comentario)
//       return comentario
//     },
//   },
//   Livro: {
//     autor(parent, args, ctx, info){
//       // console.log(`parent: ${JSON.stringify(parent)}`)  
//       return ctx.db.pessoas.find(p => p.id === parent.autor)
//     },
//     comentarios (parent, args, ctx, info){
//       return ctx.db.comentarios.filter(c => c.livro === parent.id)
//     }  
//   },
//   Pessoa: {
//     livros(parent, args, ctx, info){
//       return ctx.db.livros.filter(livro => livro.autor === parent.id)
//     },
//     comentarios(parent, args, ctx, info){
//       return ctx.db.comentarios.filter(comentario => comentario.autor === parent.id)  
//     }
//   },
//   Comentario: {
//     livro(parent, args, ctx, info){
//       return ctx.db.livros.find(livro => livro.id === parent.livro)
//     },
//     autor(parent, args, ctx, info){
//       return ctx.db.pessoas.find(p => p.id === parent.autor)
//     }
//   }
// }

