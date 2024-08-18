import type { TreeOption } from 'naive-ui';
import data from './data.json';
import { computed } from 'vue';

interface Node {
  _id: string;
  pid: string;
  title: string;
  distinguishedName: string;
  unitId: number;
  depth: number;
  createdAt: number;
  updatedAt: number;
  children?: Node[];
}

interface BuildResult {
  root: TreeOption[];
  idMap: { [key: string]: TreeOption };
}

export function useTreeData() {
  const { root: _root, idMap } = buildNestedStructure(data as Node[]);

  return {
    root: computed(
      () => _root.find((node) => node.label === 'root')?.children ?? []
    ),
    idMap
  };
}

function buildNestedStructure(nodes: Node[]): BuildResult {
  const nodeMap: { [key: string]: TreeOption & { distinguishedName: string } } =
    {};
  const idMap: { [key: string]: TreeOption & { distinguishedName: string } } =
    {};
  const roots: TreeOption[] = [];

  // 將所有節點放入 map 中
  nodes.forEach((node) => {
    const newNode: TreeOption & { distinguishedName: string } = {
      key: node._id,
      label: node.title,
      distinguishedName: node.distinguishedName,
      children: []
    };
    nodeMap[node.distinguishedName] = newNode;
    idMap[node._id] = newNode;
  });

  // 構建樹結構
  Object.values(nodeMap).forEach((node) => {
    const parentPath = node.distinguishedName.substring(
      0,
      node.distinguishedName.lastIndexOf('/')
    );
    if (parentPath) {
      const parent = nodeMap[parentPath];
      if (parent) {
        parent.children!.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  // 移除空的 children 數組
  const stack: TreeOption[] = [...roots];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.children && node.children.length === 0) {
      delete node.children;
    } else if (node.children) {
      stack.push(...node.children);
    }
  }

  return { root: roots, idMap };
}
