try {
  require(process.cwd() + '/functions/index.js');
  console.log('OK: functions/index.js loaded.');
} catch (e) {
  console.error('LOAD ERROR >>>');
  console.error(e && (e.stack || e.message || e));
  process.exit(1);
}
