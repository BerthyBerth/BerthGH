PrintBanner = function()

	print("\n     ____            _   _     \n    |  _ \          | | | |    \n    | |_) | ___ _ __| |_| |__  \n    |  _ < / _ \ '__| __| '_ \ \n    | |_) |  __/ |  | |_| | | |\n    |____/ \___|_|   \__|_| |_|")

end function

// --------------------

CheckIfInputIsSet = function(_input)

	if not _input then return

	command = _input.split(" ")[0]

	if command == "set" then
		variable = _input.split(" ")
		if variable.len >= 3 then
			SetGeneralVariable(variable[1], variable[2])
		end if
	else if command == "unset" then
		variable = _input.split(" ")
		if variable.len >= 2 then
			SetGeneralVariable(variable[1], null)
			MainMenu()
		else
			MainMenu()
		end if
	end if

end function

SetGeneralVariable = function(index, value)

  if index == "rhost" then

		if value != null then
			value.split(".").len == 3 then value = nslookup(value)
			if is_valid_ip(value) or value == null then GeneralVariables.rhost = value
		else
			GeneralVariables.rhost = value
		end if
	end if
	
end function

GeneralVariables = {}
GeneralVariables.rhost = null

// --------------------

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
    MainMenu()
  end if

end function

// --------------------

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
		ScanAndExploit()
	else if choice == "sl" then

	else if choice == "mm" then
		MainMenu()
	else
		CheckIfInputIsSet(choice)
		ExploitBasedToolsMenu()
	end if

end function

// --------------------

ScanAndExploit = function()

	clear_screen()

	PrintBanner()

	print("\n" + Style.Size(Style.Underline(Style.Bold("Remote Scan & Exploit")), 19))

	if GeneralVariables.rhost != null then print("\n> RHOST : " + GeneralVariables.rhost)

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
		CheckIfInputIsSet()
		ScanAndExploit()
	end if

end function

MainMenu()
