def substrings(str, dict)
  word_count = Hash.new(0)
  str.gsub!(/[^0-9A-Za-z\s']/, '')
  for word in str.split()
    for item in dict
      if word.downcase.include? item
        word_count[item] += 1
      end
    end
  end
  puts word_count

end

dictionary = ["below", "down", "go", "going", "horn", "how", "howdy",
"it", "i", "low", "own", "part", "partner", "sit"]
substrings("Howdy partner, sit down! How's it going?", dictionary)