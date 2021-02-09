// Made by Berth
// Version 1.1.0

// Unicodes valid IG are from 33 to 127 - 255

Hash = function(_data)

    // Checking the amount of block we are gonna make
    amount_blocks = floor(_data.len / 2)
    // Define the blocks list
    blocks = []
    // Define current block index
    current_block_index = 0
    // Defined current block value
    current_block_value = ""

    for i in range(0, amount_blocks - 1)

        blocks.push("")

        print("Current block : " + i)
        blocks[i] = Char(_data[i * 2].code + _data[i * 2 + 1].code)
        
        // If is last block
        if _data.len % 2 != 0 and i >= amount_blocks then blocks[i] = blocks[i] + Char(_data[i * 2 + 2].code)

    end for

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