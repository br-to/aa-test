import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('PostBoardModule', (m) => {
  const postBoard = m.contract('PostBoard');
  return { postBoard };
});
