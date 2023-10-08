const child_process = require('child_process');

const data = child_process.exec(
  'netsh wlan show profiles',
  (err, stdout, stderr) => {
    if (err) throw err;
    const data = stdout
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('Perfil de todos'))
      .map(user => user.split(': ')[1])
      .map(user =>
        child_process.exec(
          `netsh wlan show profile "${user}" key=clear`,
          async (err, stdout, stderr) => {
            let data = [];
            const passwords = stdout
              .split('\n')
              .map(line => line.trim())
              .filter(
                line =>
                  line.startsWith('Contenido de la clave') ||
                  line.startsWith('Nombre   ')
              );
            console.log(passwords);
          }
        )
      );
  }
);
