# The react implementation.
This is the react implementation, the build is complete, and you can play it [here](https://dongvt.github.io/sudoku-practice/).

The idea here is just to implement a Sudoku game with the following characteristics
- [x] The system creates a random game with a unique solution
- [ ] The user can add numbers (Wether typing the number, or clicking in the number section)
    - [x] The user select a box where to put the number
    - [x] The user can click one of the numbers in the number box and that number appears in the Sudoku board
        - [ ] The user type a number and that number appears in the Sudoku board (in the selected Sudoku box)
- [x] The system won't allow the user to override one of the numbers added by the system in the board creation
- [x] The system will check validity the added number, and show it in red if it is wrong
- [x] The system will check when the board is completely done 

## More requirements for better gameplay
- [ ] Modifiable cell numbers should be represented in a different color than the ones added by the system
- [ ] Use a color palette
- [ ] Add animations for any transition (To be clarified)

## Bugs to fix
- The user should be able to select any modifiable box even when the current one has an incorrect number
- The congrats message should be above the selected cell
    - Center the message
    - Test message position in all screen sizes
    - Explain the user he/she needs to create a new board to continue

