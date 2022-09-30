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
  inserirLivro (parent, args, ctx, info){
    const autorExiste = ctx.db.pessoas.some(p => p.id === args.autor)
    if (!autorExiste)
      throw new Error ("Autor não existe")
    const livro = {
      id: uuidv4(),
      titulo: args.livro.titulo,
      edicao: args.livro.edicao,
      autor: args.livro.autor
    }
    ctx.db.livros.push(livro)
    return livro
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
    return comentario
  },
}

export default Mutation