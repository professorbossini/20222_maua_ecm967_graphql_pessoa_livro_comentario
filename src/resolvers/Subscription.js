const Subscription = {
  dado: {
    subscribe(parent, args, { pubSub }, info){
      //1. fazer com que uma função execute a cada dois segundos. Ela "publica" ou "registra" a ocorrência de um novo valor sorteado num canal específico
      setInterval(() => {
        // [0, 1)
        const valor = Math.floor(Math.random() * 6) + 1
        // canal (nome que eu invento)
        // dado de interesse
        pubSub.publish('dado', {dado: valor})
      }, 2000)

      //2.Devolver um objeto que representa o canal de comunicação entre cliente e servidor
      return pubSub.subscribe('dado')
    }  
  },
  comentario: {
    subscribe(parent, { idLivro }, { pubSub, db}, info){
      const livro = db.livros.find(l => l.id === idLivro) 
      if (!livro)
        throw new Error ("Livro não existe")
      return pubSub.subscribe('comentario', idLivro)
    }
  }  
}

export default Subscription