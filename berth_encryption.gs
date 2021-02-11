// Made by Berth
// Version 1.1.0

// Things to do :
//  • Improve security (procedural bruteforce)
//  • Optimize
//  • Avoid repetitions with another method

// Unicodes valid IG are from 33 to 127 - 255

Hash = function(_data)

    if not _data or _data == "" then return

    // Checking the amount of block we are gonna make
    amount_blocks = floor(_data.len / 2)
    // Define the blocks list
    blocks = []
    // Define current block index
    current_block_index = 0
    // Defined current block value
    current_block_value = ""

    print(amount_blocks)

    for i in range(0, amount_blocks - 1)

        // Creating the block in the list
        blocks.push("")

        print("Current block : " + i)
        
        // If is last block
        if _data.len % 2 != 0 and i >= amount_blocks then
            print("Last block")
            if _data.len < i * 2 + 1 then
                print("Path 2")
                blocks[i] = Char(_data[i * 2].code)
            else
                print("Path 1")
                blocks[i] = blocks[i] + Char(_data[i * 2].code)
            end if     
        else // If not last block
            print("Regular")
            blocks[i] = Char(_data[i * 2].code + _data[i * 2 + 1].code)
        end if
            

    end for

    // Returning one string that contains all the blocks (hash result)
    return blocks.join("")

end function

Char = function(code)

    if code < 33 then
        return Char(code * 2)
    else if code > 126 and code < 162 then
        return Char(code / 2) * 2
    else if code > 255 then
        return Char(code / 2) * 2
    else
        return char(code)
    end if

end function

print(Hash(input("INPUT : ")))