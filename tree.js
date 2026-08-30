import { prettyPrint } from "./outside.js"

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
        let item = this.#getValue(value)
        if (!item) return 

        let tree = this.root
        if (tree === item) {
            if (tree.left === null && tree.right === null) {
                this.root = null
                return 
            }
            if (tree.left !== null && tree.right === null) {
                this.root = tree.left
                return
            }
            if (tree.right !== null && tree.left === null) {
                this.root = tree.right
                return 
            }
            if (tree.left !== null && tree.right !== null) {
                tree = tree.right
                let parent;
                while (tree.left !== null) {
                    parent = tree
                    tree = tree.left
                    
                } 
                parent.left = tree.right
                this.root.root = tree.root
            }
            return 
        }

        while(tree !== null) {
            
            if (value > tree.root) {
                if (tree.right === item) {
                    if (item.left === null && item.right === null) {
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
                    if (item.left === null && item.right === null) {
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

    levelOrderForEach(callback) {
        if (this.root === null) return
        if (!callback) {
            throw new Error("A callback is required")
        }
        let queue = [this.root]
        let index = 0

        while (index < queue.length) {
            let current = queue[index++]
            callback(current.root)

            if (current.left !== null) {
                queue.push(current.left)
            }
            if (current.right !== null) {
                queue.push(current.right)
            }
        }
    }

    preOrderForEach(callback) {
        if (this.root === null) return
        if (!callback) return

        function preorder(root) {
            if (root === null) return 

            let current = root
            callback(current.root)
            
            preorder(current.left)
            
            preorder(current.right)
            
        }
        preorder(this.root) 
    }

    inOrderForEach(callback) {
        if (this.root === null) return
        if (!callback) {
            throw new Error("A callback is requiered")
        }

        function inorder(root) {
            if (root === null) return

            inorder(root.left)
            callback(root.root)
            inorder(root.right)
        }
        inorder(this.root)
    }

    postOrderForEach(callback) {
        if (this.root === null) return
        if (!callback) {
            throw new Error("A callback is required")
        }

        function postorder(root) {
            if (root === null) return

            postorder(root.left)
            postorder(root.right)
            callback(root.root)
        }
        postorder(this.root)
    }

    height(value) {
        if (this.root === null) return

        let queue = [this.root]
        let index = 0
        let current;

        while (index < queue.length) {
            current = queue[index++]

            if (current.left !== null) {
                queue.push(current.left)
            }
            if (current.right !== null) {
                queue.push(current.right)
            }
        }
        let deepest = this.depth(current.root)
        let tree = this.root
        index = 0

        while (tree !== null) {
            if (tree.root === value) {
                return deepest - index
            }
            if (value > tree.root) {
                tree = tree.right
                index++
            } else {
                tree = tree.left
                index++
            }
        }
    }

    depth(value) {
        if (this.root === null) return
        let tree = this.root
        let index = 0

        while (tree !== null) {
            if (tree.root === value) {
                return index
            }
            if (value > tree.root) {
                tree = tree.right
                index++
            } else {
                tree = tree.left
                index++
            }
        }
    }

    isBalanced() {
        if (this.root === null) return
        let leftIndex = 0
        let rightIndex = 0

        function findDeepest(root, depth=0) {
            if (root === null) {
                return depth - 1
            }

            const left = findDeepest(root.left, depth+1)
            const right = findDeepest(root.right, depth+1)

            return Math.max(left, right)
        }
        const deepestLeft = findDeepest(this.root.left, 1)
        const deepestRight = findDeepest(this.root.right, 1)

        if (deepestLeft - deepestRight > 1 ||
            deepestRight - deepestLeft > 1) {
                return false
        } else return true
    }

    rebalance() {
        let nodes = []
        this.preOrderForEach((value) => {
            nodes.push(value)
        })
        this.root = this.#buildTree(this.#sort(nodes))
    }
}

const arr = [2, 5, 1, 3, 6, 7, 2, 5, 1]

const tree = new Tree(arr)

tree.insert(10)
tree.insert(11)
tree.insert(0)
tree.deleteItem()

console.log(tree)
console.log(tree.includes(7))
console.log(prettyPrint(tree.root))

const tree2 = new Tree([1, 2])
tree2.deleteItem(1)
console.log(prettyPrint(tree2.root))

const tree3 = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
tree3.deleteItem()


console.log(tree3.height(3))
console.log(tree3.depth(3))

tree3.insert(11)
tree3.insert(20)
tree3.insert(22)
console.log(prettyPrint(tree3.root))


console.log(tree3.isBalanced())
console.log(tree3.rebalance())
console.log(prettyPrint(tree3.root))

console.log(tree3.isBalanced())