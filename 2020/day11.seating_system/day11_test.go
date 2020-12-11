package day11

import (
	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
	"testing"
)

//var example = `L.LL.
//LLLLL
//L.L.L
//`

var example = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`

func TestOccupiedSeats(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := occupiedSeats(input)
	assert.Equal(t, 37, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day11.input")
	got := occupiedSeats(input)
	assert.Equal(t, 2427, got)
}

func TestVisibleSeats(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := visibleSeats(input)
	assert.Equal(t, 26, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day11.input")
	got := visibleSeats(input)
	assert.Equal(t, 2199, got)
}
