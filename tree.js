class Node {
    constructor(root) {
        this.root = root
        this.left = null
        this.right = null
    }
}


class Tree {
    constructor(arr) {
        this.root = this.#buildTree(this.#sort(arr))
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

    #buildTree(arr = this.arr, start = 0, end = arr.length-1) {
        
        if (start > end) return null

        const mid = Math.floor((start + end) / 2)
        const node = new Node(arr[mid])
        
        
        const left = this.#buildTree(arr, start, mid-1)
        node.left = left
        const right = this.#buildTree(arr, mid+1, end)
        node.right = right

        return node
    }

    includes(value) {
        let tree = this.root
        
        while (tree.root !== undefined) {
            if (tree.root === value) {
                return true
            } else if (value > tree.root) {
                tree = tree.right
            } else {
                tree = tree.left
            }
        }
        return false
    }
    

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

}

const arr = [2, 5, 1, 3, 6, 7, 2, 5, 1]

const tree = new Tree(arr)

console.log(tree.includes(5))
console.log(tree.prettyPrint(tree.root))
