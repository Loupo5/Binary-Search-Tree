class Node {
    constructor(root) {
        this.root = root
        this.left = null
        this.right = null
    }
}


class Tree {
    constructor(arr) {
        this.root = null
        this.arr = this.#sort(arr)
    }

    #sort(arr) {
        const sorted = arr.sort((a, b) => a - b)
        const removedDup = []
        sorted.forEach((item) => {
            if (!removedDup.includes(item)) {
                removedDup.push(item)
            }
        })
        return removedDup
    }

    buildTree(arr, start = 0, end = arr.length-1) {
        if (start > end) return null

        const mid = Math.floor((start + end) / 2)
        const node = new Node(arr[mid])
        
        const left = this.buildTree(arr, start, mid-1)
        node.left = left
        const right = this.buildTree(arr, mid+1, end)
        node.right = right

        return node
    }

    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

}



const tree = new Tree([2, 5, 1, 3, 6, 7, 2, 5, 1, 10, 20, 40])

console.log(tree)
console.log(tree.prettyPrint(tree))

