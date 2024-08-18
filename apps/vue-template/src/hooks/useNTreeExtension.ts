import type { TreeOption } from 'naive-ui';
import { toValue, type MaybeRef } from 'vue';

interface FindResult {
  node: TreeOption | null;
  parentArray: TreeOption[] | null;
}

function findNodeAndParentArray(root: TreeOption[], key: string): FindResult {
  const result: FindResult = { node: null, parentArray: null };

  function search(nodes: TreeOption[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        result.node = nodes[i];
        result.parentArray = nodes;
        return true;
      }
      if (nodes[i].children && search(nodes[i].children || [])) {
        return true;
      }
    }
    return false;
  }

  search(root);
  return result;
}

export function useNTreeExtension(root: MaybeRef<TreeOption[]>) {
  function isTreeNode(
    node: TreeOption | string | TreeOption['key']
  ): node is TreeOption {
    return (
      (typeof node === 'object' &&
        'key' in node &&
        typeof node.key === 'string') ||
      false
    );
  }

  function isKey(
    node: TreeOption | string | TreeOption['key']
  ): node is string {
    return typeof node === 'string' || false;
  }

  function getNode(node: TreeOption | string | TreeOption['key']) {
    if (isTreeNode(node)) {
      return findNodeAndParentArray(toValue(root), node.key as string).node;
    }
    if (isKey(node)) {
      return findNodeAndParentArray(toValue(root), node).node;
    }
    return null;
  }

  function remove() {}

  function append(
    data: TreeOption,
    parentNode?: TreeOption | string | TreeOption['key']
  ) {
    let children: TreeOption[] | null = null;
    if (typeof parentNode === 'object' && 'children' in parentNode) {
      children = parentNode.children || null;
    }
    if (isTreeNode(parentNode)) {
      const { parentArray } = findNodeAndParentArray(
        toValue(root),
        parentNode.key as string
      );
      children = parentArray;
    }
    if (isKey(parentNode)) {
      const { parentArray } = findNodeAndParentArray(toValue(root), parentNode);
      children = parentArray;
    }
    console.log('🚀 ~ useNTreeExtension ~ children:', children);
    children?.push(data);
  }

  function insertBefore() {}

  function insertAfter() {}

  return {
    getNode,
    remove,
    append,
    insertAfter,
    insertBefore
  };
}
