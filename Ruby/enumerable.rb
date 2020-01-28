module Enumerable
  def my_each
    for i in self do
      yield(i)
    end
    self
  end

  def my_each_with_index
    indx = 0
    for i in self do
      yield(i, indx)
      indx += 1
    end
    self
  end

  def my_select
    result = self.dup
    self.my_each { |i|
      unless yield(i)
        if self.is_a? Array
          result.delete(i)
        elsif self.is_a? Hash
          result.delete(i[0])
        end
      end
     }
     result
  end

  def my_all?
    self.my_each { |i|
      unless yield(i)
        return false
      end
      }
      return true
  end

  def my_any?
    self.my_each { |i|
      if yield(i)
        return true
      end
    }
    return false
  end

  def my_none?
    self.my_each { |i|
      if yield(i)
        return false
      end
    }
    return true
  end

  def my_count
    count = 0
    self.my_each { |i|
      if yield(i)
        count += 1
      end
    }
    return count
  end

  def my_map(proc=nil)
    if proc
      result = []
      self.my_each { |i|
        result << proc.call(i)
      }
      return result
    else
      result = []
      self.my_each { |i|
        result << yield(i)
      }
    end
  end

  def my_inject(initial_value=nil)
    enum = self.dup
    memo = initial_value || 0
    for i in self do
      memo = yield(memo, i)
    end
    return memo
  end
  
end

def multiply_els(arr)
    arr.my_inject(1) { |prod, num| prod * num }
end

puts "My Each"
[1,2,3].my_each { |i|
  puts i
}

puts "**********"
puts "My Each With Index"

[1,2,3].my_each_with_index { |i, indx|
  puts "#{i}, #{indx}"
}

puts "**********"
puts "My Select"
puts [1,2,3].my_select { |i| i<3}

puts "*********"
puts "My All"
puts [1,1,1].my_all? { |i| i == 1}
puts [1,2,3].my_all? { |i| i == 1}

puts "*********"
puts "My Any"
puts [1, 2, 3].my_any?{ |i| i == 1}
puts [1, 2, 3].my_any?{ |i| i == "a"}

puts "*********"
puts "My None"
puts [1, 2, 3].my_none?{ |i| i == 1}
puts [1, 2, 3].my_none?{ |i| i == "a"}

puts "*********"
puts "My Count"
puts [1, 2, 3].my_count{ |i| i == 1}
puts [1, 1, 1].my_count{ |i| i == 1}

puts "*********"
puts "My Map"
proc = Proc.new {|num| num*2}
puts [1, 2, 3].my_map(proc)
puts [1, 2, 3].my_map{ |i| i**2}

puts "*********"
puts "My Inject"
puts (5..10).my_inject{ |sum, n|
  sum + n
}

puts (5..10).inject{ |sum, n|
sum + n}

puts multiply_els((5..10))
