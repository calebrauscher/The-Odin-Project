class Player
  attr_reader :symbol_name, :name
  def initialize(symbol_name, name)
    @symbol_name = symbol_name
    @name = name
  end

end

class GameBoard
  attr_reader :board
  def initialize()
    @board = [[" ", " ", " "],
              [" ", " ", " "],
              [" ", " ", " "]]
  end

  def show_board
    puts "#{@board[0][0]}|#{@board[0][1]}|#{@board[0][2]}"
    puts "-----"
    puts "#{@board[1][0]}|#{@board[1][1]}|#{@board[1][2]}"
    puts "-----"
    puts "#{@board[2][0]}|#{@board[2][1]}|#{@board[2][2]}"
  end

  def set_player(row, col, player)
    if @board[row][col] != " "
      return false
    end

    @board[row][col] = player
  end

  def winner?(row, col, player)
    if @board[0][col] == player and @board[1][col] == player and @board[2][col] == player
        return true
    elsif @board[row][0] == player and @board[row][1] == player and @board[row][2] == player
        return true
    elsif @board[0][0] == player and  @board[1][1] == player and @board[2][2] == player
        return true
    elsif @board[0][2] == player and  @board[1][1] == player and  @board[2][0] == player
        return true
    else
        return false
    end
  end

  def board_full?
    @board.each do |row, cell|
      if cell == " "
        return false
      end
    end
    return true
  end
end

class Game
  def initialize
    game_over = false
    puts('Name of Player 1: ')
    player_x = gets.chomp
    puts('Name of Player 2: ')
    player_o = gets.chomp

    @players = [Player.new('X', player_x),
              Player.new('O', player_o)]

    @gameboard = GameBoard.new()
  end

  def start_game
    while true
      @players.each do |player|
      puts "Player #{player.name} select you location (row, col): "
      row, col = gets.chomp.split(',')
      row = row.to_i
      col = col.to_i
        redo if row > 2 || col > 2

        if @gameboard.board[row][col] != " "
          puts "That location is already occupied!"
          redo
        else
          @gameboard.set_player(row, col, player.symbol_name)
          @gameboard.show_board
        end
        if @gameboard.winner?(row, col, player.symbol_name)
          puts "#{player.name} (#{player.symbol_name}) has won!"
          @game_over = true
          break
        elsif @gameboard.board_full?
          puts @gameboard.board_full?
          puts "It's a tie game."
          @game_over = true
          break
        end
      end
      break if @game_over
    end
  end
end

new_game = Game.new()
new_game.start_game()