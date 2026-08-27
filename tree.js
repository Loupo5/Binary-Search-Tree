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

    #getValue(value) {
        let tree = this.root
        
        while (tree !== null) {
            if (tree.root === value) {
                return tree
            } else if (value > tree.root) {
                tree = tree.right
            } else {
                tree = tree.left
            }
        }
        return
    }

    includes(value) {
        if (this.#getValue(value)) {
            return true
        }
        return false
    }

    insert(value) {
        let tree = this.root

        if (!Number.isInteger(value)) return 

        if (tree.root === null) {
            tree.root = new Node(value)
        }

        while (tree !== null) {
            if (tree.root === value) return

            if (value > tree.root) {
                if (tree.right === null) {
                    tree.right = new Node(value)
                    return 
                }
                tree = tree.right
                
            } else {
                if (tree.left === null) {
                    tree.left = new Node(value)
                    return 
                }
                tree = tree.left
            }
        }
    }

    deleteItem(value) {
        // if the value is in the middle connect parent
        //  to the child on the deleted value
        let item = this.#getValue(value)
        if (!item) return 

        item = undefined
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

tree.insert(10)
tree.insert(11)
tree.insert(0)

tree.deleteItem(6)

console.log(tree)
console.log(tree.includes(7))
console.log(tree.prettyPrint(tree.root))


