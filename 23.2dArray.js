// 2D Arrays or Matrices

const testMatrix = [
  [1,  2,  3,  4,  5],
  [6,  7,  8,  9,  10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20]
]


// first value is the modification to row, second value is the modification to column
const directions = [
  [-1, 0],    //up
  [0, 1],     //right
  [1, 0],    //down
  [0, -1]    //left
]


function traverseDF(matrix) {
    const visited = new Array(matrix.length).fill(0).map(() => {
        return new Array(matrix[0].length).fill(false)
    });

    const result = [];

    dfs(matrix, 0, 0, visited, result);

    return result;
}


function dfs(matrix, row, col, visited, result) {
    if(row < 0 || col < 0 || row >= matrix.length || col >= matrix[0].length || visited[row][col]) {
       return
    }

    visited[row][col] = true;
    result.push(matrix[row][col]);

    for(let i = 0; i < directions.length; i++) {
         const currentDir = directions[i];
         dfs(matrix, row + currentDir[0], col + currentDir[1], visited, result);
    }
}


const dfsResult = traverseDF(testMatrix);
console.log(dfsResult);  // [ 1, 2, 3, 4, 5, 10, 15, 20, 19, 14, 9, 8, 13, 18,  17, 12, 7, 6, 11, 16]


function traverseBF(matrix) {

  const visited = new Array(matrix.length).fill(0).map(() => {
      return new Array(matrix[0].length).fill(false)
  });

  const result = [];
  const queue = [[0, 0]];

  while(queue.length) {
    const currentPos = queue.shift();
    const row = currentPos[0];
    const col = currentPos[1];

    if(row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length || visited[row][col]) {
        continue; // skip this iteration of while loop
    }

    visited[row][col] = true;
    result.push(matrix[row][col]);

    for(let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];
      queue.push([row + currentDir[0], col + currentDir[1]]);
    }

  }

  return result;

}

const bfsResult = traverseBF(testMatrix);
console.log(bfsResult);  // [1,  2, 6, 3, 7, 11, 4, 8, 12, 16, 5, 9, 13, 17, 10, 14, 18, 15, 19, 20]
