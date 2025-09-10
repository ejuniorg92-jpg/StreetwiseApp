// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
try {
  require(process.cwd() + '/functions/index.js');
  console.log('OK: functions/index.js loaded.');
} catch (e) {
  console.error('LOAD ERROR >>>');
  console.error(e && (e.stack || e.message || e));
  process.exit(1);
}

