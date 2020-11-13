// Dijkstra's Algorithm uses:
// • GPS - finding fastest route
// • Network Routing - finds open shortest path for data
// • Biology - used to model the spread of viruses among humans
// • Airline tickets - finding cheapest route to your destination
// • Biology - used to model the spread of viruses among humans

// We use Priority Queue to determine which node to visit next 
// the goal is to get the smallest value from the top of the queue
class PriorityQueue {
  constructor(){
    this.values = [];
  }

  enqueue(val, priority){
    this.values.push({ val, priority });
    // sort by priority so when we dequeue 
    // it will be the smallest val (shortest path)
    this.values.sort((a, b) => a.priority - b.priority);
  }

  dequeue(){
    return this.values.shift();
  }
}


class WeightedGraph {
  constructor(){
    this.adjacencyList = {};
  }

  addVertex(vertex){
    if (!this.adjacencyList[vertex])
      this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight){
    if (this.adjacencyList[v1]) 
      this.adjacencyList[v1].push({ node: v2, weight });
    if (this.adjacencyList[v2]) 
      this.adjacencyList[v2].push({ node: v1, weight });
  }

  // This function should accept a starting and ending vertex 
  // 1. Create an object 'distances' and set each key to be every vertex in the adjacency list with a value of Infinity, except for the starting vertex which should have a value of 0.
  // 2. Add each vertex to the priority queue with a priority of Infinity, except the starting vertex, which should have a priority of 0 because that's where we begin.
  // 3. Create another object called 'previous' and set each key to be every vertex in the adjacency list with a value of null 
  // 4. Loop as long as there is anything in the priority queue:
  // - dequeue a vertex from the priority queue 
  // - if that vertex is the same as the ending vertex - we are done!
  // - otherwise loop through each value in the adjacency list at that vertex:
  //   • calculate the distance to that vertex from the starting vertex 
  //   • if the distance is less than what is currently stored in our distances object
  //   • update the distances object with new lower distance
  //   • update the previous object to contain that vertex
  //   • enqueue the vertex with the total distance from the start node

  Dijkstra(start, finish){
    // stores priorities (distance from starting point) for each vertex
    // so we know which vertex to visit next (with the smallest distance from starting point)
    // smallest value (shortest path) on top of the queue
    const vertices = new PriorityQueue();
    // to store current shortest distance from starting point to each vertex
    // we will calculate distances using paths from 'previous' and their path values(priorities) from 'vertices'
    const distances = {};
    // to keep track of how did we get to each vertex
    // previous shortest path {'A':null,'B':'A','C':'A', ...}
    const previous = {};
    // the next vertex we need to go with smallest path value (priority)
    // we will take next vertex from priority queue
    let smallest;
    // shortest path to return at the end
    let path = []; 

    // Build up initial state (default values):
    // set start vertex distance and priority to 0
    // set every other vertex distance (from start vertex) and priority to Infinity
    // set previous vertex (path) to every vertex to null
    for (let vertex in this.adjacencyList){
      if (vertex === start){
        distances[vertex] = 0;
        vertices.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        vertices.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit (in the queue)
    while (vertices.values.length){
      // we need only val (not the entire node: {val, priority})
      smallest = vertices.dequeue().val;
      if (smallest === finish){
        // we are done
        // build up path to return at the end
        while (previous[smallest]){
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      // if (smallest !== finish) check each of its neighbors and
      // calculate the distance to each neighbor from the starting vertex 
      if (smallest || distances[smallest] !== Infinity){
        // this.adjacencyList[smallest] gives us an array of its neigbors
        for (let i in this.adjacencyList[smallest]){
          // current neighbor vertex
          let neighbor = this.adjacencyList[smallest][i];
          // distance to neighbor vertex from the start vertex
          // add distance we already know and the edge weight of this neighbor
          let new_path = distances[smallest] + neighbor.weight;
          // now we need to compare if this is smaller than we currently have for the neighbor
          // neighbor.node == name of the vertex (ex.'A', 'B')
          if (new_path < distances[neighbor.node]){ 
            // updating new smallest distance to neighbor
            distances[neighbor.node] = new_path;
            // updating previous vertex - how we got to neighbor
            previous[neighbor.node] = smallest;
            // enqueue in priority queue with new priority
            vertices.enqueue(neighbor.node, new_path);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }

}
