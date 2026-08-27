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
        // make logic for deleting nodes who have two children nodes
        // have to replace the node with the smallest node on the right subtree
        /* example: 
                3
              2   5
            1    4  6  --> here if 3 is deleted, 4 should come into its place
                            because its the smallest value on the right side.
                            ALSO -- could replace the largest value of the left side
                                    (won't do that)*/
        let item = this.#getValue(value)
        if (!item) return 

        let tree = this.root
        if (tree === item) {
            this.root = null
            return 
        }

        while(tree !== null) {
            
            if (value > tree.root) {
                if (tree.right === item) {
                    if (tree.right.left === null && tree.right.right === null) {
                        tree.right = null
                        return 
                    }
                    let parent = tree
                    if (item.left !== null) {
                        item.right.left = item.left
                    }
                    parent.right = tree.right.right
                    return 
                } 
                tree = tree.right
            }
            else if (value < tree.root) {
                if (tree.left === item) {
                    if (tree.left.left === null && tree.left.right === null) {
                        tree.left = null
                        return 
                    }
                    let parent = tree
                    if (item.right !== null) {
                        item.left.right = item.right
                    }
                    parent.left = tree.left.left
                    return 
                }
                tree = tree.left
            }
        }
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
tree.deleteItem(1)

console.log(tree)
console.log(tree.includes(7))
console.log(tree.prettyPrint(tree.root))

const tree2 = new Tree([1])
tree2.deleteItem(1)
console.log(tree2)


