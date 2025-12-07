## A récupérer, inspiration

- stickyDirective + resize
- ScrollableDirective, une fois le scrool arrivé en base alors cela envois un requete get list firebase, lastIndex+10
````js
        const query: QueryFn =  ref => this.state.lastItem ? ref.orderBy('desc').startAfter(this.state.lastItem).limit(20) : ref.orderBy('desc').limit(20)
````
