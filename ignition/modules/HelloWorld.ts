import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const HelloWorldModule = buildModule("HelloWorldModule", (m) => {
  const helloWorld = m.contract("HellWorld");

  return { helloWorld };
});

export default LockModule;
