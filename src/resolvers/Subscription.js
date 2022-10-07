const Subscription = {
  dado: {
    subscribe (parent, args, {pubSub}, info){
      setInterval(() => {
        //registra algo no canal "dado" a cada dois segundos
        pubSub.publish('dado', {dado: Math.floor(Math.random() * 6) + 1})
      }, 2000)
      //devolve o objeto que representa o canal de comunicação entre publisher e subscriber
      return pubSub.subscribe('dado')
    }
  },
  comentario: {
    subscribe(parent, {idLivro}, {pubSub, db}, info){
      //antes de registrar o novo evento, verificamos se o livro realmente existe
      const livro = db.livros.find(l => l.id === idLivro)
      if (!livro)
        throw new Error ("Livro não existe")
      //se o livro existe, chegamos até aqui e fazemos o registro de novo evento
      //o segundo parâmetro garante que a notificação será feita por livro
      //ou seja, subscribers interessados em eventos envolvendo o livro de id 100 não serão notificados quando eventos envolvendo o livro de id 101 acontecerem
      return pubSub.subscribe('comentario', idLivro)
    }
  },
  livro: {
    subscribe (parent, args, {pubSub}, info){
      return pubSub.subscribe("livro")
    }
  }
};
export default Subscription;