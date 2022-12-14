import { v4 as uuidv4 } from 'uuid'

const Mutation = {
  inserirPessoa(parent, args, ctx, info){
    const pessoa = {
      id: uuidv4(),
      nome: args.pessoa.nome,
      idade: args.pessoa.idade
    }
    ctx.db.pessoas.push(pessoa)
    return pessoa
  },
  atualizarPessoa (parent, args, { db }, info){
    const pessoa = db.pessoas.find(p => p.id === args.id)
    if (!pessoa)
      throw new Error ("Pessoa não existe")
    Object.assign(pessoa, {nome: args.pessoa.nome || pessoa.nome, idade: args.pessoa.idade || pessoa.idade})
    return pessoa
  },
  inserirLivro (parent, args, ctx, info){
    console.log(ctx.db.pessoas)
    console.log(args.autor)
    const autorExiste = ctx.db.pessoas.some(p => p.id === args.livro.autor)
    console.log(autorExiste)
    if (!autorExiste)
      throw new Error ("Autor não existe")
    const livro = {
      id: uuidv4(),
      titulo: args.livro.titulo,
      edicao: args.livro.edicao,
      autor: args.livro.autor
    }
    console.log("livro")
    ctx.db.livros.push(livro)
    ctx.pubSub.publish('livro', {livro: {
      mutation: 'insercao',
      data: livro
    }})
    return livro
  },
  atualizarLivro(parent, {id, livro}, ctx, info){
    const { db } = ctx
    const livroExistente = db.livros.find(l => l.id === id)
    if (!livroExistente)
      throw new Error ("Livro não existe")
    Object.assign(livroExistente, {titulo: livro.titulo || livroExistente.titulo, edicao: livro.edicao || livroExistente.edicao})
    ctx.pubSub.publish('livro', {
      livro: {
        mutation: 'atualizacao',
        data: livroExistente
      }
    })
    return livroExistente
  },
  inserirComentario(parent, args, ctx, info){
    if (!ctx.db.pessoas.some(p => p.id === args.comentario.autor) || !ctx.db.livros.some(l => l.id === args.comentario.livro)){
      throw new Error ("Autor e/ou livro inexistente(s)")
    }
    const comentario = {
      id: uuidv4(),
      texto: args.comentario.texto,
      nota: args.comentario.nota,
      livro: args.comentario.livro,
      autor: args.comentario.autor
    }
    ctx.db.comentarios.push(comentario)
    ctx.pubSub.publish('comentario', args.comentario.livro, {comentario})
    return comentario
  },
  atualizarComentario(parent, {id, comentario}, { db }, info){
    const comentarioExistente = db.comentarios.find(l => l.id === id)
    if (!comentarioExistente)
      throw new Error ("Comentário não existe")
    Object.assign(comentarioExistente, { texto: comentario.texto || comentarioExistente.texto, nota: comentario.nota || comentarioExistente.nota })
    return comentarioExistente
  }
}

export default Mutation