	// Provide lib name (extension included) and it will find the lib in the local cumputer and return it as a lib object
	IncludeLib = function(libName)
		lib = include_lib("/lib/" + libName)
		if lib == null then
			path = parent_path(program_path) + libName
			lib = get_shell.host_computer.File(path)
		end if

		return lib
	end function

	// Prints Berth in ascii art
	PrintBanner = function()

		print("\n     ____            _   _     \n    |  _ \          | | | |    \n    | |_) | ___ _ __| |_| |__  \n    |  _ < / _ \ '__| __| '_ \ \n    | |_) |  __/ |  | |_| | | |\n    |____/ \___|_|   \__|_| |_|")
		print("\nGitHub repository : https://github.com/Fenyco/BerthGH")
		print("Version : 0.1.0")

	end function

	// --------------------

	// In a menu if the input is not a path to another menu it will check if the user wants to se a general variable
	CheckIfInputIsSet = function(_input)

		if not _input then return

		command = _input.split(" ")[0].lower()

		if command == "set" then
			variable = _input.split(" ")
			if variable.len >= 3 then
				SetGeneralVariable(variable[1], variable[2])
			end if
		else if command == "unset" then
			variable = _input.split(" ")
			if variable.len >= 2 then
				SetGeneralVariable(variable[1], null)
			end if
		end if

	end function

	CheckIfInputIsHelp = function(_input)

		if not _input then return
		command = _input.split(" ")[0].lower()

		if command == "help" then PrintHelp()

	end function

	// Sets a general variable if it is supported
	SetGeneralVariable = function(index, value)

	if index == "rhost" then

			if value != null then
				if value.split(".").len == 3 then value = nslookup(value)
				if is_valid_ip(value) or value == null then GeneralVariables.rhost = value
			else
				GeneralVariables.rhost = value
			end if

		end if

	end function

	GeneralVariables = {}
	GeneralVariables.rhost = null
	GeneralVariables.rhost_ports_exploits = {}

	// --------------------
	// Functions to code faster the fonts

	Style = {}
	Style.Bold = function(text)

		text = "<b>" + text + "</b>"
		return text

	end function

	Style.Underline = function(text)

		text = "<u>" + text + "</u>"
		return text

	end function

	Style.Size = function(text, _size)

		text = "<size=" + _size + ">" + text + "</size>"
		return text

	end function

	// --------------------

	// Print the help menu
	PrintHelp = function(func)

		clear_screen()

		print(Style.Underline(Style.Bold(Style.Size("Help Menu", 19))))

		print("\n" + Style.Bold("Commands"))
		print("> SET")
		print("Example > SET RHOST 192.168.1.1")

		print("\n> UNSET")
		print("Example > SET RHOST")

		user_input("\n" + Style.Bold("> Press enter to quit the help menu."))

	end function

	// --------------------

	// First menu when you launch the program
	MainMenu = function()

		clear_screen()

		PrintBanner()
		print("\n> Public IP : " + get_router.public_ip)
		print("> LAN IP : " + get_shell.host_computer.lan_ip)

	if GeneralVariables.rhost != null then print("\n> RHOST : " + GeneralVariables.rhost)

	print("\n" + Style.Bold("[EB]") + " Exploit-Based Tools")
		print(Style.Bold("[CH]") + " Crypto and Hashing")

	print("\n" + Style.Bold("[EX]") + " Exit")

	print()
	choice = user_input("> ").lower

	if choice == "eb" then

		ExploitBasedToolsMenu()

	else if choice == "ex" then

		exit()

	else
		CheckIfInputIsSet(choice)
		CheckIfInputIsHelp(choice)
		MainMenu()
	end if

	end function

	// --------------------

	// Exploit-Based Main Menu
	ExploitBasedToolsMenu = function()

		clear_screen()

		PrintBanner()

		print("\n" + Style.Size(Style.Underline(Style.Bold("Exploit Based Tools")), 19))

		if GeneralVariables.rhost != null then print("\n> RHOST : " + GeneralVariables.rhost)

		print("\n" + Style.Bold("[SE]") + " Remote Scan & Exploit")
		print(Style.Bold("[SL]") + " Scan Local Library File")

		print("\n" + Style.Bold("[MM]") + " Main Menu")

		print()
		choice = user_input("> ").lower

		if choice == "se" then
			ScanAndExploit.Menu()
		else if choice == "sl" then

		else if choice == "mm" then
			MainMenu()
		else
			CheckIfInputIsSet(choice)
			CheckIfInputIsHelp(choice)
			ExploitBasedToolsMenu()
		end if

	end function

	// --------------------

	ScanAndExploit = {}

	// Scan and Exploit fonctionality in Exploit-Based category
	ScanAndExploit.Menu = function()

		clear_screen()

		PrintBanner()

		print("\n" + Style.Size(Style.Underline(Style.Bold("Remote Scan & Exploit")), 19))

		if GeneralVariables.rhost != null then
			print("\n> RHOST : " + GeneralVariables.rhost)

			
		else
			print("\n> RHOST not set, do HELP to get informations.")
		end if

		print("\n" + Style.Bold("[EB]") + " Exploit-Based Tools")
		print(Style.Bold("[MM]") + " Main Menu")

		print()
		choice = user_input("> ").lower

		// scan 54.231.12.324
		// scan -> RHOST

		if choice == "eb" then
			ExploitBasedToolsMenu()
		else if choice == "mm" then
			MainMenu()
		else
			CheckIfInputIsSet(choice)
			CheckIfInputIsHelp(choice)
			ScanAndExploit.Menu()
		end if

	end function

	// --------------------

	GetMetaLibFromIpAndPort = function(ip, port)

		if not port or not ip or is_valid_ip(ip) == false then return

		return metax.net_use(ip, port.to_int).dump_lib

	end function

	ScanMetaLibForMemoryAddresses = function(lib)

		return metax.scan(lib)

	end function

	ScanMemoryAddressForExploits = function(lib, memoryAddress)

		return metax.scan_address(lib, memoryAddress)

	end function

	// --------------------

	// Checking if user have theses libs at launch or exits
	crypto = IncludeLib("crypto.so")
	metax = IncludeLib("metaxploit.so")

	if not crypto then exit(Style.Bold("Please install crypto.so"))
	if not metax then exit(Style.Bold("Please install metaxploit.so"))

	MainMenu()
