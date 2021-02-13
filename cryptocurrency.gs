PrintBanner = function()

    print("\n     ____            _   _     \n    |  _ \          | | | |    \n    | |_) | ___ _ __| |_| |__  \n    |  _ < / _ \ '__| __| '_ \ \n    | |_) |  __/ |  | |_| | | |\n    |____/ \___|_|   \__|_| |_|")
    print("\nGitHub repository : https://github.com/Fenyco/BerthGH")
    print("Version : 1.0.0")
    print("Dev : Berth")

end function

SetStyle = function(style, text)
    return "<" + style + ">" + text + "</" + style + ">"
end function

StartingApp = function(params)
    
    clear_screen()

    PrintBanner()
    print("\n" + SetStyle("b", "[1]") + " Login\n" + SetStyle("b", "[2]") + " Register")



end function

StartingApp()