// Made by Berth

SetStyle = function(style, data)
    return "<" + style + ">" + data + "</" + style + ">"
end function

IncludeLib = function(lib_name)

    // Searching in /lib
    lib = include_lib("/lib/" + lib_name)

    // Searching in current program path
    if not lib then

        // Parsing to get from /bin/myprogram to /bin (only the dir)
        cur_path = program_path.split("/")
        cur_path.remove(-1)
        cur_path.join("/")

        lib = include_lib(cur_path + "/" + lib_name)
    end if

    // Searching in user's home folder
    if not lib then
        lib = include_lib(home_dir + "/" + lib_name)
    end if

    if lib then
        return lib
    else
        exit(SetStyle(b, SetStyle(red, "Failed to find library" + lib_name + ", please install it before using the program.")))
    end if
    
end function

// ---------------------------------------

// Function to verify if every requirements is there to avoid errors
Initiation = function()

    clear_screen()

    print("Initiation process...")
    wait(0.5)

    print("Verifying libraries...")
    wait(2)
    metax = IncludeLib("metaxploit.so")
    crypto = IncludeLib("metaxploit.so")

    print("Verifying params...")
    wait(1)
    if params.len < 1 then exit(SetStyle("b", "Usage : ") + "fsusiety [ip/domain]")

end function