import { folderPath, localKit } from './index';

localKit.pull({ folderPath, sheetName: 'template', type: 'nest' }).then(() => {
  console.log('pull done!');
});
