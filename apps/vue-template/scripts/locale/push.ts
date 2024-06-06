import { folderPath, localKit } from './index';

localKit.push({ folderPath, sheetName: 'template' }).then(() => {
  console.log('push done!');
});
