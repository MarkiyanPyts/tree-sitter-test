from tree_sitter import Language, Parser

Language.build_library(
  'build/my-languages.so',
  ['vendor/tree-sitter-javascript']
)

JS_LANGUAGE = Language('build/my-languages.so', 'javascript')
parser = Parser()
parser.set_language(JS_LANGUAGE)

# Read the code from the file
with open('test.js', 'r') as file:
    code = file.read()

tree = parser.parse(bytes(code, "utf8"))

# Get the root node of the tree
root_node = tree.root_node

# Access information about the tree nodes
def traverse_tree(node, code):
    # Access information about the current node
    if node.type == "function_declaration" or node.type == "arrow_function":
        # Access information about the current node
        print("Node type:", node.type)
        print("Node text:", code[node.start_byte:node.end_byte])
        print("Start index:", node.start_byte)
        print("End index:", node.end_byte)

    # Recursively traverse the children
    for child in node.children:
        traverse_tree(child, code)

traverse_tree(root_node, code)
