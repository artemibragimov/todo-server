import rra from 'recursive-readdir-async';

export default async function readDirPatch(file) {
  let dir = await rra.list('./src');
  dir = dir.reduce(
    (a, c) => (c.path.length < a.path.length ? c : a),
    dir[0]
  ).path;
  return {
    path: file.path.replace(dir + '/routes', ''),
    dir: '.' + file.fullname.replace(dir, ''),
  };
}
