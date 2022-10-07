const Subscription = {
  dado: {
    subscribe (parent, args, {pubSub}, info){
      setInterval(() => {
        pubSub.publish('dado', {
          dado: Math.floor(Math.random() * 6) + 1
        })
      }, 2000)
      return pubSub.subscribe('dado')
    }
  }
};
export default Subscription;