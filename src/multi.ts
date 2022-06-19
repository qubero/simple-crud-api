import { cpus } from 'os';
import cluster from 'cluster';

(async function initMulti() {
  if (cluster.isPrimary) {
    console.log(`Number of cpus: ${cpus().length}`);
    console.log(`Primary Cluster pid is: ${process.pid}`);
    cpus().map(() => cluster.fork());
  } else {
    const id = cluster.worker?.id;
    console.log(`Worker: ${id}, pid: ${process.pid}`);
    await import('./index');
  }
})();
