const Livro = {
  autor(parent, args, ctx, info){
    // console.log(`parent: ${JSON.stringify(parent)}`)  
    return ctx.db.pessoas.find(p => p.id === parent.autor)
  },
  comentarios (parent, args, ctx, info){
    return ctx.db.comentarios.filter(c => c.livro === parent.id)
  }
}
export default Livro