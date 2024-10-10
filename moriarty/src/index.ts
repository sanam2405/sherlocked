import { exec } from 'child_process'
import { Socket, createServer } from 'net' // Removed extra comma
import { join } from 'path'

const PORT = 3003 // Change the port if needed
let currentDirectory = process.cwd()

// Create a server instance
const server = createServer((socket: Socket) => {
	console.log('Client connected')
	socket.write('You are connected to Sherlocked 2024! \n\nsanam@sherlocked: ')
	// Event listener for data received from clients
	socket.on('data', (data: Buffer) => {
		const command = data.toString().trim()
		console.log(`Received command: ${command}`)

		// Get all the files present in the current working directory
		if (command === 'ls') {
			exec('ls', { cwd: currentDirectory }, (error, stdout, stderr) => {
				if (error) {
					socket.write('\n-------------------------\n')
					socket.write(
						`sanam@sherlocked: Error: ${error.message}\n-------------------------\nsanam@sherlocked: `,
					)
				} else {
					if (stderr) {
						socket.write('\n-------------------------\n')
						socket.write(
							`sanam@sherlocked: stderr: ${stderr}\n-------------------------\nsanam@sherlocked: `,
						)
					} else {
						socket.write('\n-------------------------\n')
						socket.write(
							`sanam@sherlocked: Current files in the directory: \n\n${stdout}\n-------------------------\nsanam@sherlocked: `,
						)
					}
				}
			})
		}

		// Get the content of a particular file
		else if (command.startsWith('cat')) {
			const args = command.split(' ')
			const file = args[1] || '' // Extract directory from the command

			exec(
				`cat ${file}`,
				{ cwd: currentDirectory },
				(error, stdout, stderr) => {
					if (error) {
						socket.write('\n-------------------------\n')
						socket.write(
							`sanam@sherlocked: Error: ${error.message}\n-------------------------\nsanam@sherlocked: `,
						)
					} else {
						if (stderr) {
							socket.write('\n-------------------------\n')
							socket.write(
								`sanam@sherlocked: stderr: ${stderr}\n-------------------------\nsanam@sherlocked: `,
							)
						} else {
							socket.write(
								`Content of ${file}: \n\n${stdout}\n-------------------------\nsanam@sherlocked: `,
							)
						}
					}
				},
			)
		}

		// Get the present working directory
		else if (command === 'pwd') {
			exec(`pwd`, error => {
				if (error) {
					socket.write('\n-------------------------\n')
					socket.write(
						`sanam@sherlocked: Error: ${error.message}\n-------------------------\nsanam@sherlocked: `,
					)
				} else {
					socket.write('\n-------------------------\n')
					socket.write(
						`sanam@sherlocked: Current directory to: ${currentDirectory}\n-------------------------\nsanam@sherlocked: `,
					)
				}
			})
		}

		// Handle change directory command separately
		else if (command.startsWith('cd')) {
			const args = command.split(' ')
			const directory = args[1] || '' // Extract directory from the command
			const newPath = join(currentDirectory, directory) // Calculate the new path

			// Attempt to change directory
			exec(`cd ${newPath}`, error => {
				if (error) {
					socket.write('\n-------------------------\n')
					socket.write(
						`sanam@sherlocked: Error: ${error.message}\n-------------------------\nsanam@sherlocked: `,
					)
				} else {
					currentDirectory = newPath // Update the current directory
					socket.write('\n-------------------------\n')
					socket.write(
						`sanam@sherlocked: Changed directory to: ${currentDirectory}\nsanam@sherlocked: `,
					)
				}
			})
		} else {
			// Execute other commands using child_process.exec()
			// exec(command, (error, stdout, stderr) => {
			//   if (error) {
			//     socket.write('\n-------------------------\n')
			//     socket.write(`sanam@sherlocked: Error: ${error.message}\n-------------------------\nsanam@sherlocked: `);
			//     return;
			//   }
			//   if (stderr) {
			//     socket.write('\n-------------------------\n')
			//     socket.write(`sanam@sherlocked: stderr: ${stderr}sanam@sherlocked: `);
			//     return;
			//   }
			//   socket.write(`${stdout}\n--------------------------sanam@sherlocked: `);
			// });
			socket.write(`sanam@sherlocked: That's what she said\nsanam@sherlocked: `)
		}
	})

	// Event listener for client disconnection
	socket.on('end', () => {
		console.log('Client disconnected')
	})

	// Event listener for errors
	socket.on('error', (err: Error) => {
		console.error('Socket error:', err)
	})
})

// Listen for connections
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
