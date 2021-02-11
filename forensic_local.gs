metax = null

Start = function()
    
    metax = IncludeLib("metaxploit.so")
    if not metax then exit("No metaxploit.so found :(")
    InspectFolder(get_shell().host_computer.File("/"))

end function

IncludeLib = function(libName)
    lib = include_lib("/lib/" + libName)
    if lib == null then
        path = parent_path(program_path) + libName
        lib = get_shell.host_computer.File(path)
    end if

    return lib
end function

InspectFolder = function(folder_obj)

    print("<b>Folder</b> : " + folder_obj.name)
    
    for file in folder_obj.get_files
        if file.is_binary != true then
            print("File : " + file.name + " : " + file.path)

            if file.has_permission("r") == true then
                for y in file.content.split("\n")
                    data = data.split(":")
                    user = data[0]
                    hash = data[1]
                    passwd = metax.decipher(user, hash)

                    print("Password found !\n" + user + " : " + hash)
                end for
            else
                print("Dont have the permissions to read " + file.path)
            end if
        end if
    end for

    for folder in folder_obj.get_folders
        InspectFolder(folder)
    end for
        
end function

Start()