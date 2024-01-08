/*
ChessBoard Interactive Backend C++ Engine for deciding moves
Written By: Kshitij Tomar
*/

#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <cmath>
//#include <httplib.h> //Requires configuration of this library, helps to cross-platform with HTTP/HTTPS
//#include <fstream>

using namespace std;

const int NONE = -1, WHITE = 0, BLACK = 1; //constansts needed to color validation

// Piece structure representing each chessboard piece
struct Piece 
{
    char symbol = ' ';
    int color = NONE; //By default, their is no color to a location on the board if there is no peice on it
};

int player_turn = NONE;

// Function to initialize the chessboard
vector<vector<Piece> > initialize_board() 
{
    player_turn = WHITE; //game starts with white's move
    vector<vector<Piece> > chessboard(8, vector<Piece>(8));

    // Initialize pawns
    for (int i = 0; i < 8; ++i) 
    {
        chessboard[1][i].symbol = 'P';
        chessboard[1][i].color = BLACK;
        chessboard[6][i].symbol = 'P';
        chessboard[6][i].color = WHITE;
    }

    // Initialize other pieces
    chessboard[0][0].symbol = 'R';
    chessboard[0][0].color = BLACK;
    chessboard[0][7].symbol = 'R';
    chessboard[0][7].color = BLACK;
    chessboard[7][0].symbol = 'R';
    chessboard[7][0].color = WHITE;
    chessboard[7][7].symbol = 'R';
    chessboard[7][7].color = WHITE;

    chessboard[0][1].symbol = 'N';
    chessboard[0][1].color = BLACK;
    chessboard[0][6].symbol = 'N';
    chessboard[0][6].color = BLACK;
    chessboard[7][1].symbol = 'N';
    chessboard[7][1].color = WHITE;
    chessboard[7][6].symbol = 'N';
    chessboard[7][6].color = WHITE;

    chessboard[0][2].symbol = 'B';
    chessboard[0][2].color = BLACK;
    chessboard[0][5].symbol = 'B';
    chessboard[0][5].color = BLACK;
    chessboard[7][2].symbol = 'B';
    chessboard[7][2].color = WHITE;
    chessboard[7][5].symbol = 'B';
    chessboard[7][5].color = WHITE;

    chessboard[0][3].symbol = 'Q';
    chessboard[0][3].color = BLACK;
    chessboard[0][4].symbol = 'K';
    chessboard[0][4].color = BLACK;
    chessboard[7][3].symbol = 'Q';
    chessboard[7][3].color = WHITE;
    chessboard[7][4].symbol = 'K';
    chessboard[7][4].color = WHITE;
    return chessboard;
}
vector<vector<Piece> > chessboard = initialize_board(); //Global Initialization of ChessBoard to keep track of moves

/*
@param int i: An integer ranging from 0 to 8
@param int j: An integer randing from 0 to 8
@return bool: Return whether a given square has a specific color attribute
This function is called to check whether a specific square has a specific color
*/
bool check_piece_color(int i, int j, int color) 
{
    return chessboard[i][j].color == color;
}

/*
This function returns the entirety of ther chess board to the terminal screen when it is called - used for testing
*/
void print_board(const vector<vector<Piece> >& chessboard) 
{
    for (int i = 0; i < 8; ++i) 
    {
        cout << i << " ";
        for (int j = 0; j < 8; ++j) 
        {
            if (chessboard[i][j].symbol == ' ') 
            {
                cout << "   ";
            } 
            else 
            {
                cout << chessboard[i][j].symbol << "  ";
            }
        }
        cout << endl;
    }
    cout << "  ";
    for (int j = 0; j < 8; j++)
    {
        cout << j << "  ";
    }
    cout << endl;
}

/*
@param row: An int type variable that tells the row at which a chess peice is located
@param column: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves that are horizontally or vertically accessible by a peice on a coordinate - used for rooks
*/
vector<pair<int, int> > straight_moves(int row, int column)
{
    vector<pair<int, int> > moves;
    cout << "rook" << endl;
    bool empty = true;
    int i = row+1;
    int j = column;
    while (empty && i < 8)
    {
        if (chessboard[i][j].color != chessboard[row][column].color)
        {
            if (chessboard[i][j].symbol != ' ')
            {
                empty = false;
            }
            moves.push_back(make_pair(i, j));
            cout << i << " " << j << endl;
        }
        else
        {
            empty = false;
        }
        i++;
    }
    empty = true;
    i = row;
    j = column + 1;
    while (empty && j < 8)
    {
        if (chessboard[i][j].color != chessboard[row][column].color)
        {
            if (chessboard[i][j].symbol != ' ')
            {
                empty = false;
            }
            moves.push_back(make_pair(i, j));
            cout << i << " " << j << endl;
        }
        else
        {
            empty = false;
        }
        j++;
    }
    empty = true;
    i = row;
    j = column - 1;
    while (empty && j > -1)
    {
        if (chessboard[i][j].color != chessboard[row][column].color)
        {
            if (chessboard[i][j].symbol != ' ')
            {
                empty = false;
            }
            moves.push_back(make_pair(i, j));
            cout << i << " " << j << endl;
        }
        else
        {
            empty = false;
        }
        j--;
    }
    empty = true;
    i = row - 1;
    j = column;
    while (empty && i > -1)
    {
        if (chessboard[i][j].color != chessboard[row][column].color)
        {
            if (chessboard[i][j].symbol != ' ')
            {
                empty = false;
            }
            moves.push_back(make_pair(i, j));
            cout << i << " " << j << endl;
        }
        else
        {
            empty = false;
        }
        i--;
    }
    
    return moves;
}
/*
@param row: An int type variable that tells the row at which a chess peice is located
@param column: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves that are L-shape accessible by a peice on a coordinate - used for knights
*/
vector<pair<int, int> > knight_moves(int row, int column)
{
    vector<pair<int, int> > moves;
    cout << "knight" << endl;
    int i = row + 2;
    int j = column + 1;
    if (i < 8 && j < 8 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }
    i = row + 1;
    j = column + 2;

    if (i < 8 && j < 8 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }

    i = row + 1;
    j = column - 2;

    if (i < 8 && j > -1 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }

    i = row + 2;
    j = column - 1; 

    if (i < 8 && j > -1 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }

    i = row - 2;
    j = column + 1;
    if (i > -1 && j < 8 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }
    i = row - 1;
    j = column + 2;

    if (i > -1 && j < 8 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }

    i = row - 1;
    j = column - 2;

    if (i > -1 && j > -1 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }

    i = row - 2;
    j = column - 1; 

    if (i > -1 && j > -1 && chessboard[i][j].color != chessboard[row][column].color)
    {
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
    }
    
    return moves;
}
/*
@param row: An int type variable that tells the row at which a chess peice is located
@param column: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves that are diagonally accessible by a peice on a coordinate - used for bishops
*/
vector<pair<int, int> > bishop_moves(int row, int column)
{
    vector<pair<int, int> > moves;
    cout << "bishop " << row << " " << column << endl;
    bool empty = true;
    int i = row + 1;
    int j = column + 1;
    while (empty && i < 8 && j < 8 && chessboard[i][j].color != chessboard[row][column].color)
    {
        if (chessboard[i][j].symbol != ' ')
        {
            empty = false;
        }
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
        i++;
        j++;
    }
    empty = true;
    i = row - 1;
    j = column + 1;

    while (empty && i > -1 && j < 8 && chessboard[i][j].color != chessboard[row][column].color)
    {
        if (chessboard[i][j].symbol != ' ')
        {
            empty = false;
        }
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
        i--;
        j++;
    }

    empty = true;
    i = row + 1;
    j = column - 1;

    while (empty && i < 8 && j > -1 && chessboard[i][j].color != chessboard[row][column].color)
    {
        if (chessboard[i][j].symbol != ' ')
        {
            empty = false;
        }
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
        i++;
        j--;
    }

    empty = true;
    i = row - 1;
    j = column - 1; 

    while (i > -1 && j > -1 && chessboard[i][j].color != chessboard[row][column].color)
    {
        if (chessboard[i][j].symbol != ' ')
        {
            empty = false;
        }
        moves.push_back(make_pair(i, j));
        cout << i << " " << j << endl;
        i--;
        j--;
    }

    return moves;
}
/*
@param row: An int type variable that tells the row at which a chess peice is located
@param column: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves that are diagonally/horizontally/vertically accessible by a peice on a coordinate - used for queens
*/
vector<pair<int, int> > queen_moves(int row, int column)
{
    vector<pair<int, int> > moves;
    cout << "queen " << row << " " << column << endl;
    moves.insert(moves.end(), bishop_moves(row, column).begin(), bishop_moves(row, column).end());
    moves.insert(moves.end(), straight_moves(row, column).begin(), straight_moves(row, column).end());
    return moves;
}
/*
@param row: An int type variable that tells the row at which a chess peice is located
@param column: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves that are one square away in all directions from on a coordinate - used for kings
*/
vector<pair<int, int> > king_moves(int row, int column)
{
    vector<pair<int, int> > moves;
    cout << "king" << endl;
    int i = row - 1;
    int j = column - 1;

    // Check if the new position is within the chessboard boundaries
    for (int i = row - 1; i <= row +1; i++)
    {
        for (int j = column - 1; j <= column + 1; j++)
        {
            // Check if the square is either empty or has an opponent's piece
            if (i < 8 && i >= 0 && j < 8 && j >= 0 && chessboard[i][j].color != chessboard[row][column].color) 
            {
                moves.push_back(make_pair(i, j));
                cout << i << " " << j << endl;
            }
        }
    }
    return moves;
}

/*
@param row: An int type variable that tells the row at which a chess peice is located
@param column: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the pawn moves in a given position - allowing captures
*/
vector<pair<int, int> > pawn_moves(int row, int column)
{
    vector<pair<int, int> > moves;
    cout << chessboard[row][column].color << " pawn " << row << " " << column << endl;
    
    if (chessboard[row][column].color == BLACK)
    {
        int i = row + 1;
        if (chessboard[i][column+1].color != chessboard[row][column].color && !check_piece_color(i, column + 1, NONE)) 
        {
            moves.push_back(make_pair(i, column+1));
            cout << i << " " << column+1 << endl;
        }
        if (chessboard[i][column-1].color != chessboard[row][column].color && !check_piece_color(i, column - 1, NONE)) 
        {
            moves.push_back(make_pair(i, column-1));
            cout << i << " " << column-1 << endl;
        }
        if (chessboard[i][column].color == NONE) 
        {
            moves.push_back(make_pair(i, column));
            cout << i << " " << column << endl;
        }
        if (chessboard[i][column].color == NONE && chessboard[i+1][column].color == NONE && row == 1)
        {
            moves.push_back(make_pair(i+1, column));
            cout << i+1 << " " << column << endl;
        }
    }
    else
    {
        int i = row - 1;
        if (i >= 0 && column+1 < 8 && chessboard[i][column+1].color != chessboard[row][column].color && chessboard[i][column+1].color != NONE) 
        {
            moves.push_back(make_pair(i, column+1));
            cout << i << " " << column+1 << endl;
        }
        if (i >= 0 && column-1 >= 0 && chessboard[i][column-1].color != chessboard[row][column].color && chessboard[i][column-1].color != NONE)
        {
            moves.push_back(make_pair(i, column-1));
            cout << i << " " << column-1 << endl;
            cout << "here" << endl;
        }
        if (chessboard[i][column].color == NONE) 
        {
            moves.push_back(make_pair(i, column));
            cout << i << " " << column << endl;
        }
        if (i >= 1 && chessboard[i][column].color == NONE && chessboard[i-1][column].color == NONE && row == 6)
        {
            moves.push_back(make_pair(i-1, column));
            cout << i-1 << " " << column << endl;
        }
    }
    return moves;
}
/*
@param i: An int type variable that tells the row at which a chess peice is located
@param j: An int type variable that tells the column at which a chess peice is located
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves in a given position at a given square
*/
vector<pair<int, int> > moves_from_square(int i, int j)
{
    vector<pair<int, int> > piece_moves;
    Piece peice = chessboard[i][j];
    if (peice.color == player_turn && peice.symbol != ' ')
    {
        if (peice.symbol == 'N')
        {
            piece_moves = knight_moves(i, j);
        }
        else if (peice.symbol == 'R')
        {
            piece_moves = straight_moves(i, j);
        }
        else if (peice.symbol == 'B')
        {
            piece_moves = bishop_moves(i, j);
        }
        else if (peice.symbol == 'Q')
        {
            piece_moves = queen_moves(i, j);
        }
        else if (peice.symbol == 'K')
        {
            piece_moves = king_moves(i, j);
        }
        else if (peice.symbol == 'P')
        {
            piece_moves = pawn_moves(i, j);
        }
    }
    return piece_moves;
}
/*
@return: Returns a vector of coordinates, represented by a pair of integers
This function returns all of the moves in a given position for every peice in the position
*/
vector<pair<int, int> > all_moves()
{
    vector<pair<int, int> > moves;
    Piece peice;
    for (int i = 0; i < 8; i++)
    {
        for (int j = 0; j < 8; j++)
        {
            vector<pair<int, int> > piece_moves = moves_from_square(i, j);
            moves.insert(moves.end(), piece_moves.begin(), piece_moves.end());
            
        }
    }
    return moves;
}
/*
@param move: A pair of ints that dictate the move the player is trying to player or the square that they are moving their peice to
@param startLoc: A pair of ints that dictate the move the player is starting from
This function updates the board's position after a move has been played
*/
void update_board(pair<int, int> move, pair<int, int> startLoc)
{
    int row = move.first;
    int column = move.second;
    int start_row = startLoc.first;
    int start_column = startLoc.second;
    // Copy the piece at the starting location to the destination location
    chessboard[row][column] = chessboard[start_row][start_column];

    // Clear the starting location
    chessboard[start_row][start_column].color = NONE;
    chessboard[start_row][start_column].symbol = ' ';

    print_board(chessboard);
    player_turn = !player_turn;
}
/*
@param move: A pair of ints that dictate the move the player is trying to player or the square that they are moving their peice to
@param startLoc: A pair of ints that dictate the move the player is starting from
@return bool: true or false to indicate whether the move is valid
This function checks whether a given move as input is valid - used for testing
*/
bool is_valid(pair<int, int> move, pair<int, int> startloc)
{
    vector<pair<int, int> > all = moves_from_square(startloc.first, startloc.second);
    
    for (int i = 0; i < all.size(); i++)
    {
        cout << "first all" << all[i].first << endl;
        cout << "second all" << all[i].second << endl;
        cout << "first move" << move.first << endl;
        cout << "second move" << move.second << endl;
        if (all[i].first == move.first && all[i].second == move.second)
        {
            return true;
        }
    }
    return false;
}


/*
The function that decides the move that the computer is choosing to play
*/
void perform_move() 
{
    srand(static_cast<unsigned int>(time(nullptr)));

    // Determine valid moves based on the piece type
    vector<pair<int, int> > valid_moves;
    vector<pair<int, int> > valid_starts;
    int random_start;
    for (int i = 0; i < 8; i++)
    {
        for (int j = 0; j < 8; j++)
        {
            if (player_turn == chessboard[i][j].color)
            {
                valid_starts.push_back(make_pair(i, j));
            }
        }
    }
    do
    {
        random_start = (rand() % valid_starts.size());
        valid_moves = moves_from_square(valid_starts[random_start].first, valid_starts[random_start].second);   
    } while (valid_moves.size() == 0);
    // Keep trying random moves until a valid capture move is found
    // No valid capture moves, try a new random move
    int random_index = rand() % valid_moves.size();
    update_board(valid_moves[random_index], valid_starts[random_start]);
    //Run program only once the include path has been updated, otherwise the code will not function
    //Commented to allow inspection and running in terminal if necessary
    /*
    std::ofstream file("moveLog.txt", std::ios::app);
    if (file.is_open()) {
        file << move << std::endl;
        file.close();
    }*/

    // Print the move to the terminal
    cout << "Moved piece from (" << valid_starts[random_start].first << ", " << valid_starts[random_start].second << ") to (" << valid_moves[random_index].first << ", " << valid_moves[random_index].second << ")" << endl;
}
//program will run until the game ends --> Will end on the javascript end as the computer doesn't need to perform a move once that occurs
int main() 
{
    //Run program only once the include path has been updated, otherwise the code will not function
    /*
    httplib::Server server;
    //server side managment
    server.Post("/perform_move", [&](const httplib::Request& req, httplib::Response& res) {
        const std::string move = req.body;
        perform_move();
        res.set_content("Move performed successfully", "text/plain");
    });

    server.listen("localhost", 3000); 
    */
    return 0;
}

//Code that was used to test the workings of this file
/*
    print_board(chessboard);
    for (int i = 0; i < 4; i++)
    {
        int start_row;
        int start_column;
        int target_row;
        int target_column;
        cout << "please enter the starting location of the peice" << endl;
        cin >> start_row >> start_column;
        pair<int, int> save = make_pair(start_row, start_column); //starting location of peice
        cout << "please enter row or column into the program (enter as ints)" << endl;
        cin >> target_row >> target_column;
        while (!is_valid(make_pair(target_row, target_column), save))
        {
            cout << "please try again" << endl;
            cout << "please enter the starting location of the peice" << endl;
            cin >> start_row >> start_column;
            save = make_pair(start_row, start_column);
            cout << "please enter row or column into the program (enter as ints)" << endl;
            cin >> target_row >> target_column;
        }

        update_board(make_pair(target_row, target_column), save);
        cout << endl; 
        //Perform a random move for any living piece
        cout << "\nAfter Random Move:\n";
        perform_move();
       
    }
    */