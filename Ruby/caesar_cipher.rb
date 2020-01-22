def caesar_cipher(text, s)
  result = ''

  text.each_char {|ch|
    if ch == " "
      result += " "
    elsif !(Array('a'..'z') + Array('A'..'Z')).include?(ch)
      result += ch
    elsif ch == ch.upcase
      result += ((ch.ord + s - 65) % 26 + 65).chr
    elsif ch == ch.downcase
      result += ((ch.ord + s - 97) % 26 + 97).chr
    end
  }

  return result
end

puts caesar_cipher('What a string!',5)