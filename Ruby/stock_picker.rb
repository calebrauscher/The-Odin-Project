def stock_picker(arr)
  max_spread = 0
  buy_day = 0
  sell_day = 0
  for i in 0..arr.length-1
    for j in (i+1)..arr.length-1
      if arr[j] - arr[i] > max_spread
        max_spread = arr[j] - arr[i]
        buy_day = i
        sell_day = j
      end
    end
  end
  puts "[#{buy_day},#{sell_day}] for a profit of $#{arr[sell_day]} - $#{arr[buy_day]} = $#{max_spread}"

end

stock_picker([17, 3, 6, 9, 15, 8, 6, 1, 10])
stock_picker([3, 17])