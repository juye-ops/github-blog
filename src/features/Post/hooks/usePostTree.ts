import type { TreeNode } from '../../../entities/Post';

export function usePostTree(): TreeNode[] {
  // Vite 환경에서 posts/**/*.md 읽기
  const modules = import.meta.glob('/posts/**/*.md');

  const tree: TreeNode[] = [];

  Object.keys(modules).forEach((path) => {
    // 폴더 경로 분리
    const parts = path.replace(/^\/posts\//, '').split('/');
    console.log('parts', parts);
    let currentLevel = tree;

    parts.forEach((part, idx) => {
      let existingNode = currentLevel.find(node => node.name === part);

      if (!existingNode) {
        const newNode: TreeNode = {
          name: part,
          type: idx === parts.length - 1 ? 'file' : 'folder',
          children: idx === parts.length - 1 ? undefined : []
        };

        currentLevel.push(newNode);
        if (newNode.children) {
          currentLevel = newNode.children;
        }
      } else {
        if (existingNode.children) {
          currentLevel = existingNode.children;
        }
      }
    });
  });
  return tree;
}
