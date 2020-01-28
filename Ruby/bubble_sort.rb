def bubble_sort(arr)
  arr_length = arr.length
  arr_length.times { |i|
    (arr_length-i-1).times { |j|
      if arr[j] > arr[j+1]
        arr[j], arr[j+1] = arr[j+1], arr[j]
      end
    }
  }
  return arr
end

def bubble_sort_by(arr)
  arr_length = arr.length

  arr_length.times { |i|
    (arr_length-i-1).times { |j|
      if (yield(arr[j], arr[j+1]) > 0)
        arr[j], arr[j+1] = arr[j+1], arr[j]
      end
    }
  }
  return arr
end

print bubble_sort([1,5,3,4,3,5,6])
print "\n"
print bubble_sort_by(['hi', 'hello', 'hey']) { |left, right|
left.length - right.length
}