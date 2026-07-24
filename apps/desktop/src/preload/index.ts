import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('farol', {
  version: process.versions.electron,
});
