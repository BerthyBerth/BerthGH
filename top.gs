top = function()

    clear_screen()
    print(format_columns(get_shell().host_computer.show_procs))

end function

while true

    top()
    wait(3)

end while