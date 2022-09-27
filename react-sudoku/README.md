# The react implementation.
The react implementation is the first one, hence it is the one that takes more time since I'm redesigning it each time I face a problem.

The idea here is just to implement a Sudoku game with the following characteristics
- [ ] The user can chose a difficulty (Easy, Medium, Hard)
- [ ] The system automatically creates a random game with the desired difficulty
- [ ] The user can add numbers (Wether typing the number, or clicking in the number section)
    - [x] The user select a box where to put the number
    - [x] The user can click one of the numbers in the number box and that number appears in the Sudoku board
        - [ ] The user type a number and that number appears in the Sudoku board (in the selected Sudoku box)
- [ ] The system won't allow the user to override one of the numbers added by the system in the board creation
- [x] The system will check validity the added number, and show it in red if it is wrong
- [ ] The system will check when the board is completely done 